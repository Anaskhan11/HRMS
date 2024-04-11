import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <section className="p-4 h-[100vh] dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-semibold text-secondary">
        <Skeleton width={200} />
      </h1>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-primary">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md flex gap-4 flex-col items-center justify-center p-4"
          >
            <h2 className="text-md font-semibold">
              <Skeleton width={150} />
            </h2>
            <Skeleton circle width={32} height={32} />
            <h2 className="text-3xl font-bold text-center">
              <Skeleton width={100} />
            </h2>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 h-52 sm:h-52 md:h-72 lg:h-96">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-60 sm:h-auto p-4 rounded shadow shadow-md bg-white"
          >
            <Skeleton width={400} height={400} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardSkeleton;
