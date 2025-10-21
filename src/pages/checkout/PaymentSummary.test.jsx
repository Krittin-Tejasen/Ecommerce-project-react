import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock('axios');

describe("PaymentSummary components", () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    paymentSummary = {
      totalItems: 19,
      productCostCents: 23143,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 23642,
      taxCents: 2364,
      totalCostCents: 26006,
    };
  });

  it("display the correct details", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(screen.getByText("Items (19):")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-product-cost"))
        .getByText("$231.43")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("payment-summary-shipping-cost")
    ).toHaveTextContent("$4.99");

    expect(
      screen.getByTestId("payment-summary-total-before-tax")
    ).toHaveTextContent("$236.42");

    expect(screen.getByTestId("payment-summary-tax")
    ).toHaveTextContent("$23.64");

    expect(screen.getByTestId("payment-summary-total")
    ).toHaveTextContent("$260.06");

  });


  it('places an order', async() => {

    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');


  });
});
