import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-semibold max-sm:text-6xl text-[128px] font-Aniko flex items-center text-light-red">
          404
        </h1>
        <h2 className="capitalize text-light-red text-lg sm:text-xl font-Aniko">
          Oops! Page not found
        </h2>
        <h3 className="text-sm sm:text-base font-medium text-center">
          The page you’re looking for doesn’t exist or may have been moved.
        </h3>
        <span
          onClick={() => navigate(-1)}
          className="text-sm sm:text-base font-medium text-light-red flex items-center gap-1 cursor-pointer underline"
        >
          Go Back
          <Icon icon="midi:arrow-right" width="24" height="24" />
        </span>
      </div>
    </div>
  );
};

export default NotFound;
