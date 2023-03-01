export default interface Address {
  id: number;
  street: string;
  district: string;
  city?: string;
  province?: string;
  country: string;
}
