export interface IProductApi {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
  currency: string;
  subcategory: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
  currency: string;
  subcategory: string;
}

export interface IBasket {
  product: IProduct;
  quantity: number;
}

export interface IProductData {
  products: Array<IProduct>;
  categories: Array<ICategory>;
  currentCategory: ICategory | null;
}

export interface IProductObject {
  [key: string]: IProductApi;
}

export interface ICategoryObject {
  [key: string]: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  parent: number;
}

export interface IOrder {
  basketContent: IBasket[];
  deliveryType: string;
  deliveryValue: number;
  paymentType: string;
  status: string;
}
