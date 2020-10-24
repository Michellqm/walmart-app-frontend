import { Injectable } from '@angular/core';

/* Commons */
const SEARCH_ID = 'v1/product';
const SEARCH_PRODUCTS = 'v1/products';

@Injectable()
export class Constants {
  SEARCH_ID : string = SEARCH_ID;
  SEARCH_PRODUCTS: string = SEARCH_PRODUCTS;

}