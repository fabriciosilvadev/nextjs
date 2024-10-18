export interface BrandView {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandUpdate {
  name: string;
}

export interface BrandCreate {
  name: string;
}
