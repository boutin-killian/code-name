import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Menu, Icon } from "semantic-ui-react";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import ArticleList from "./components/ArticleList";
import CartSummary from "./components/CartSummary";
import CartDetails from "./components/CartDetails";
import PhotosList from "./components/PhotosList";
import MusicsList from "./components/MusicsList";
import BooksList from "./components/BooksList";
import VideosList from "./components/VideosList";
import ProfileDetail from "./components/ProfileDetail";

export const CartContext = createContext();

const CART_KEY = "react-shop";
const STORAGE_KEY = "react-log";

function App() {
  const [cart, setCart] = useState({});
  const [nbArticles, setNbArticles] = useState(0);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });

  const handleLogin = credentials => {
    console.log("credentials", credentials);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://localhost:3002/login", credentials, config)
      .then(res => {
        console.log("res.data", res.data);
        saveTokenInLocalstorage(res.data.token);
        setIsLoginVisible(false);
        setUser(res.data.user);
      })
      .catch(err => console.error(err));
  };

  const handleRegister = credentials => {
    console.log("handleRegister credentials", credentials);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://localhost:3002/register", credentials, config)
      .then(res => {
        console.log("res.data", res.data);
        saveTokenInLocalstorage(res.data.token);
        setIsLoginVisible(false);
        setUser(res.data.user);
      })
      .catch(err => console.error(err));
  };

  const saveTokenInLocalstorage = token => {
    localStorage.setItem(STORAGE_KEY, token);
  };

  const disconnect = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoginVisible(true);
  };

  //!\ order matters: first useEffect() retrieves from localStorage, second useEffect persists in localStorage
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
                <Link to="/">Lwar</Link>
              </Menu.Item>
              {isLoginVisible ? (
                <Menu.Item>
                  <Link to="/login-register">Login/Register</Link>
                </Menu.Item>
              ) : (
                <Menu.Item>
                  <Link to="/profile">Mon profil</Link>
                </Menu.Item>
              )}
              <Menu.Item>
                <Link to="/cart">
                  <Icon name="cart" size="small" /> <CartSummary />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/videos">Videos</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/photos">Photos</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/musiques">Musiques</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/livres">Livres</Link>
              </Menu.Item>
            </Menu>
          </Container>
          <Switch>
            <Route path="/profile" render={() => <ProfileDetail user={user} disconnect={disconnect} />} />
            <Route path="/cart" component={CartDetails} />
            <Route path="/videos" component={VideosList} />
            <Route path="/photos" component={PhotosList} />
            <Route path="/musiques" component={MusicsList} />
            <Route path="/livres" component={BooksList} />
            <Route path="/login-register" render={() => <Login login={handleLogin} register={handleRegister} />} />
            <Route path="/" component={ArticleList} />
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
