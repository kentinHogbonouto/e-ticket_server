import { Product } from "../api/v1/product/interfaces/product.model";
import { Variant } from "../api/v1/variant/interfaces/variant.model";

export interface SimpleCommande {
  product: Product;
  productVariant: Variant;
  isPregnant: boolean;
  isValidated: boolean;
  status: "choosed" | "takeLater" | "sendToCDR" | "sendToCuisine" | "foodReady";
  price: number;
  ingredientsModifiablesStates: string[];
}
