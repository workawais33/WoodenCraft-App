import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-stone-50 text-stone-900">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;