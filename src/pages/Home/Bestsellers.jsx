import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";

function Bestsellers() {
  const bestsellerProducts = products
    .filter((product) => product.isBestseller)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="mx-4 mt-6 mb-5 overflow-hidden rounded-3xl border border-stone-200 bg-white px-6 py-16 shadow-sm sm:mx-6 sm:px-8 lg:mx-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Customer Favorites
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Our Bestsellers
            </h2>

            <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
              Discover the wooden pieces our customers love most, selected for
              their craftsmanship, character, and timeless appeal.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit cursor-pointer items-center rounded-xl border border-stone-300 bg-stone-50 px-5 py-3 text-sm font-bold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          >
            View All Products
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bestsellers;
