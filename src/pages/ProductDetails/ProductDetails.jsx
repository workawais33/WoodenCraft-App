import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-5 py-16">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            Wooden Craft
          </p>

          <h1 className="mt-3 text-3xl font-bold text-stone-900">
            Product Not Found
          </h1>

          <p className="mt-4 leading-7 text-stone-600">
            The product you are looking for does not exist or may have been
            removed.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex cursor-pointer items-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            ← Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
    setAddedToCart(false);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
  };

  return (
    <section className="bg-stone-50 px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="inline-flex cursor-pointer items-center text-sm font-bold text-stone-600 transition hover:text-emerald-800"
        >
          ← Back to Shop
        </Link>

        <div className="mt-8 grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="relative min-h-[400px] bg-stone-100 sm:min-h-[520px] lg:min-h-[650px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              {product.category}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-emerald-700">
                In Stock
              </span>
            </div>

            <div className="mt-7 border-y border-stone-200 py-6">
              <p className="text-3xl font-bold text-stone-900">
                ${product.price}
              </p>

              <p className="mt-4 text-base leading-8 text-stone-600">
                {product.description}
              </p>
            </div>

            <div className="mt-7">
              <p className="text-sm font-bold text-stone-900">Quantity</p>

              <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center text-lg font-bold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <span className="flex h-12 w-14 items-center justify-center border-x border-stone-200 text-sm font-bold text-stone-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center text-lg font-bold text-stone-700 transition hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {addedToCart && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                Product added to your cart successfully.
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-600"
              >
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </button>

              {addedToCart && (
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-4 text-sm font-bold text-stone-800 transition hover:border-emerald-700 hover:text-emerald-800"
                >
                  View Cart
                </button>
              )}

              {!addedToCart && (
                <Link
                  to="/shop"
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-4 text-sm font-bold text-stone-800 transition hover:border-emerald-700 hover:text-emerald-800"
                >
                  Continue Shopping
                </Link>
              )}
            </div>

            <div className="mt-8 grid gap-3 border-t border-stone-200 pt-7 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Craft
                </p>

                <p className="mt-1 text-xs text-stone-500">Handcrafted</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Material
                </p>

                <p className="mt-1 text-xs text-stone-500">Natural Wood</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Quality
                </p>

                <p className="mt-1 text-xs text-stone-500">Made to Last</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
