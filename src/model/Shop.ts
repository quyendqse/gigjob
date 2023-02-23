export interface Shop {
  id: string;
  description: string;
  name: string;
  account_id: string;
  website?: string;
  images?: Array<string>;
  address?: Array<{
    location: string;
  }>;
}
