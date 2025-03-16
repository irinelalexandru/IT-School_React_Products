export const initialState = {
    products: []
  };


  export function favoritesReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_FAVORITES": {
             const foundProduct = state.products.find((product) => {
          return product.id === action.payload.id;
        });
               if (foundProduct) {
          return state;
         
        } else {
          return {
            products: [...state.products, action.payload]
          };
        }
      }
      case "REMOVE_FROM_FAVORITES": {
                const filteredProducts = state.products.filter((product) => {
          return product.id !== action.payload;
        });
        return {
          products: filteredProducts
        };
      }
            default: {
        return state;
      }
    }
  }