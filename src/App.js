import React, {useState, createContext, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Container, Menu, Icon} from "semantic-ui-react";

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
import AddArticle from "./components/AddArticle";

export const CartContext = createContext();

const CART_KEY = "react-shop";
const STORAGE_KEY = "react-log";

function App() {
    const [cart, setCart] = useState({});
    const [nbArticles, setNbArticles] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({fullname: "", email: ""});

    async function handleLogin(credentials) {
        console.log("credentials", credentials);
        const config = {
            "Content-Type": "application/json",
        };

        return new Promise(function(resolve, reject) {

          axios
              .post("http://localhost:3002/login", credentials, config)
              .then(res => {
                console.log("res.data", res.data);

                switch(res.data.status){
                  case '401':
                    resolve({'message': res.data.message, 'isSuccess': false});
                    break;
        
                  default:
                    saveTokenInLocalstorage(res.data.token);
                    setIsLoggedIn(true);
                    console.log('login');
                    console.log(res.data.user);
                    setUser(res.data.user);
                    resolve({'isSuccess': true});
                }
                
            })
            .catch(err => {console.error('error', err)});
          });
    };

    async function handleRegister(credentials) {
        console.log("handleRegister credentials", credentials);
        const config = {
            "Content-Type": "application/json"
        };


        return new Promise(function(resolve, reject) {
          axios
              .post("http://localhost:3002/register", credentials, config)
              .then(res => {
                console.log('res.data', res.data);
                switch(res.data.status){
                  case '401':
                    resolve({'message': res.data.message, 'isSuccess': false});
                    break;

                  default:
                    saveTokenInLocalstorage(res.data.token);
                    setIsLoggedIn(true);
                    setUser(res.data.user);
                    resolve({'isSuccess': true});
                }
              })
              .catch(err => console.error(err));
        });
    };

    const saveTokenInLocalstorage = token => {
        localStorage.setItem(STORAGE_KEY, token);
    };

    const disconnect = () => {
        localStorage.removeItem(STORAGE_KEY);
        setIsLoggedIn(false);
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
        document.title = `LWAR - Caddie (${nbArticles})`;
    }, [cart, nbArticles]);

    function addToCart(item) {
        if (!cart[item._id]) {
            cart[item._id] = item;
            cart[item._id].quantity = 1;
        } else {
            cart[item._id].quantity += 1;
        }
        setCart({...cart});
    }

    function removeFromCart(item) {
        if (cart[item._id].quantity !== 1) {
            cart[item._id].quantity = cart[item._id].quantity - 1;
        } else {
            delete cart[item._id];
        }
        setCart({...cart});
    }

    function emptyCart() {
        const response = window.confirm(
            "Etes-vous vous sûr de vouloir vider le caddie ? "
        );
        if (response) {
            setCart({});
        }
    }

    function UpdateSellNumber() {
        console.log("UpdateSellNumber");
        const config = {
            "Content-Type": "application/json"
        };
        
        Object.keys(cart).map(key => {
            console.log("cart : ",cart[key]._id);
            console.log("cart nbSell : ",cart[key].quantity);
            axios
                .put("http://localhost:3002/articles", {_id: cart[key]._id, nbSell: cart[key].quantity}, config)
                .catch(err => console.error(err));
        });
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
        emptyCart,
        UpdateSellNumber
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
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Link to="/cart">
                                        <Icon name="cart" size="small"/> <CartSummary/>
                                    </Link>
                                </Menu.Item>
                                {isLoggedIn ? (
                                    <>
                                        <Menu.Item>
                                            <Link to="/add-article">Ajouter un article</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to="/profile">Mon profil</Link>
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <Menu.Item>
                                        <Link to="/login-register">Login/Register</Link>
                                    </Menu.Item>
                                )}
                            </Menu.Menu>

                        </Menu>
                    </Container>
                    <Switch>
                        <Route path="/videos" component={VideosList}/>
                        <Route path="/photos" component={PhotosList}/>
                        <Route path="/musiques" component={MusicsList}/>
                        <Route path="/livres" component={BooksList}/>

                        {isLoggedIn && (
                            <Route path="/add-article" render={(props) =>
                                <AddArticle props={props} user={user}/>}
                            />
                        )}
                        {isLoggedIn && (
                            <Route path="/profile" render={(props) =>
                                <ProfileDetail props={props} user={user} disconnect={disconnect}/>}
                            />
                        )}
                        {!isLoggedIn && (
                            <Route path="/login-register" render={(props) => <Login props={props} login={handleLogin}
                                                                                    register={handleRegister}/>}/>
                        )}

                        <Route path="/cart" component={CartDetails}/>
                        <Route path="/" component={ArticleList}/>
                    </Switch>
                </CartContext.Provider>
            </Router>
        </>
    );
}

export default App;
