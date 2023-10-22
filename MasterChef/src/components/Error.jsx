import ErrorImage from "../Images/404 Error.jpg";
import { useRouteError, Link } from "react-router-dom"; // import useRouteError for routing error

const Error = () => {
  // call useRouteError so we can access error data while routing
  const err = useRouteError();
  return (
    <div className="error-page w-full min-h-screen flex items-center justify-center flex-col gap-y-5">
      <img
        src={ErrorImage}
        alt="Error Image"
        className="overflow-hidden rounded-xl hover:border-2 hover:border-purple-500"
      />
      <h1 className="text-3xl font-bold underline">
        Oops! The restaurant you're looking for can't be found.
      </h1>
      <h3 className="error-data ">{err.data}</h3>
      <button className="error-back-home border-2 border-black p-3 rounded-2xl bg-purple-300 hover:underline hover:text-blue-300 hover:bg-purple-700">
        <Link to="/">Back Home</Link>
      </button>
    </div>
  );
};

export default Error;
