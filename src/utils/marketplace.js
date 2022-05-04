import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { v4 as uuid4 } from 'uuid';

const GAS = 100000000000000;
////////////100000000000000 //14 (100 TGAS)

export const createProduct = (product) => {
  console.log('createProduct fired');

  product.id = uuid4();
  product.price = parseNearAmount(product.price + '');
  return window.contract.setProduct({ product });
};

export const getProducts = () => {
  console.log('getProducts fired');

  return window.contract.getProducts();
};

export const buyProduct = async ({ price, id }) => {
  return await window.contract.buyProduct({ productId: id }, GAS, price);
};
