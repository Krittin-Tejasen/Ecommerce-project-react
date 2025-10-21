import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { CartProductImages} from './CartProductImages';

export function CartGrid({cartItem, deliveryOptions, loadCart}) {
  return (
    <div className="cart-item-details-grid">
      <CartProductImages cartItem={cartItem} />

      <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

      <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
    </div>
  );
}
