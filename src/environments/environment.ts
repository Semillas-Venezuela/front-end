// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mapbox:{
     accessToken: "pk.eyJ1IjoicmVtYnJhbmR0c3giLCJhIjoiY2prOHl5dW8xMW9jbDNwbWt6M2FuYmt1YiJ9.yc99SPceV7DU2hCH3Uc1sQ"
  },
  API:{
    clientId:"5bc8c44efab799bf3ec8587c",
    clientSecret:"WT1mFFWHPU1YOoorv10wCzP2b2zCNh07zMGsO2ZkGtI=",
    url:"https://semillas-venezuela.herokuapp.com"
  }
};
