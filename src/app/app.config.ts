export class AppConfig {

  static config = require ("../config/app.config.json");

  static getServerHost(): any {
    return this.config.server_host;
  }

  static getServerPort(): any {
    return this.config.server_port;
  }
  
}