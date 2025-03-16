import React from 'react';
import { useContext } from 'react';
import { FavoritesContext } from '../store/Favorites/context';
import Button from 'react-bootstrap/Button';
import { removeFromFavorites } from '../store/Favorites/actions';

export function Favorites() {
    const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);
  
    function handleRemoveProduct(productId) {
        const actionResult = removeFromFavorites(productId);
      favoritesDispatch(actionResult);
    }
  
    return (
      <div>
        {favoritesState.products.length === 0 ? (
          <p>Nu ai produse favorite.</p>
        ) : (
          favoritesState.products.map((product) => {
            return (
              <div key={product.id} className="my-3">
                <img src={product.image} alt="" />
                <h2>{product.name}</h2>
                <div>
                  <strong>{product.price}$</strong>
                </div>
                <Button
                  variant="danger"
                   onClick={() => handleRemoveProduct(product.id)}
                >
                  Șterge de la favorite
                </Button>
              </div>
            );
          })
        )}
      </div>
    );
  }