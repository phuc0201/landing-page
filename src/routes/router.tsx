import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import ManufacturingProcess from "../pages/ManufacturingProcess";
import RouteTitleSync from "./RouteTitleSync";

// const About = lazy(() => import("../pages/About"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const Contact = lazy(() => import("../pages/Contact"));
const Policies = lazy(() => import("../pages/Policies"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/Products/ProductDetail"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="section-container mx-auto min-h-250 py-10">Loading...</div>}>
    {children}
  </Suspense>
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
        element: <Home />,
      },
      {
        path: "gioi-thieu",
        handle: { title: "Về chúng tôi", layout: { headerMode: "fixed" } },
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        ),
      },
      {
        path: "san-pham",
        handle: { title: "Sản phẩm", layout: { headerMode: "sticky" } },
        element: (
          <SuspenseWrapper>
            <Products />
          </SuspenseWrapper>
        ),
      },
      {
        path: "san-pham/:slug",
        handle: { title: "Chi tiết sản phẩm" },
        element: (
          <SuspenseWrapper>
            <ProductDetail />
          </SuspenseWrapper>
        ),
      },
      {
        path: "bai-viet",
        handle: { title: "Tin tức" },
        element: (
          <SuspenseWrapper>
            <Blogs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "bai-viet/:slug",
        handle: { title: "Chi tiết tin tức" },
        element: (
          <SuspenseWrapper>
            <BlogDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "chinh-sach/:slug",
        handle: { title: "Chính sách" },
        element: (
          <SuspenseWrapper>
            <Policies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "quy-trinh-san-xuat",
        handle: { title: "Quy trình sản xuất", layout: { headerMode: "fixed" } },
        element: (
          <SuspenseWrapper>
            <ManufacturingProcess />
          </SuspenseWrapper>
        ),
      },
      {
        path: "lien-he",
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
