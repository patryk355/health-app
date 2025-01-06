interface Mineral {
  mineral_id: number;
  amount: number;
}

interface Goodness {
  goodness_id: number;
  amount: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  advantages: string;
  disadvantages: string;
  contraindications: string;
  images: string;
  category_id: number;
  minerals?: Mineral[];
  goodness?: Goodness[];
  recipes?: number[];
}

export interface ProductFormData {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  contraindications: string[];
  images: string[];
  category_id: '' | number;
  minerals: Goodness[];
  goodness: Mineral[];
}

export interface CreateProductData
  extends Omit<
    ProductFormData,
    'advantages' | 'disadvantages' | 'contraindications'
  > {
  advantages: string;
  disadvantages: string;
  contraindications: string;
}
