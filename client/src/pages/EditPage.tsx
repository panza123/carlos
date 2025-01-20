import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
 
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInsatnce";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get blog ID from URL params
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    model: "",
    year: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  // Fetch blog details when the component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Blog ID is missing");
        return;
      }

      try {
        const response = await axiosInstance.get(`/blog/blogs/${id}`);
        console.log(response.data);  // Log the response to inspect the structure
        if (response.data?.blog) {
          setFormData(response.data.blog); // Set form data with the current blog info
          if (response.data.blog.image) {
            setImagePreview(`http://localhost:5000/${response.data.blog.image}`); // Set the current image preview
          }
        } else {
          toast.error("Blog not found");
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [id]);

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Form validation
    if (!formData.title || !formData.description || !formData.model || !formData.year) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("model", formData.model);
      formDataToSubmit.append("year", formData.year);

      if (image) {
        formDataToSubmit.append("image", image);
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Token is required. Please log in.");
        setLoading(false);
        return;
      }

      // Send the request to the backend with the token in the request header
      const response = await axiosInstance.patch(`/blog/edit/${id}`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending FormData
          "Authorization": `Bearer ${token}`,  // Send token in the Authorization header
        },
      });

      setMessage(response.data.message || "Blog updated successfully!");
      navigate(`/blog/${id}`); // Redirect to the blog's details page
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to update blog. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-4 border border-gray-300 rounded-md h-40"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Selected preview"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
