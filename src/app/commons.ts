
export const HTTP_PREFIX : string = "http://";
export const BASIC_PREFIX : string = "Basic ";
export const JSON_HEADER_NAME : string = "Content-Type";
export const JSON_HEADER_VALUE : string = "application/json";

export const CATEGORY_ICONS_URL = "assets/category-icons/"
export const PNG_EXTENSION = ".png"
export const DEFAULT_CATEGORY = {name: "default", text: "Por defecto"};
export const CATEGORY_ICONS : CategoryIcon [] =
[
  {name: "beverage", text: "Bebida"},
  {name: "coffee", text: "Café"},
  {name: "pizza", text: "Pizza"},
  {name: "salad", text: "Ensalada"},
  {name: "taco", text: "Taco"},
  {name: "sandwich", text: "Sandwich"},
  {name: "soda", text: "Refresco"},
  {name: "wine", text: "Vino"},
  {name: "burger", text: "Hamburguesa"},
  {name: "fish", text: "Pescado"},
  {name: "seafood", text: "Marisco"}
];

export class CategoryIcon {

  constructor(public name: string, public text: string) {}

}

export class Operations {
  static ORDERS = "/orders";
  static PRODUCTS = "/products";
  static INGREDIENTS = "/ingredients";
  static CATEGORIES = "/categories";
  static SUMMARY = "/summary";
  static USERS = "/users";
}