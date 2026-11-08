import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="mx-4 mt-6 min-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-stone-200 bg-white px-5 py-12 shadow-sm sm:mx-6 sm:px-6 sm:py-16 lg:mx-8 lg:px-8 lg:py-20">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-600">
              ✓
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Wooden Craft
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Order Placed
            </h1>

            <p className="mt-5 leading-7 text-stone-600">
              Your order has been placed successfully. Thank you for shopping
              with Wooden Craft.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex cursor-pointer items-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:bg-emerald-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-4 mt-6 min-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-stone-200 bg-white px-5 py-12 shadow-sm sm:mx-6 sm:px-6 sm:py-16 lg:mx-8 lg:px-8 lg:py-20">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
              🛒
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Wooden Craft
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Your Cart Is Empty
            </h1>

            <p className="mt-5 leading-7 text-stone-600">
              Looks like you haven't added anything to your cart yet. Explore
              our handcrafted collection and find something you love.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex cursor-pointer items-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:bg-emerald-600"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-4 mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white px-5 py-10 shadow-sm sm:mx-6 sm:px-6 sm:py-14 lg:mx-8 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Wooden Craft
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Your Cart
            </h1>

            <p className="mt-3 text-base text-stone-600">
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="cursor-pointer self-start rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 sm:self-auto"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <Link
                      to={`/product/${item.id}`}
                      className="h-32 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl bg-stone-100 sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          {item.category}
                        </p>

                        <Link
                          to={`/product/${item.id}`}
                          className="mt-2 block cursor-pointer text-lg font-bold text-stone-900 transition-colors duration-200 hover:text-emerald-800"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-sm text-stone-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center overflow-hidden rounded-xl border border-stone-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg font-bold text-stone-700 transition-colors duration-200 hover:bg-stone-100"
                          >
                            −
                          </button>

                          <span className="flex h-10 w-12 items-center justify-center border-x border-stone-200 text-sm font-bold text-stone-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg font-bold text-stone-700 transition-colors duration-200 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-5">
                          <p className="text-lg font-bold text-stone-900">
                            ${itemTotal.toFixed(2)}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="cursor-pointer text-sm font-semibold text-red-600 transition-colors duration-200 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Order Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold text-stone-900">
              Cart Total
            </h2>

            <div className="mt-7 space-y-4 border-b border-stone-200 pb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Items</span>
                <span className="font-semibold text-stone-900">
                  {cartCount}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-semibold text-stone-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="text-base font-bold text-stone-900">
                Total
              </span>

              <span className="text-2xl font-bold text-stone-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:bg-emerald-600"
            >
              Place Order
            </button>

            <Link
              to="/shop"
              className="mt-3 flex w-full cursor-pointer items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm font-bold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;