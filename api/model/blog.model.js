import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true,
        },
        image: {
            type: String, 
            required: true,
        },
        model: {
            type: String, 
            required: true,
        },
        year: {
            type: String, 
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
