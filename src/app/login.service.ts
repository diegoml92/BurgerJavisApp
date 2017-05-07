import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Util } from './util';
import { Operations } from './commons';
import { Credentials } from './credentials';
import { compareSync } from 'bcryptjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

	constructor(private http: Http) {}

  /* Log in to the application */
	login(credentials: Credentials): Promise<string> {
		var request : string = 
        Util.getUrlForAction(Operations.USERS, credentials.username);
	    return this.http.get(request)
		    .toPromise()
	      .then(response => {
	        var session = response.json() as Credentials;
          if (credentials.username.toUpperCase() === 
                session.username.toUpperCase() &&
              compareSync (credentials.password, session.password)) {
            return null;
          }
	        return "Invalid username or password";
	      });
	}

}