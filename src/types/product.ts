export interface Product {
  id: number;
  name: string;
  description: string;
  advantages: string;
  disadvantages: string;
  contraindications: string;
  images: string;
  category_id: number;
  minerals?: {
    mineral_id: number;
    amount: number;
  }[];
  goodness?: {
    goodness_id: number;
    amount: number;
  }[];
  recipes?: number[];
}
