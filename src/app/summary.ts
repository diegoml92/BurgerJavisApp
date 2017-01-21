import { Category } from './category';
import { TopProduct } from './top-product';

export class Summary {

  constructor(
    public profits: number,
    public completed: number,
    public topCategories: Category[],
    public topProducts: TopProduct[][]) {}

}