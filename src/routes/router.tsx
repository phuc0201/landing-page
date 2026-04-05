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
import RouteTitleSync from "./RouteTitleSync";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RouteTitleSync />
        <MainLayout />
      </>
    ),
    children: [
      {
        index: true,
        handle: { title: "Trang chủ", layout: { headerMode: "fixed" } },
        element: <Home />,
      },
      {
        path: "about",
        handle: { title: "Về chúng tôi", layout: { headerMode: "fixed" } },
        element: <About />,
      },
      {
        path: "products",
        handle: { title: "Sản phẩm", layout: { headerMode: "sticky" } },
        element: <Products />,
      },
      {
        path: "products/:id",
        handle: { title: "Chi tiết sản phẩm" },
        element: <ProductDetail />,
      },
      {
        path: "blogs",
        handle: { title: "Tin tức" },
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        handle: { title: "Chi tiết tin tức" },
        element: <BlogDetails />,
      },
      {
        path: "policies/:id",
        handle: { title: "Chính sách" },
        element: <Policies />,
      },
      {
        path: "manufacturing",
        handle: { title: "Quy trình sản xuất" },
        element: <ManufacturingProcess />,
      },
      {
        path: "contact",
        handle: {
          title: "Liên hệ",
          layout: { headerMode: "fixed" },
        },
        element: <Contact />,
      },
    ],
  },
]);
