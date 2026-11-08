import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] cursor-pointer overflow-hidden bg-stone-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 transition duration-300 group-hover:translate-y-0">
          <span className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm">
            View Details
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {product.category}
          </span>

          <span className="flex items-center gap-1 text-sm font-semibold text-stone-700">
            <span className="text-amber-400">★</span>
            {product.rating}
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="cursor-pointer">
          <h3 className="text-lg font-bold text-stone-900 transition-colors duration-200 hover:text-emerald-800">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4">
          <p className="text-xl font-bold text-stone-900">
            ${product.price}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;