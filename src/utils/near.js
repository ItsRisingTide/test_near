import environment from './config';

import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

const nearEnv = environment('testnet');

export const initiallizeContract = async () => {
  const near = await connect({
    ...nearEnv,
    deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
  });
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(window.walletConnection.account(), nearEnv.contractName, {
    viewMethods: ['getProduct', 'getProducts'],
    changeMethods: ['buyProduct', 'setProduct'],
  });
};

export const accountBalance = async () => {
  console.log('AccountBalalance fired');
  const walletBalance = await window.walletConnection.account().getAccountBalance();
  return formatNearAmount(walletBalance.total, 2);
};

export const getAccountId = async () => {
  console.log('Get accountId fired');
  return window.walletConnection.getAccountId();
};

export const login = () => {
  window.walletConnection.requestSignIn(nearEnv.contractName);
};

export const logout = () => {
  window.walletConnection.signOut();
  //
  window.location.reload();
};
