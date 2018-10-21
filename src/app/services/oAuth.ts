import {NgxOAuthClient, DefaultHeaders, Configuration} from 'ngx-oauth-client';
@Configuration({
  host: 'https://api.semillasvenezuela.org/'
})
@DefaultHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
})
export class MyApiClient extends NgxOAuthClient {

}