export interface Transaction {
  id?: string;
  description?: string;
  mount?: number;
  date?: string | number;
  company_id?: string;
  user_id?: string;
  type?: string;
}

export type Periodicity = 'monthly' | 'diary';
export interface TransactionAnalytic {
  [key: string]: {
    entry: number;
    expense: number;
    utility: number;
  };
}
export interface Analitycs {
  start?: number;
  end?: number;
  transactions?: TransactionAnalytic;
  entry?: number;
  expense?: number;
  periodicity?: Periodicity;
}
