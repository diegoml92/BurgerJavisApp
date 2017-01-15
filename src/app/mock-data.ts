import { OrderItem } from './order-item';
import { Product } from './product';
import { Ingredient } from './ingredient';
import { Category } from './category';

export const INGREDIENTS: Ingredient[] =
  [
    { // 0
      name:"Pan",
      extraPrice:0.0
    },
    { // 1
      name:"Carne",
      extraPrice:0.0
    },
    { // 2
      name:"Lechuga",
      extraPrice:0.0
    },
    { // 3
      name:"Queso",
      extraPrice:0.0
    },
    { // 4
      name:"Tomate",
      extraPrice:0.0
    },
    { // 5
      name:"Jamón",
      extraPrice:0.0
    },
    { // 6
      name:"Jamón Serrano",
      extraPrice:0.0
    },
    { // 7
      name:"Aceitunas",
      extraPrice:0.0
    },
    { // 8
      name:"Cebolla",
      extraPrice:0.0
    },
    { // 9
      name:"Pepinillo",
      extraPrice:0.0
    },
    { // 10
      name:"Atún",
      extraPrice:0.0
    }
  ];

export const CATEGORIES: Category[] =
  [
    { // 0
      name: "Bebidas",
      icon: "beverage",
      favorite: false
    },
    { // 1
      name: "Hamburguesas",
      icon: "burger",
      favorite: false
    },
    { // 2
      name: "Café/Té/Infusiones",
      icon: "coffee",
      favorite: false
    },
    { // 3
      name: "Ensalada",
      icon: "salad",
      favorite: false
    }
  ]

export const PRODUCTS: Product[] =
  [
    { // 0
      name: "Hamburguesa",
      price: 4.50,
      category: CATEGORIES[1],
      ingredients:
      [
        INGREDIENTS [0], INGREDIENTS[1], INGREDIENTS[2],
        INGREDIENTS [3], INGREDIENTS[4]
      ]
    },
    { // 1
      name: "Sandwich",
      price: 3.50,
      ingredients:
      [
        INGREDIENTS[0], INGREDIENTS[5], INGREDIENTS[3]
      ]
    },
    { // 2
      name: "CocaCola",
      category: CATEGORIES[0],
      price: 2.20,
    },
    { // 3
      name: "Cerveza",
      price: 1.25,
    },
    { // 4
      name: "Agua",
      category: CATEGORIES[0],
      price: 1.5,
    },
    { // 5
      name: "Ensalada",
      price: 3.5,
      category: CATEGORIES[3],
      ingredients:
      [
        INGREDIENTS[2], INGREDIENTS[4], INGREDIENTS[7],
        INGREDIENTS[9], INGREDIENTS[10]
      ]
    },
    { // 6
      name: "Filete Pollo",
      price: 4.20
    },
    { // 7
      name: "Nestea",
      category: CATEGORIES[0],
      price: 2.2
    },
    { // 8
      name: "Café",
      category: CATEGORIES[2],
      price: 1.25
    }
  ];

export const ORDER_ITEMS: OrderItem[][] =
  [[ // 0
    {product: PRODUCTS[0], amount: 2},
    {product: PRODUCTS[1], amount: 3},
    {product: PRODUCTS[2], amount: 2},
    {product: PRODUCTS[3], amount: 1},
    {product: PRODUCTS[4], amount: 3}
  ],
  [ // 1
    {product: PRODUCTS[5], amount: 1},
    {product: PRODUCTS[6], amount: 1},
    {product: PRODUCTS[7], amount: 1},
    {product: PRODUCTS[8], amount: 1}
  ],
  [ // 2
    {product: PRODUCTS[0], amount: 2},
    {product: PRODUCTS[1], amount: 1},
    {product: PRODUCTS[2], amount: 3}
  ]];