import React, { useContext } from "react";
import { CartContext } from "../App";

const CartSummary = () => {
  const { countCartArticles } = useContext(CartContext);
  return (
    <>
      <span>Caddie ({countCartArticles()})</span>
    </>
  );
};
export default CartSummary;
