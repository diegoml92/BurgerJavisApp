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