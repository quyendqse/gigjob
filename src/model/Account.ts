export interface Account {
  id: string;
  created_date: Date;
  email: string;
  image_url: string;
  is_disable: boolean;
  is_locked: boolean;
  password: string;
  role: number;
  updated_date: Date;
  username: string;
}
