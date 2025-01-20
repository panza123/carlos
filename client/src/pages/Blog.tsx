import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInsatnce";
import { Link } from "react-router-dom";

interface BlogType {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance
      .get("/blog/blogs")
      .then((res) => {
        if (res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        } else {
          setError("Invalid response format.");
        }
      })
      .catch((err) => {
        setError("Failed to load blogs. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog._id}`}
            className="block border-b p-6 sm:flex flex-wrap items-center gap-6 hover:bg-gray-100"
          >
            {/* Image on the left */}
            <img
              src={`http://localhost:5000/${blog.image}`}
              alt={blog.title}
              className="w-full sm:w-56 h-auto object-cover rounded-lg"
            />

            {/* Text content on the right */}
            <div className="flex flex-col flex-1">
              <p className="text-gray-700 mb-4">
                {blog.description.length > 30
                  ? `${blog.description.slice(0, 30)}...`
                  : blog.description}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default Blog;
