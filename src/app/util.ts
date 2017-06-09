import { AppConfig } from './app.config';
import { HTTP_PREFIX } from './commons';

export class Util {

  static getServerUrl(): string {
    return HTTP_PREFIX + AppConfig.getServerHost() + ":" +
              AppConfig.getServerPort();
  }

  static getUrlForAction(action: string, param: string = ""): string {
    return this.getServerUrl() + action + "/" + param;
  }

}