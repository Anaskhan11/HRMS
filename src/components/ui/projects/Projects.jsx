import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Projects = () => {
  const getAllProjects = async () => {
    const response = await axiosInstance.get("/api/project/getProjects");
    return response.data;
  };

  const {
    data: projects,
    isLoading,
    error,
    isError,
  } = useQuery("projects", getAllProjects);

  const initialAnimation = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  };

  if (isLoading) {
    return (
      <section className="p-4 my-6 h-screen">
        <Skeleton height={40} />
        <Skeleton count={5} />
      </section>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <motion.section
      className="p-4"
      variants={initialAnimation}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-3xl font-semibold text-secondary mb-4">Projects</h1>
      <div className="flex flex-wrap -mx-2">
        {projects?.data.map((project, index) => (
          <motion.div
            className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 cursor-pointer"
            key={project.project_id}
            variants={itemVariants}
            whileHover={hoverEffect} // Apply hover effect
          >
            <Link to={`/project/detail/${project.project_id}`}>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-5">
                  <h2 className="font-bold text-lg text-primary mb-3">
                    {project.project_name}
                  </h2>
                  <p className="text-sm text-gray-700 mb-3">
                    {project.project_description}
                  </p>
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                      project.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {project && project.status?.toUpperCase()}
                  </span>
                </div>
                <div className="px-5 py-4 bg-gray-50">
                  <div className="text-sm text-gray-600">
                    Start: {project.start_date}
                  </div>
                  <div className="text-sm text-gray-600">
                    End: {project.end_date}
                  </div>
                </div>
                <div className="px-5 py-4 bg-gray-100 text-right">
                  <span className="text-primary hover:underline inline-block">
                    Edit
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
