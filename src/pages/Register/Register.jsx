import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    const result = register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    setSuccess(result.message);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  };

  return (
    <section className="mx-4 mt-6 mb-4 min-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm sm:mx-6 lg:mx-8">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative hidden min-h-[650px] overflow-hidden bg-stone-900 lg:block">
          <img
            src="https://www.woodencraft.eu/_lib/images/gallery/set_2.jpg"
            alt="Wooden handcrafted furniture"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
              Join Wooden Craft
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
              Start your handcrafted journey.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-stone-200">
              Create your account and explore beautiful wooden pieces made to
              bring warmth and character into your space.
            </p>
          </div>
        </div>

        <div className="flex items-center p-7 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                Wooden Craft
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Create Account
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Create your account to start shopping our collection.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-stone-800"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-800"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-stone-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 pr-20 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg px-2 py-1 text-xs font-bold text-stone-500 transition hover:bg-stone-200 hover:text-stone-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="cursor-pointer font-bold text-emerald-700 transition-colors duration-200 hover:text-emerald-800"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;