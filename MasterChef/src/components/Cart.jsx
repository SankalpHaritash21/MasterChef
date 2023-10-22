import { useSelector, useDispatch } from "react-redux";
import { ITEM_IMG_CDN_URL } from "../utils/Constant";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  //always subscribe only to small portion of store

  const cartItem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center min-h-screen pl-32 pr-32  ">
      <h1 className="text-3xl italic underline">Cart</h1>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 mt-4  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
        onClick={handleClearCart}
      >
        Clear
      </button>
      <div>
        <div className="menu-items-list flex flex-col mb-20 w-full items-center justify-center">
          {cartItem.length === 0 && (
            <span className="mt-4">Cart is Empty. Add items to cart</span>
          )}

          {cartItem.map((item) => (
            <div className="h-[10rem] md:h-10 flex items-center justify-between w-[30rem] md:w-full p-10 ">
              <div className=" gap-y-10 md:gap-y-6">
                <div>{item.name}</div>
                <div className="mt-4 w-[10rem] ">
                  {`₹${item?.price > 0 ? item?.price / 100 : 100}`}
                </div>
              </div>
              <div>
                {item?.imageId && (
                  <img
                    className="menu-item-img h-[10rem] w-[10rem] md:h-[6rem] md:w-[6rem] p-5 rounded-3xl"
                    src={ITEM_IMG_CDN_URL + item?.imageId}
                    alt={item?.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
