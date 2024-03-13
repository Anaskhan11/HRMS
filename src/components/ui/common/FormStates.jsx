import React from "react";

// Icons
import { CgProfile } from "react-icons/cg";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";

const FormStates = ({ activeState, setActiveState }) => {
  const states = [
    "Personal Information",
    "Employee Information",
    "Employment Information",
  ];

  // Adjust these based on the visual gap you want to maintain from the icons.
  const offsetFromIcon = 4; // Adjust based on your CSS.

  return (
    <div className="flex items-center justify-between mb-8 w-full relative">
      {states.map((state, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={`absolute top-1/2 h-1 transform -translate-y-1/2 ${
                activeState >= index ? "bg-yellow-400" : "bg-gray-200"
              }`}
              style={{
                left: `${
                  (index - 1) * (100 / (states.length - 1)) + offsetFromIcon / 2
                }%`,
                width: `calc(${
                  92 / (states.length - 1)
                }% - ${offsetFromIcon}px)`,
              }}
            ></div>
          )}
          <button
            className={`p-2 rounded-full font-medium text-sm flex items-center gap-1 ${
              activeState >= index
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-gray-700"
            } mx-2 focus:outline-none relative z-10`}
            onClick={() => setActiveState(index)}
          >
            {state === "Personal Information" && (
              <CgProfile className="inline-block w-6 h-6" />
            )}
            {state === "Employee Information" && (
              <GrUserWorker className="inline-block w-6 h-6" />
            )}
            {state === "Employment Information" && (
              <MdOutlineWorkOutline className="inline-block w-6 h-6" />
            )}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormStates;
