
export function CartProductImages({cartItem}) {
    return(
      <img className="product-image" src={cartItem.product.image} />
    );
}