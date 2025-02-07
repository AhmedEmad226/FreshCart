import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Products from "./Components/Products/Products.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishListContextProvider from "./context/WishListContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifyresetcode", element: <VerifyResetCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            {" "}
            <CheckOut />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            {" "}
            <AllOrders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            {" "}
            <WishList />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            {" "}
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <>
		<Provider store={store}>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster />
            </CartContextProvider>
          </WishListContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
		</Provider>
    </>
  );
}

export default App;
