import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
  headers: {
    authorization?: string;
  };
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
