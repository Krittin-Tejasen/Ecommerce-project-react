import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Products } from "./Product";

vi.mock("axios"); //mock a fake version of axios

describe("Product component", () => {
  let product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  };

  let loadCart = vi.fn(); //mock function

  let user = userEvent.setup(); //setup user test event

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    loadCart = vi.fn();
    user = userEvent.setup();
    
  });

  it("display the product details correctly", () => {
    render(<Products product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );

    expect(screen.getByTestId("product-rating-star-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    render(<Products product={product} loadCart={loadCart} />);

    
    const addToCartButton = screen.getByTestId("add-to-cart");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("quantity selector", async () => {
    render(<Products product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId("quantity-selector");
    expect(quantitySelector).toHaveValue('1');

    await user.selectOptions(quantitySelector, '3')
    expect(quantitySelector).toHaveValue('3');

    const addToCartButton = screen.getByTestId("add-to-cart");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();

  });


});
