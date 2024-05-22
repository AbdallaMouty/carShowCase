export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  transmission: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  year: number;
}

export interface FilterProps {
  make?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
  page?: number;
}
