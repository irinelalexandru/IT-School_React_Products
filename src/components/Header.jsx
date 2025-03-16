import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';

export function Header() {
  // Accesam state-ul global al aplicatiei despre cart
  const {cartState} = useContext(CartContext);
  const totalProducts = cartState.products.reduce(
    (accumulator, currentElement)=> {
      return accumulator + currentElement.quantity
  },
     0
);
  console.log('coss', totalProducts);
  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">Coș ({totalProducts})</Link>
          <Link to="/favorites" className='p-2'>Favorite</Link>
        </div>
      </div>
    </header>
  );
}
