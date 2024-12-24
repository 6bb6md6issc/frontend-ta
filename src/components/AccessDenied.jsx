import { Link } from "react-router-dom";

const AccessDenied = ({message}) => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
        <h1 className="text-6xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-5">{message}</p>
        <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >
            Go Back
        </Link>
    </section>
  );
};

export default AccessDenied