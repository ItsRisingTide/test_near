import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getProducts } from './utils/marketplace';
import { accountBalance, login, logout as destroy } from './utils/near';
import { Nav, Container } from 'react-bootstrap';
import { Cover } from './Components/utils/Cover';
import { Wallet } from './Components/Wallet';
import coverImg from './assets/img/sandwich.jpg';
import { Products } from './Components/marketplace/Products';
import { Notification } from './Components/utils/Notifications';

const App = () => {
  console.log('Render================');
  const account = window.walletConnection.account();
  console.log('Account ', account);

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    if (account.accountId) {
      setProducts(await getProducts());
    }
  });

  const [balance, setBalance] = useState('0');

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    console.log('getBalance was invoked');
    getBalance();
  }, []);

  useEffect(() => {
    console.log('getProducts was invoked');
    if (products.length === 0) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Products />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
      {/* {account.accountId ? (
        products.forEach((product) => console.log('product:', product))
      ) : (
        <button onClick={login}>Connect to NEAR Wallet</button>
      )} */}
    </>
  );
};

export default App;
