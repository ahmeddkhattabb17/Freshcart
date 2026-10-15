export type IProduct = {
  _id?: string;
  id?: string | number;
  title?: string;
  name?: string;
  category?: { name?: string } | string;
  price?: number | string;
  priceAfterDiscount?: number | string;
  ratingsAverage?: number | string;
  imageCover?: string;
  imageUrl?: string;
};

export type ProductCard = {
  id: number | string;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: string;
  imageUrl?: string;
  discount?: string;
  accent?: string;
};
