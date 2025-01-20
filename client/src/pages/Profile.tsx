import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInsatnce";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Define the blog type
interface Blog {
  _id: string; // Assuming the backend uses _id as the unique identifier
  image: string;
  description: string;
}

const Profile: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blog/fetch');
        console.log(res.data); // Log the response to check the data structure
        setBlogs(res.data.data || []); // Set blogs correctly from the 'data' field
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/blog/delete/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id)); // Ensure correct matching of _id
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
      {/* Check if blogs exist, show a message if none found */}
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id} // Use _id consistently
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`http://localhost:5000/${blog.image}`} // Ensure the correct image URL
                alt="Blog"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="text-gray-700 mb-3">
                {blog.description.length > 100
                  ? `${blog.description.slice(0, 100)}...`
                  : blog.description}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)} // Use _id consistently
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)} // Use _id consistently
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrashAlt className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
