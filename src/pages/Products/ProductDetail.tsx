import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Product Detail</h1>
      <p className="mt-4">Product ID: {id}</p>
      {/* Product detail page content goes here */}
    </div>
  );
}
