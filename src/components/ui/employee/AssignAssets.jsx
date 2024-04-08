import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../../../api/axios";
import Modal from "../common/Modal";
import { toast } from "react-toastify";

// Icons
import { TbEdit } from "react-icons/tb";
import {
  FaRegUser,
  FaCar,
  FaLaptop,
  FaMobile,
  FaBriefcase,
  FaHeadphones,
  FaMouse,
  FaKeyboard,
  FaDesktop,
  FaChair,
  FaTable,
  FaFan,
} from "react-icons/fa";

const AssignAssets = () => {
  // Assets States
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState("");

  // Get Single Asset For Employee
  const getAssetByEmployeeId = async (employee_id) => {
    const response = await axiosInstance.get(
      `/api/employee/getAssetsById/${employee_id}`
    );
    return response.data;
  };

  // Get All Assets

  const getAllAssets = async () => {
    const response = await axiosInstance.get("/api/employee/getAllAssets");
    return response.data;
  };

  const { data: AllAssets } = useQuery("assets", getAllAssets);

  const AllAssetsForEmployee =
    AllAssets &&
    AllAssets.map((asset) => ({
      ...asset,
      employee_id: currentEmployee,
    }));

  // Handle Asset Click
  const handleAssetClick = (asset) => {
    if (
      selectedAssets.some(
        (selectedAsset) => selectedAsset.asset_id === asset.asset_id
      )
    ) {
      // If the asset is already selected, deselect it
      setSelectedAssets((prev) =>
        prev.filter((item) => item.asset_id !== asset.asset_id)
      );
      console.log(selectedAssets);
    } else {
      // If the asset is not selected, select it
      setSelectedAssets((prev) => [...prev, asset]);
      console.log(selectedAssets);
    }
  };
  // Handle Assets Submit

  const submitAssets = async (data) => {
    const response = await axiosInstance.post(
      "/api/employee/createAsset",
      data
    );
    return response.data;
  };

  const AssetMutation = useMutation(submitAssets, {
    onSuccess: () => {
      toast.success("Assets Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to submit assets");
    },
  });

  const handleAssetsSubmit = () => {
    // Perform further actions with the selected assets data
    const data = selectedAssets.map((asset) => ({
      asset: asset.asset_id,
      employee_id: currentEmployee,
    }));

    AssetMutation.mutate(data);
  };

  // Modal States
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = async (employee_id) => {
    setIsOpen(true);
    setCurrentEmployee(employee_id);

    try {
      const employeeAssets = await getAssetByEmployeeId(employee_id);
      setSelectedAssets(employeeAssets.map((asset) => asset)); // Update this line
    } catch (error) {
      console.error("Failed to fetch employee assets:", error);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setCurrentEmployee("");
    setSelectedAssets([]);
  };

  const getAllEmployees = async () => {
    const response = await axiosInstance.get("/api/employee/getAllEmployees");
    return response.data;
  };

  const {
    data: employees,
    isLoading,
    error,
    isError,
  } = useQuery("employees", getAllEmployees);

  return (
    <section className="p-4">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Assign Assets
      </h1>
      <div style={{ flex: 1, overflowX: "auto" }} className="my-6">
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-base font-bold uppercase text-gray-700 h-8">
            <tr>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>

              <th scope="col" className="py-3 px-6">
                Email
              </th>

              <th scope="col" className="py-3 px-6">
                Role
              </th>

              <th scope="col" className="py-3 px-6">
                Father Name
              </th>

              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {employees &&
              employees.result.map((employee) => (
                <tr
                  className="border-b light:bg-gray-200 light:border-gray-200"
                  key={employee.employee_id}
                >
                  <td className="py-4 px-6">
                    {<FaRegUser className="w-6 h-6" />}
                  </td>
                  <td className="py-4 px-6">{employee.name}</td>
                  <td className="py-4 px-6">{employee.email}</td>
                  <td className="py-4 px-6">{employee.role}</td>
                  <td className="py-4 px-6">{employee.father_name}</td>

                  <td
                    className="py-4 px-6"
                    onClick={() => handleModalOpen(employee.employee_id)}
                  >
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      <TbEdit className="w-6 h-6" />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>
          <button
            className="px-2 py-1 mt-2 mb-4 rounded-md bg-red-500 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4">
            {AllAssets &&
              AllAssetsForEmployee.map((asset) => (
                <div
                  className={`p-4 flex flex-col items-center rounded-lg ${
                    selectedAssets.find(
                      (selectedAsset) =>
                        selectedAsset.asset_id === asset.asset_id
                    )
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleAssetClick(asset)}
                  key={asset.asset_id}
                >
                  {
                    // Display the icons based on the asset type
                    asset.asset_name === "Car" ? (
                      <FaCar className="w-8 h-8" />
                    ) : asset.asset_name === "Laptop" ? (
                      <FaLaptop className="w-8 h-8" />
                    ) : asset.asset_name === "Mobile" ? (
                      <FaMobile className="w-8 h-8" />
                    ) : asset.asset_name === "Briefcase" ? (
                      <FaBriefcase className="w-8 h-8" />
                    ) : asset.asset_name === "Headphones" ? (
                      <FaHeadphones className="w-8 h-8" />
                    ) : asset.asset_name === "Mouse" ? (
                      <FaMouse className="w-8 h-8" />
                    ) : asset.asset_name === "Keyboard" ? (
                      <FaKeyboard className="w-8 h-8" />
                    ) : asset.asset_name === "Desktop" ? (
                      <FaDesktop className="w-8 h-8" />
                    ) : asset.asset_name === "Chair" ? (
                      <FaChair className="w-8 h-8" />
                    ) : asset.asset_name === "Table" ? (
                      <FaTable className="w-8 h-8" />
                    ) : asset.asset_name === "Fan" ? (
                      <FaFan className="w-8 h-8" />
                    ) : (
                      <FaDesktop className="w-8 h-8" />
                    )
                  }

                  <span>{asset.asset_name}</span>
                </div>
              ))}

            {/* Repeat the above structure for each asset */}
          </div>
          <button
            className="px-6 py-2 rounded-md bg-primary text-white mt-4 w-full"
            onClick={handleAssetsSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default AssignAssets;
