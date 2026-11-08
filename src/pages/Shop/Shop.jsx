import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";

const categories = ["All", ...new Set(products.map((product) => product.category))];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === "All"
        ? [...products]
        : products.filter((product) => product.category === selectedCategory);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <section className="mx-4 mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white px-5 py-12 shadow-sm sm:mx-6 sm:px-6 sm:py-16 lg:mx-8 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            Wooden Craft Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Shop Our Collection
          </h1>

          <p className="mt-5 text-base leading-7 text-stone-600 sm:text-lg">
            Explore handcrafted furniture, kitchen essentials, and wooden
            decor made to bring warmth and character into your space.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[220px_1fr] lg:gap-8">
          <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Categories
              </p>

              <h2 className="mt-2 text-lg font-bold text-stone-900">
                Browse By Category
              </h2>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/10"
                        : "bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"}
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  {selectedCategory === "All"
                    ? "Showing our complete collection"
                    : `Showing ${selectedCategory.toLowerCase()} products`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort"
                  className="whitespace-nowrap text-sm font-semibold text-stone-700"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-stone-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:w-auto"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-16 text-center shadow-sm">
                <p className="text-lg font-bold text-stone-900">
                  No products found
                </p>

                <p className="mt-2 text-sm text-stone-500">
                  Try selecting another category.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 cursor-pointer rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-emerald-600"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;