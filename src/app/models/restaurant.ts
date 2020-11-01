import { Product } from './product';

export interface Restaurant {
    key?: string;
    title: string;
    startTime: string;
    endTime: string;
    products: Array<Product>;
    imageUrl: string;
    city: string;
    addressLine1: string;
}