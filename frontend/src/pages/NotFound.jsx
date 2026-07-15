import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-primary">404</p>
      <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
      <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-6">
        <Link to="/dashboard" className="text-base font-medium text-primary hover:text-primary-dark">
          Go back to dashboard<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
