import React from "react";
import { useQuery } from "react-query";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../../api/axios";
import { FaCableCar, FaLaptop } from "react-icons/fa6";
import {
  FaBriefcase,
  FaCar,
  FaChair,
  FaChargingStation,
  FaDesktop,
  FaFan,
  FaHeadphones,
  FaKeyboard,
  FaMobile,
  FaMouse,
  FaTable,
} from "react-icons/fa";

const EmployeeAssets = () => {
  const fetchEmployeeAssets = async () => {
    const response = await axiosInstance.get(
      `/api/employee//getAssetsById/${
        secureLocalStorage.getItem("user").employee_id
      }`
    );
    return response.data;
  };

  const { data, isLoading, error, isError } = useQuery(
    "employeeAssets",
    fetchEmployeeAssets
  );

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary">Employee Assets</h1>
      <div className="my-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-primary">Your Assets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              {data.map((asset) => (
                <div
                  key={asset.asset_id}
                  className="bg-primary rounded-md shadow-md shadow-primary flex gap-4 flex-col items-center justify-center p-4 hover:scale-105 transition-all"
                >
                  {asset.asset_name === "Laptop" && (
                    <FaLaptop className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Computer" && (
                    <FaDesktop className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Mobile" && (
                    <FaMobile className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Car" && (
                    <FaCar className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Briefcase" && (
                    <FaBriefcase className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Mouse" && (
                    <FaMouse className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Keyboard" && (
                    <FaKeyboard className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Fan" && (
                    <FaFan className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Charger" && (
                    <FaChargingStation className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Headphones" && (
                    <FaHeadphones className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Chair" && (
                    <FaChair className="w-12 h-12 text-white" />
                  )}

                  {asset.asset_name === "Table" && (
                    <FaTable className="w-12 h-12 text-white" />
                  )}

                  <h3 className="text-md font-semibold text-white">
                    {asset.asset_name}
                  </h3>
                  <p className="text-sm text-white">
                    Value: {asset.asset_value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmployeeAssets;
