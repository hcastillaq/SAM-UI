export interface Transaction {
  id?: string;
  description?: string;
  mount?: Number;
  date?: string | number;
  company_id?: string;
  user_id?: string;
  type?: string;
}

export type Periodicity = 'monthly' | 'diary';

export interface Analitycs {
  start?: number;
  end?: number;
  transactions?: {
    [key: string]: {
      entry: number;
      expense: number;
    };
  };
  entry?: number;
  expense?: number;
  periodicity?: Periodicity;
}
