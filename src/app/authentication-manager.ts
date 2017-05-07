import { Headers } from '@angular/http';
import { BASIC_PREFIX, JSON_HEADER_NAME, JSON_HEADER_VALUE } from './commons';
import { Credentials } from './credentials';

export class AuthenticationManager {

  private static credentials : Credentials;

  static setCredentials(credentials: Credentials) {
    this.credentials = credentials;
  }

  static resetCredentials() {
    this.credentials = new Credentials();
  }

  static getCredentials(): Credentials {
    return this.credentials;
  }

  static generateAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
  	return new Headers({'Authorization': BASIC_PREFIX + new Buffer(ascii).toString('base64')});
  }

  static generateJsonAuthHeader(): Headers {
    var ascii = this.credentials.username + ":" + this.credentials.password;
    var headers = new Headers();
    headers.append(JSON_HEADER_NAME, JSON_HEADER_VALUE);
    headers.append('Authorization', BASIC_PREFIX + new Buffer(ascii).toString('base64'))
    return headers;
  }

}