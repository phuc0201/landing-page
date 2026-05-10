import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import BlogDetailsSkeleton from "../components/blog/BlogDetailsSkeleton";
import BlogListSkeleton from "../components/blog/BlogListSkeleton";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import ManufacturingProcess from "../pages/ManufacturingProcess";
import { productService } from "../services/productService";
import { store } from "../store";
import RouteTitleSync from "./RouteTitleSync";

// const About = lazy(() => import("../pages/About"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const Contact = lazy(() => import("../pages/Contact"));
const Policies = lazy(() => import("../pages/Policies"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/Products/ProductDetail"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const NotFound = lazy(() => import("../pages/NotFound"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="section-container mx-auto min-h-250 py-10">Loading...</div>}>
    {children}
  </Suspense>
);

const getProductIdFromSlug = (slug?: string) => {
  if (!slug) return null;

  const idPart = slug.split("-").slice(-1)[0];
  const id = Number(idPart);

  return Number.isFinite(id) ? id : null;
};

const getBlogIdFromSlug = (slug?: string) => {
  if (!slug) return null;

  const idPart = slug.match(/-(\d+)$/)?.[1];
  const id = Number(idPart);

  return Number.isFinite(id) ? id : null;
};

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
        handle: {
          title: "Về chúng tôi",
          layout: { headerMode: "fixed" },
        },
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        ),
      },
      {
        path: "san-pham",
        handle: { title: "Sản phẩm", breadcrumb: "Sản phẩm", layout: { headerMode: "sticky" } },
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <Products />
              </SuspenseWrapper>
            ),
          },
          {
            path: ":slug",
            handle: {
              title: "Chi tiết sản phẩm",
              breadcrumb: ({ data }: { data?: unknown }) => {
                const product = data as { name?: string } | null | undefined;
                return product?.name ?? "Chi tiết sản phẩm";
              },
              layout: { headerMode: "sticky" },
            },
            loader: async ({ params }) => {
              const productId = getProductIdFromSlug(params.slug);

              if (!productId) {
                return null;
              }

              try {
                const response = await store
                  .dispatch(
                    productService.endpoints.getById.initiate(productId, {
                      subscribe: false,
                    }),
                  )
                  .unwrap();

                return response.data;
              } catch (error) {
                console.error("Failed to preload product for breadcrumb:", error);
                return null;
              }
            },
            element: (
              <SuspenseWrapper>
                <ProductDetail />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "tin-tuc",
        handle: { title: "Tin tức", breadcrumb: "Tin tức", layout: { headerMode: "sticky" } },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<BlogListSkeleton />}>
                <Blogs />
              </Suspense>
            ),
          },
          {
            path: ":slug",
            handle: {
              title: "Chi tiết tin tức",
              breadcrumb: "Chi tiết tin tức",
              layout: { headerMode: "sticky" },
            },
            element: (
              <Suspense fallback={<BlogDetailsSkeleton />}>
                <BlogDetails />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "chinh-sach/:slug",
        handle: { title: "Chính sách", breadcrumb: "Chính sách", layout: { headerMode: "sticky" } },
        element: (
          <SuspenseWrapper>
            <Policies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "quy-trinh-san-xuat",
        handle: {
          title: "Quy trình sản xuất",
          layout: { headerMode: "fixed" },
        },
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
          layout: { headerMode: "sticky" },
        },
        element: (
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        ),
      },
      {
        path: "yeu-thich",
        handle: { title: "Sản phẩm yêu thích", layout: { headerMode: "sticky" } },
        element: (
          <SuspenseWrapper>
            <Wishlist />
          </SuspenseWrapper>
        ),
      },
      {
        path: "*",
        handle: { title: "Không tìm thấy" },
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
