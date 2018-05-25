
export const HTTP_PREFIX : string = "http://";
export const API_PREFIX : string = "/appclient";
export const BASIC_PREFIX : string = "Basic ";
export const JSON_HEADER_NAME : string = "Content-Type";
export const JSON_HEADER_VALUE : string = "application/json";

export const N_COLS = 3;

export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_WAITER = "ROLE_WAITER";
export const ROLE_KITCHEN = "ROLE_KITCHEN";

export enum OrderState { INITIAL, KITCHEN, SERVED, FINISHED };

export class Operations {
  static ORDERS = "/orders";
  static PRODUCTS = "/products";
  static INGREDIENTS = "/ingredients";
  static CATEGORIES = "/categories";
  static SUMMARY = "/summary";
  static USERS = "/users";
  static USERNAMES = "/users/username";
  static KITCHEN = "/kitchen";
}