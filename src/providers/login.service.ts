import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Util } from '../app/util';
import { Operations } from '../app/commons';
import { Credentials } from '../app/credentials';
import { compareSync } from 'bcryptjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http: HTTP) {}

  /* Log in to the application */
  login(credentials: Credentials): Promise<any> {
    var request : string = 
        Util.getUrlForAction(Operations.USERS, credentials.username);
    return this.http.get(request, null, null)
              .then(response => {
                var session = response.data as Credentials;
                if (credentials.username.toUpperCase() === 
                      session.username.toUpperCase() &&
                    compareSync (credentials.password, session.password)) {
                  return new Credentials (credentials.username,
                                          credentials.password,
                                          session.roles);
                }
                return null;
              });
  }

  /* Return username list */
  getUsernames(): Promise<string[]> {
    var request : string =
        Util.getUrlForAction(Operations.USERNAMES);
    return this.http.get(request, null, null)
              .then(response => {
                return response.data as string[];
              });
  }

}