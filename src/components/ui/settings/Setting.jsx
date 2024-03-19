import React, { useState, useRef } from "react";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../../api/axios";
import { FaRegUser, FaEdit } from "react-icons/fa";
import { useMutation } from "react-query";
import { motion } from "framer-motion";

const updateUser = async ({ userId, formData }) => {
  const response = await axiosInstance.put(`/api/auth/updateuser`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const Settings = () => {
  const [name, setName] = useState(
    secureLocalStorage.getItem("user").name || ""
  );
  const [email, setEmail] = useState(
    secureLocalStorage.getItem("user").email || ""
  );
  const [image, setImage] = useState("");
  const [userProfileImage, setUserProfileImage] = useState(
    secureLocalStorage.getItem("user").image || ""
  );
  const fileInputRef = useRef(null);
  const user = secureLocalStorage.getItem("user") || {
    name: "Default Name",
    email: "default@example.com",
  };

  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const { mutate: updateUserMutation } = useMutation(updateUser);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", secureLocalStorage.getItem("user").user_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", fileInputRef.current.files[0]);

    const userId = user.user_id;
    updateUserMutation({ userId, formData });
  };

  return (
    <>
      <h1 className="text-3xl ml-4 font-semibold text-secondary mb-4">
        Settings
      </h1>

      <motion.section
        className="flex flex-wrap p-4 space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image section */}
        <div className="flex-none">
          <div className="relative" onClick={handleEditImage}>
            {image || userProfileImage ? (
              <img
                src={
                  image ||
                  `${import.meta.env.VITE_APP_BASE_URL}/${userProfileImage}`
                }
                alt="User Profile"
                className="h-80 w-80 object-cover rounded-md"
              />
            ) : (
              <FaRegUser size={192} className="rounded-md bg-gray-200" />
            )}
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer border border-white border-2">
              <FaEdit className="h-8 w-8" />
            </div>
          </div>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleChangeImage}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        {/* User info and form section */}
        <div className="flex-grow space-y-8">
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4 w-64">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Change Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter new name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Change Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter new email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-darker"
            >
              Update Profile
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default Settings;
