// Libs
import React, { useRef, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import gsap from "gsap"; // Import GSAP
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons

import { Link } from "react-router-dom";

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

  const projectRefs = useRef([]);
  projectRefs.current = [];

  // Function to add elements to refs array
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate all project cards
    gsap.from(projectRefs.current, {
      duration: 0.5,
      autoAlpha: 0,
      ease: "back",
      y: 50,
      stagger: 0.2,
    });
  }, [projects]);

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
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary mb-4">Projects</h1>
      <div className="flex flex-wrap -mx-2">
        {projects?.data.map((project, index) => (
          <div
            className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 cursor-pointer"
            key={project.project_id}
            ref={addToRefs} // Attach ref
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
                    {project.status.toUpperCase()}
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
                  <a
                    href="#"
                    className="text-primary hover:underline inline-block"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
