import express from 'express';
import { createBlog, deleteBlog, editBlog, getAllJobs, getBlogsByCreator, getJobId } from '../controller/blog.conroller.js';


const router = express.Router()


router.post('/create',createBlog)
router.get('/blogs',getAllJobs)
router.get('/blogs/:id',getJobId)
router.get('/fetch',getBlogsByCreator)

router.patch('/edit/:id',editBlog)
router.delete('/delete/:id',deleteBlog)




export default router