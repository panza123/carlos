import User from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs"; 
import Blog from "../model/blog.model.js";

// Correctly resolve the upload directory relative to the current directory
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure `uploads/` directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); // Use the resolved path here
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

export const createBlog = [
    upload.single("image"), // Middleware to handle single file upload
    async (req, res) => {
        const { token } = req.cookies; // Get the token from cookies
        try {
            const {  title, description, model, year } = req.body;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token is required",
                });
            }

            if (!title || !description || !model || !year) {
                return res.status(403).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            const foundedUser = await User.findById(decoded.id);
            if (!foundedUser) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, user not found",
                });
            }

            const imagePath = req.file ? path.relative(process.cwd(), req.file.path) : null;

            const blog = await Blog.create({
                owner: foundedUser._id,
                title,
                description,
                image: imagePath,
                model,
                year,
            });

            return res.status(201).json({
                success: true,
                message: "Blog created successfully",
                data: blog,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
];

// controllers/blogController.js
export const getAllJobs = async (req, res) => {
  try {
    console.log("Received GET request to /blogs");

    const blogs = await Blog.find({});
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }
    
    console.log("Fetched blogs:", blogs);
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Blogs by Creator
export const getBlogsByCreator = async (req, res) => {
    try {
      const { token } = req.cookies; // Get token from cookies
  
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, token not provided' });
      }
  
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }
  
      // Find user by ID
      const user = await User.findById(decoded.id).select("_id");
  
      // Get blogs created by the user
      const blogs = await Blog.find({ owner: user._id });
  
      // Return the blogs in the response
      res.status(200).json({
        success: true,
        message: 'Blogs retrieved successfully',
        data: blogs, // Send blogs in the `data` field
      });
    } catch (err) {
      console.error("Error fetching blogs by creator:", err);
      res.status(500).json({ success: false, message: 'Failed to get blogs by creator', error: err.message });
    }
  };
export const getJobId = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request params
      const blog = await Blog.findById(id); // Assuming Mongoose is being used
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({ blog });
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  export const editBlog = async (req, res) => {
    try {
      const { id } = req.params; // Get blog ID from URL parameters
      const { title, description, model, year } = req.body;
  
      // Validate required fields
      if (!title || !description || !model || !year) {
        console.error("Validation error: Missing fields in the request body", {
          title,
          description,
          model,
          year,
        });
        return res.status(400).json({
          success: false,
          message: "All fields (title, description, model, and year) are required",
        });
      }
  
      // Find the blog post by ID
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      // Update blog fields
      blog.title = title;
      blog.description = description;
      blog.model = model;
      blog.year = year;
  
      // Handle image file if provided
      if (req.file) {
        const imagePath = path.relative(process.cwd(), req.file.path);
        blog.image = `/uploads/${imagePath}`;
      }
  
      // Save the updated blog post
      await blog.save();
  
      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog,
      });
    } catch (error) {
      console.error("Error editing blog:", error);
  
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message || error,
      });
    }
  };
  
  
  
  export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params; // Get blog ID from URL parameters
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      // Delete the blog
      await Blog.findByIdAndDelete(id);
  
      // Optionally, delete the associated image file
      if (blog.image) {
        const imagePath = path.join(process.cwd(), blog.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
        }
      }
  
      res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  };
  