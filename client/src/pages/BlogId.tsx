import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInsatnce";

interface BlogType {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const BlogId = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/blog/blogs/${id}`)
      .then((res) => {
        if (res.data && res.data.blog) {
          setBlog(res.data.blog);
        } else {
          setError("Blog not found.");
        }
      })
      .catch(() => {
        setError("Failed to load the blog. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <img
        src={`http://localhost:5000/${blog.image}`}
        alt={blog.title}
        className="w-full h-auto object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700">{blog.description}</p>
    </div>
  );
};

export default BlogId;
