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
  paymentFee: number;
  totalValue: number;
  status: string;
  orderDate: string;
}

export interface IPaymentMethodApi {
  name: string;
  fee: number;
}

export interface IPaymentMethod {
  id: string;
  name: string;
  fee: number;
}

export interface IDeliveryMethodApi {
  name: string;
  price: number;
}

export interface IDeliveryMethod {
  id: string;
  name: string;
  price: number;
}
