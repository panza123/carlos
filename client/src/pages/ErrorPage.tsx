import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError(); // Fetch the error object

  // Handle the case for route error responses
  const errorMessage = isRouteErrorResponse(error)
    ? (error?.statusText || "An error occurred while trying to load this page.")
    : "An unexpected error occurred.";

  console.error(error); // Log the error for debugging purposes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page not found.</h2>
      <p className="mt-2 text-center max-w-md">
        Sorry, the page you are looking for does not exist. It might have been
        removed, renamed, or is temporarily unavailable.
      </p>
      {errorMessage && (
        <p className="mt-4 text-gray-500 text-sm">
          Error Details: {errorMessage}
        </p>
      )}
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
