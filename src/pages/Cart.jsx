import React, { useContext } from 'react';
import { CartContext } from '../store/Cart/context';
import { Button } from 'react-bootstrap';
import { removeFromCart } from '../store/Cart/actions';

export function Cart() {
  // Extragem state-ul de shopping cart si functia care ne permite sa modificam state-ul 
  const {cartState, cartDispatch} = useContext(CartContext);

  function handleCartRemove(id) {
    // Apelam actiunea de remove from cart, si ii trimitem id-ul produsului
    const actionResult = removeFromCart(id);
    // Trimit rezultatul actiunii catre reducer
    cartDispatch(actionResult);
  }

  return (
    <div className='mx-2'>
      {/* Daca nu avem in cartState.products produse, atunci afisam un mesaj */}
      {cartState.products.length === 0 ? (<p>Momentan nu sunt produse in cos</p>) : (
        cartState.products.map((product) => {
          const totalProductPrice = product.price * product.quantity;
          return (
            <div className='m-3' key={product.id}>
              <div className='d-flex align-items-center justify-content-between mb-3'>
                <img src={product.image} alt='product image'/>
                <strong>{product.name}</strong>
                <p>{product.quantity} X {product.price}$ = {totalProductPrice}$</p>
              </div>
              <Button variant='danger' onClick={() => handleCartRemove(product.id)}>Remove</Button>
            </div>
          )
        })
      )}
    </div>
  );
}
