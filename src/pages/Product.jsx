import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Product() {
  // Extragm functia de pe state care ne permite sa modificam cart-ul
  const {cartDispatch} = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);
  // Preluam parametrul din URL.
  let { id } = useParams();
  // In url, id-ul este codificat cu functia encodeURI. Il decodam.
  id = decodeURI(id);
  // Cerem produsul de la API si actualizam state-ul.
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  // Extragem datele de inters din produs.
  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  function handleAddToCart(product){
    // Apelam functia cu actiunea aferenta adaugarii in cart
    const actionResult = addToCart(product);
    // trimitem catre reducer rezultatul actiunii de mai sus
    cartDispatch(actionResult);
  }

  return (
    // Afisam datele despre produs pe ecran.
    <div className="d-flex my-3 mx-2">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button variant="success"
        onClick={() => {
          handleAddToCart({
            id,
            image: thumb,
            name,
            price: retailPrice
          })
        }}>Adaugă în coș</Button>
      </div>
    </div>
  );
}
