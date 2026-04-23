import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RouteTitleSync from "./RouteTitleSync";

const About = lazy(() => import("../pages/About"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const Contact = lazy(() => import("../pages/Contact"));
const Home = lazy(() => import("../pages/Home"));
const ManufacturingProcess = lazy(() => import("../pages/ManufacturingProcess"));
const Policies = lazy(() => import("../pages/Policies"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/Products/ProductDetail"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

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
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "about",
        handle: { title: "Về chúng tôi", layout: { headerMode: "fixed" } },
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        ),
      },
      {
        path: "products",
        handle: { title: "Sản phẩm", layout: { headerMode: "sticky" } },
        element: (
          <SuspenseWrapper>
            <Products />
          </SuspenseWrapper>
        ),
      },
      {
        path: "products/:id",
        handle: { title: "Chi tiết sản phẩm" },
        element: (
          <SuspenseWrapper>
            <ProductDetail />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogs",
        handle: { title: "Tin tức" },
        element: (
          <SuspenseWrapper>
            <Blogs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogs/:id",
        handle: { title: "Chi tiết tin tức" },
        element: (
          <SuspenseWrapper>
            <BlogDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "policies/:id",
        handle: { title: "Chính sách" },
        element: (
          <SuspenseWrapper>
            <Policies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "manufacturing",
        handle: { title: "Quy trình sản xuất" },
        element: (
          <SuspenseWrapper>
            <ManufacturingProcess />
          </SuspenseWrapper>
        ),
      },
      {
        path: "contact",
        handle: {
          title: "Liên hệ",
          layout: { headerMode: "fixed" },
        },
        element: (
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
