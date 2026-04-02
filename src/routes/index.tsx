import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import ManufacturingProcess from "../pages/ManufacturingProcess";
import Policies from "../pages/Policies";
import Products from "../pages/Products";
import ProductDetail from "../pages/Products/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "policies/:id",
        element: <Policies />,
      },
      {
        path: "manufacturing",
        element: <ManufacturingProcess />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
