import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Util } from '../app/util';
import { Credentials } from '../app/credentials';
import { Operations } from '../app/commons';
import { AuthenticationManager } from './authentication-manager';
import { Summary } from '../app/summary';

@Injectable()
export class SummaryService {

  summaryData: Summary;

  constructor(private http: HTTP, private auth: AuthenticationManager) {
  }

  getSummaryData(): Promise<Summary> {
    var request : string = Util.getUrlForAction(Operations.SUMMARY);
    var credentials : Credentials = this.auth.getCredentials();
    return this.http.get(request, null,
        this.http.getBasicAuthHeader(credentials.username, credentials.password))
      .then(response => {
        this.summaryData = response.data as Summary;
        return this.summaryData;
      });
  }

}