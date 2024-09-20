export interface ICarRes {
  message: string;
  payload: ICar[];
}

export interface ICar {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  status: string;
  rent_price: number;
  color: string;
  model: string;
  category: string;
  year: number;
  fuel: string;
  transmission: string;
  seats: number;
  colors: string[];
  user_id: any[];
  thumbnail: string;
  dicount?: number;
  capacity_fuel: number;
  usage_per_km: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount: number;
  quantity?: number;
}
