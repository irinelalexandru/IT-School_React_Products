import React, { useReducer } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style.css';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { Header } from './components/Header';
import { themeReducer, initialState as themeInitialState } from './store/Theme/reducer';
import { ThemeContext } from './store/Theme/context';
import { initialState as cartInitialState, cartReducer } from './store/Cart/reducer';
import { CartContext } from './store/Cart/context';
import { Favorites } from './pages/Favorites';
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from './store/Favorites/reducer';
import { FavoritesContext } from './store/Favorites/context';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: '/favorites',
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {
  // Initializam reducer-ul pt tema:
  // useReducer ne intoarce un state si o functie care ne permite modificarea state-ului(ce ar trebui sa contina in denumite dispatch)
  const [themeState, themeDispatch] = useReducer(
    themeReducer, 
    themeInitialState
  );

  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );

  // Initializam reducere-ul pt card
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  // Creeam valoarea pe care o pasam catre ThemeProvider - care face disponibil catre restul componentelor
  const themeContextValue = {
    themeState, 
    themeDispatch,
  }

  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    // Facem disponibile catre intreaga aplicatie state-urile globale
    <CartContext.Provider value={{cartState, cartDispatch}}>
    <ThemeContext.Provider value={themeContextValue}>
    <FavoritesContext.Provider value={favoritesContextValue}>
    <div className="App primary">
      <RouterProvider router={router} />
    </div>
    </FavoritesContext.Provider>
    </ThemeContext.Provider>
    </CartContext.Provider>
  );
}
