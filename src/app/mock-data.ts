import { OrderItem } from './order-item';
import { Product } from './product';

const productIngredients = [
  [
    {name:"Pan",extraPrice:0.0},
    {name:"Carne",extraPrice:0.0},
    {name:"Lechuga",extraPrice:0.0},
    {name:"Queso",extraPrice:0.0},
    {name:"Tomate",extraPrice:0.0}
  ],
  [
    {name:"Pan",extraPrice:0.0},
    {name:"Jamón",extraPrice:0.0},
    {name:"Queso",extraPrice:0.0}
  ]];

export const PRODUCTS: Product[] =
  [
    {
      name: "Hamburguesa",
      price: 4.50,
      ingredients: productIngredients[0]
    },
    {
      name: "Sandwich",
      price: 3.50,
      ingredients: productIngredients[1]
    },
    {
      name: "CocaCola",
      price: 2.20,
    },
    {
      name: "Cerveza",
      price: 1.25,
    },
    {
      name: "Agua",
      price: 1.5,
    },
    {
      name: "Ensalada",
      price: 3.5,
    },
    {
      name: "Filete Pollo",
      price: 4.20
    },
    {
      name: "Nestea",
      price: 2.2
    },
    {
      name: "Café",
      price: 1.25
    }
  ];

  export const ORDER_ITEMS: OrderItem[][] =
  [[
    {product: PRODUCTS[0], amount: 2},
    {product: PRODUCTS[1], amount: 3},
    {product: PRODUCTS[2], amount: 2},
    {product: PRODUCTS[3], amount: 1},
    {product: PRODUCTS[4], amount: 3}
  ],
  [
    {product: PRODUCTS[5], amount: 1},
    {product: PRODUCTS[6], amount: 1},
    {product: PRODUCTS[7], amount: 1},
    {product: PRODUCTS[8], amount: 1}
  ],
  [
    {product: PRODUCTS[0], amount: 2},
    {product: PRODUCTS[1], amount: 1},
    {product: PRODUCTS[2], amount: 3}
  ]];