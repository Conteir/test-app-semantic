export const codeSystems = [
    {
      id: "ICPC-2",
      title: "ICPC-2",
    },
    {
      id: "ICD-10",
      title: "ICD-10",
    },
    {
      id: "ATC",
      title: "ATC",
    },
    {
      id: "SNOMED-CT",
      title: "SNOMED-CT",
    },
  ]

  export const enviroments = [
    {
      id: "test-bt",
      title: "Test BT",
      url: "https://helsedirektoratet-bt.azure-api.net/innhold/",
      key: "143e448642124111b8c5e4d7e00d1975",
    },
    {
      id: "test-st",
      title: "Test ST",
      url: "https://helsedirektoratet-st.azure-api.net/innhold/",
      key: "663f23169cae4c8785ec48defa793c23",
    },
    {
      id: "qa",
      title: "QA",
      url: "https://helsedirektoratet-at.azure-api.net/innhold/",
      key: "4f044f75aeea46529ad158cf910e800c",
    },
    {
      id: "prod",
      title: "Production",
      url: "https://api.helsedirektoratet.no/innhold/",
      key: "89b72a3ad5cf4723b3f489c3eb4d82a1",
    },
  ]

  //SNOMED CT CONFIGURATIONS
  export let terminlogyServer: string = 'https://snowstorm.conteir.no';
  export let branchICD10: string = 'MAIN/SNOMEDCT-NO';
  export let branchICPC2: string = 'MAIN/ICPC-2';
  export let branchHelsebib: string = 'MAIN/SNOMEDCT-NO/HELSEBIBLIOTEKET';
  // export let branchHelsedir: string = 'MAIN/SNOMEDCT-NO/HELSEDIREKTORATET';


  export let conceptRefsetLegemidler = '23951000202100';
  export let conceptRefsetSaturdayNightFeverRusmidler = '23971000202106';
  export let conceptRefsetToxicBeautyPlanter = '23981000202108';
  export let conceptGasserOgKjemikalier = '27011000202108';


  export let conceptRefset = '23951000202100';
  export let urlParameters: string = '?limit=10&active=true&groupByConcept=true&language=no&language=nb&language=nn&language=en&conceptActive=true';

  export const snomedURLs =  
  {
    getTerms: terminlogyServer + '/browser/' + branchHelsebib + '/descriptions' + urlParameters + '&term=',
  }

  export const params = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Ocp-Apim-Subscription-Key": "89b72a3ad5cf4723b3f489c3eb4d82a1",
    },
  };

  export const helsedirBaseUrl = "https://api.helsedirektoratet.no/innhold/innhold/";