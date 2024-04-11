import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({ rows, columns }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-base font-bold uppercase text-gray-700 h-8">
        <tr>
          {[...Array(columns)].map((_, index) => (
            <th key={index} scope="col" className="py-3 px-6">
              <Skeleton width={100} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b light:bg-gray-200 light:border-gray-200"
          >
            {[...Array(columns)].map((_, colIndex) => (
              <td key={colIndex} className="py-4 px-6">
                <Skeleton width={150} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
