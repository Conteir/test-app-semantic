import React from 'react';
import Autosuggest from 'react-autosuggest';
import { snomedURLs, conceptRefsetLegemidler, conceptRefsetSaturdayNightFeverRusmidler, conceptRefsetToxicBeautyPlanter } from '../config.ts';
import './DisordersAutoSuggest.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from 'reactstrap';

export default class DisordersAutosuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      showSpinner: false,
      value: '',
      suggestions: []
    };
  }
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.props.suggestCallback(suggestion);

    return suggestion.term + ' (SCTID: ' + suggestion.concept.conceptId + ')';
  }
  
  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => (
    <div>
      {/** taking from hdir descriptions */}
      {suggestion.term + ' (SCTID: ' + suggestion.concept.conceptId + ')'}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    this.setState({ showSpinner: true });

    //snomedURLs.getTerms = URLaddress; value = a term from users input
    if( inputValue && inputValue.length >= 3) {

        // First request to Snomed: search by term

        let promises = []; // promises with term
        let items = []; // for suggestions

        let refsets = [
          conceptRefsetLegemidler,
          conceptRefsetSaturdayNightFeverRusmidler,
          conceptRefsetToxicBeautyPlanter
        ];

        refsets.forEach(refset => {

          let promise = fetch(snomedURLs.getTerms + value + '&conceptRefset=' + refset,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
          )
          .then(response => response.json())
          .then(data => {
            // check if input is still the same after fetch (fetch takes time)
            if(this.state.value.trim().toLowerCase() === inputValue && Array.isArray(data.items)) {
              console.log("Snomed Search by term: " + inputValue + ":", data);

                data.items.forEach(el => {
                  if(el.term && el.term.length > 0) {
                    items.push(el);
                  }
                }); 
            }

          });
          promises.push(promise);
        });

        Promise.all(promises).then(() => {
          this.setState({
              suggestions: items,
              showSpinner: false   
          });          
        });
    } else {
        this.setState({
            suggestions: []
        });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, { newValue }) => {
    //this.props.clearCallback();
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
        <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
             {this.state.showSpinner ? <Spinner color="success" /> : null}


        </div>
    );
  }
}

