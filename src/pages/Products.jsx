import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Products() {
  // Luam de pe state functia cartDispatch care ne permite sa modificam state-ul
  const {cartDispatch} = useContext(CartContext);
  // Luam produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);
  const { favoritesDispatch } = useContext(FavoritesContext);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);


  function handleAddToCart(product) {
    // Apelam functia care este aferenta adaugarii unui produs in cart
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer
    cartDispatch(actionResult);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Afisam produsele pe ecran, sub forma de carduri de Bootstrap. */}
      {products.map((product) => {
        return (
          <Card key={product.dealID} style={{ width: '18rem' }} className="m-3">
            {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
            {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url */}
            <Link
              to={`/product/${encodeURI(product.dealID)}`}
              className="text-dark"
            >
              <Card.Img variant="top" src={product.thumb} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-danger">
                  {product.salePrice} $
                </Card.Text>
              </Card.Body>
            </Link>
            <Button variant="success" onClick={() => {
              handleAddToCart({
                id: product.dealID,
                image: product.thumb,
                name: product.name,
                price: product.salePrice
              })
            }}>Adaugă în coș</Button>
          </Card>
        );
      })}
    </div>
  );
}
