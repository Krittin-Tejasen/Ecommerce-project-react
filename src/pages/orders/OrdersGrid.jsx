
import { OrderHeader } from "./OrderHeader";
import { OrderDetalisGrid } from "./OrderDetailsGrid";



export function OrdersGrid({orders, loadCart}) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />
            
            <OrderDetalisGrid order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}
