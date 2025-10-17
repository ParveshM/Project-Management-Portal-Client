import { Icon } from "@iconify/react";

export const ErrorPage = () => {
  return (
    <div className="bg-white h-screen flex items-center justify-center p-2">
      <div className="flex flex-col items-center gap-2">
        <img src="/confused-duck.gif" alt="Confused Duck" className="size-40" />
        <h2 className="capitalize text-light-red text-lg sm:text-xl font-Aniko">
          Something Went Wrong.
        </h2>
        <h3 className="text-sm sm:text-base font-medium">
          An unexpected error occurred. Don’t worry, we’re on it!
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="text-sm sm:text-base font-medium text-light-red flex items-center gap-1 underline"
        >
          Try Again
          <Icon icon="ic:baseline-refresh" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};
