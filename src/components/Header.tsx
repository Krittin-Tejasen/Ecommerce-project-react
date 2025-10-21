import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import "./Header.css";

import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
  }[];
};

export function Header({ cart }: HeaderProps) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");

  const [search, setSearch] = useState(searchText || "");
  const navigate = useNavigate();

  const updateSearchingInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searching = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={updateSearchingInput}
        />

        <button className="search-button" onClick={searching}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
