import { BASE_API } from '@/shared/constants/baseApi';
import { PRODUCT_ENDPOINTS } from '../constants/productEndpoints';
import { ApiResult } from '@/shared/types/apiResult';
import { ProductResponse } from '../types/productResponse';

async function fetchAllProducts(): Promise<ApiResult<ProductResponse[]>> {
  const response = await fetch(`${BASE_API}/${PRODUCT_ENDPOINTS.products}`);
  return await response.json();
}

const productService = { fetchAllProducts };

export default productService;
