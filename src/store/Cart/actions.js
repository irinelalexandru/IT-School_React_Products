// Definim actiunea care o sa adauge in cos
export function addToCart(product) {
    return {
        type: "ADD_TO_CART",
        payload: product
    };
}

// Definim actiunea care ne scoate produse din cos
export function removeFromCart(productId) {
    return {
        type: "REMOVE_FROM_CART",
        payload: productId
    };
}