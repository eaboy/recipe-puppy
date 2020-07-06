
interface BaseRecipe {
  href: string;
  thumbnail: string;
  title: string;
}

export interface Recipe extends BaseRecipe {
  ingredients: string[];
}

export interface OriginalRecipe extends BaseRecipe {
  ingredients: string;
}

export interface ApiResponse {
  href: string;
  results: OriginalRecipe[];
  title: string;
  version: number;
}

export interface SearchParams {
  ingredients?: string[];
  course?: string;
  page: number;
}
