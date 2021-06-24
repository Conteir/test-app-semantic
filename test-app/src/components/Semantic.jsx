import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DisordersAutosuggest from "../components/DisordersAutosuggest";
// import { IFrame } from "./IFrameCompoment.jsx";
import { Spinner } from 'reactstrap';
import { HTMLRender } from "./htmlRenderComponent";
// import { helsedirBaseUrl, params } from "../config.ts";


export const Semantic = class Semantic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        showSpinner: false,
        showContent: false
    }

  }



  
  



  render() {
    return (
      <div>

            <div className="jumbotron text-center">
                <h1>Refset search test app</h1>
                <p>Lets see, how the search between different refsets work</p>
            </div>

            <div className="row">

                <div className="col-sm-6">

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="notat"><b>Notat:</b></label>
                            <textarea
                                aria-label="Notat"
                                id="notat"
                                type="text"
                                autoComplete="off"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="funn"><b>Funn:</b></label>
                            <textarea
                                id="funn"
                                type="text"
                                autoComplete="off"
                                placeholder="funn"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="vurdering"><b>Vurdering:</b></label>
                            <textarea
                                id="vurdering"
                                type="text"
                                autoComplete="off"
                                placeholder="vurdering"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="tiltak"><b>Tiltak:</b></label>
                            <textarea
                                id="tiltak"
                                type="text"
                                autoComplete="off"
                                placeholder="tiltak"
                            />
                        </div>
                    </div>

                </div>

                <div className="col-sm-6">

                    <div className="row">
                        <p><b>Årsak (symptom, plage eller tentativ diagnose):</b></p>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <DisordersAutosuggest 
                                suggestCallback={this.setICPC2code} 
                                codeSystem="ICPC-2"/>
                        </div>
                    </div>

                    <div className="row">
                        {this.state.showSpinner ? <Spinner color="success" /> : null}
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-8">    
                           
                           
                            <div className="row">
                                <div className="col-sm-8">
                                    {/* this.state.showContent ? <HTMLRender data={this.state.data} linkCallback={this.linkCallback} /> : null */}
                                    {this.state.showContent ? (
                                    <div id="popup-hapi" className="popupHAPI">
                                        <div className="header">
                                        <span>Beslutningsstøtte</span>
                                        <span
                                            className="popup-close"
                                            onClick={() => this.setState({ showContent: false })}
                                        >
                                            X
                                        </span>
                                        </div>
                                        <div className="content">
                                        <HTMLRender
                                            data={this.state.data}
                                            linkCallback={this.linkCallback}
                                            hideMetadata={true}
                                            hideLinksNavigation={true}
                                        />{" "}
                                        {/** --> hide metadata */}
                                        </div>
                                    </div>
                                    ) : null}
                                </div>
                            </div>

                        </div>
                    </div>
                    

                </div>
                       
            </div>
 
        </div>
    );
  }
};

export default Semantic;
