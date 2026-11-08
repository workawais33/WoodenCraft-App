import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    eyebrow: "Handcrafted Collection",
    title: "Wood That Tells a Story",
    description:
      "Discover timeless wooden pieces crafted with natural character, thoughtful design, and genuine artisan care.",
    image:
      "https://cdn.shopify.com/s/files/1/1833/4291/files/The_furniture_features_a_rustic_design_with_visible_wood_grain_and_natural.webp?v=1728234324",
    primaryAction: "Shop Collection",
    secondaryAction: "Explore Furniture",
  },
  {
    id: 2,
    eyebrow: "Made With Character",
    title: "Bring Nature Into Your Home",
    description:
      "From statement furniture to beautiful everyday accents, find pieces designed to make your space feel warmer.",
    image:
      "https://www.woodencraft.eu/_lib/images/gallery/set_2.jpg",
    primaryAction: "Explore Collection",
    secondaryAction: "Shop Furniture",
  },
  {
    id: 3,
    eyebrow: "Artisan Woodcraft",
    title: "Crafted for Everyday Living",
    description:
      "Beautifully crafted wooden products that combine practical function with the warmth of natural materials.",
    image:
      "https://handmadebymike.com/imagesize2/s2_30302_hand-made-by-mike-group-.jpeg",
    primaryAction: "Shop Now",
    secondaryAction: "Discover Decor",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  const goToPrevious = () => {
    setCurrentSlide(
      (current) => (current - 1 + slides.length) % slides.length,
    );
  };

  const goToNext = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className="relative mx-4 overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 shadow-sm sm:mx-6 lg:mx-8">
      <div className="absolute inset-0">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="h-full min-h-[620px] w-full object-cover opacity-80 transition duration-1000 sm:min-h-[660px] lg:min-h-[680px]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-stone-950/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />
      </div>

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 sm:min-h-[660px] sm:px-8 sm:py-24 lg:min-h-[680px] lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-sm">
            {slide.eyebrow}
          </span>

          <h1
            key={`title-${slide.id}`}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:mt-7 sm:text-6xl lg:text-7xl"
          >
            {slide.title}
          </h1>

          <p
            key={`description-${slide.id}`}
            className="mt-5 max-w-xl text-sm leading-7 text-stone-200 sm:mt-6 sm:text-lg sm:leading-8"
          >
            {slide.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl"
            >
              {slide.primaryAction}
              <span className="ml-2">→</span>
            </Link>

            <Link
              to="/shop"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            >
              {slide.secondaryAction}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4 sm:mt-12 sm:gap-5">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:h-11 sm:w-11"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-10 bg-emerald-400"
                      : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:h-11 sm:w-11"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
