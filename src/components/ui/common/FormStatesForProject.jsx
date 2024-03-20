import React from "react";
import { motion } from "framer-motion"; // Importing from 'framer-motion'
import { MdDataSaverOff } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

import { MdOutlineWorkOutline } from "react-icons/md";

const FormStateForProject = ({ currentStage, setCurrentStage }) => {
  const stages = [
    {
      name: "Project Info",
      icon: <MdDataSaverOff className="inline-block w-6 h-6" />,
    },
    {
      name: "Dates Info",
      icon: <IoCalendarOutline className="inline-block w-6 h-6" />,
    },
    {
      name: "Assign & Create",
      icon: <MdOutlineWorkOutline className="inline-block w-6 h-6" />,
    },
  ];

  const offsetFromIcon = 4; // Adjust based on your CSS.

  return (
    <div className="flex items-center justify-between mb-8 w-full relative z-0">
      {stages.map((stage, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <motion.div
              className={`absolute top-1/2 h-1 transform -translate-y-1/2 ${
                currentStage >= index ? "bg-yellow-400" : "bg-gray-200"
              }`}
              style={{
                left: `${
                  (index - 1) * (100 / (stages.length - 1)) + offsetFromIcon / 2
                }%`,
                width: `calc(${
                  92 / (stages.length - 1)
                }% - ${offsetFromIcon}px)`,
              }}
              initial={{ width: 0 }}
              // Animate to the full calculated width if the current stage is beyond this index
              animate={
                currentStage >= index
                  ? {
                      width: `calc(${
                        92 / (stages.length - 1)
                      }% - ${offsetFromIcon}px)`,
                    }
                  : {}
              }
              transition={{ duration: 0.5 }} // Adjust duration as needed
            ></motion.div>
          )}
          <button
            type="button"
            className={`p-2 rounded-full font-medium text-sm flex items-center gap-2 ${
              currentStage >= index
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            } mx-2 focus:outline-none relative z-10`}
            onClick={() => setCurrentStage(index)}
          >
            {stage.icon}
            <span className="hidden md:block">{stage.name}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormStateForProject;
