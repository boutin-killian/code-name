import React, {useEffect, useState, createContext} from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Menu, Icon } from "semantic-ui-react";

import CartSummary from "./components/CartSummary";
import CartDetails from "./components/CartDetails";

export const CartContext = createContext();
const CART_KEY = "react-shop";

function App() {

    const [cart, setCart] = useState({});
    const [nbArticles, setNbArticles] = useState(0);

    useEffect(() => {
        const cartFromStorage = localStorage.getItem(CART_KEY);
        if (cartFromStorage !== null) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    useEffect(() => {
        // only strings in localStorage
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        document.title = `caddie(${nbArticles})`;
    }, [cart, nbArticles]);

    function addToCart(item) {
        console.log("item", item);
        if (!cart[item.id]) {
            cart[item.id] = item;
            cart[item.id].quantity = 1;
        } else {
            cart[item.id].quantity += 1;
        }
        setCart({ ...cart });
        console.log("cart", cart);
    }

    function removeFromCart(item) {
        if (cart[item.id].quantity !== 1) {
            cart[item.id].quantity = cart[item.id].quantity - 1;
        } else {
            delete cart[item.id];
        }
        setCart({ ...cart });
        console.log("cart", cart);
    }

    function emptyCart() {
        console.log('ici');
        const response = window.confirm(
            "Etes-vous vous sûr de vouloir vider le caddie ? "
        );
        if (response) {
            setCart({});
        }
    }

    function countCartArticles() {
        let total = 0;
        Object.keys(cart).map(key => (total += cart[key].quantity));
        setNbArticles(total);
        return total;
    }

    const contextValue = {
        cart,
        addToCart,
        countCartArticles,
        removeFromCart,
        emptyCart
    };

    return (
      <>
          <Router>
              <CartContext.Provider value={contextValue}>
                  <Container>
                      <Menu stackable>
                          <Menu.Item>
                              <Link to="/">Campus Shop</Link>
                          </Menu.Item>
                          <Menu.Item>
                              <Link to="/cart">
                                  <Icon name="cart" size="small" /> <CartSummary />
                              </Link>
                          </Menu.Item>
                      </Menu>
                  </Container>
                  <Switch>
                      <Route path="/cart" component={CartDetails} />
                      <Route path="/" />
                  </Switch>
              </CartContext.Provider>
          </Router>
      </>
  );
}

export default App;
