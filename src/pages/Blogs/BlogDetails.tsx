import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Blog Detail</h1>
      <p className="mt-4">Blog ID: {id}</p>
      {/* Blog detail page content goes here */}
    </div>
  );
}
