import { BsFillBellFill, BsFillCartCheckFill, BsFillCartFill, BsFillCartXFill } from "react-icons/bs";
import Button from '../../button/Button';

export default function AddToCartButton({ isInCart, handleClick, stock, isInStock }) {
  return (
    isInCart ? (
        <Button type="cart" text="Hozzáadva" primary handleClick={handleClick}>
            <BsFillCartCheckFill />
        </Button>
    ) : isInStock ? (
    <Button
      type="cart"
      text="Kosárba"
      handleClick={handleClick}
      disabled={stock == 0}
    >
      {stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}
    </Button>
  ) : (
    <div>
      <Button
        type="cart"
        notInStock
        handleClick={handleClick}
        disabled={stock == 0}
      >
        {stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}
      </Button>
      <Button type="cart">
        <BsFillBellFill />
      </Button>
    </div>
  ));
}
