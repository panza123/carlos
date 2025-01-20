import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";

// Lazy Loading Components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const SignUp = lazy(() => import("./auth/SignUp"));
const Login = lazy(() => import("./auth/Login"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const BlogId = lazy(() => import("./pages/BlogId"));
const Profile = lazy(() => import("./pages/Profile"));
const EditPage = lazy(() => import("./pages/EditPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage")); // Optional Error Page

function App() {
  // Define routes as constants
  const routes = {
    home: "/",
    about: "/about",
    blog: "/blog",
    blogId: "/blog/:id",
    signup: "/signup",
    login: "/login",
    createBlog: "/create",
    profile: "/profile",
    editBlog: "/edit/:id",
  };

  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Layout />,
      errorElement: <ErrorPage />, // Handle invalid routes
      children: [
        { path: routes.home, element: <Home /> },
        { path: routes.about, element: <About /> },
        { path: routes.blog, element: <Blog /> },
        { path: routes.blogId, element: <BlogId /> },
        { path: routes.signup, element: <SignUp /> },
        { path: routes.login, element: <Login /> },
        { path: routes.createBlog, element: <CreateBlog /> },
        { path: routes.profile, element: <Profile /> },
        { path: routes.editBlog, element: <EditPage /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
