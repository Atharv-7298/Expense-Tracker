import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    monthlyBudget: user?.monthlyBudget || 0,
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (const key in form) fd.append(key, form[key]);
    if (image) fd.append("profileImage", image);

    await api.put("/user/profile", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await refreshProfile();
    toast.success("Profile updated!");
  };

  return (
    <div className="min-h-screen flex bg-[#f8f6ff]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-10 max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Profile Settings
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg shadow-purple-100 p-6 space-y-4 border border-purple-100"
          >
            <input
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />

            <input
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Change Password (optional)"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              type="number"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Monthly Budget"
              value={form.monthlyBudget}
              onChange={(e) =>
                setForm({ ...form, monthlyBudget: e.target.value })
              }
            />

            <label className="flex items-center gap-3 cursor-pointer text-indigo-600 font-medium">
              <Upload size={18} />
              <span>Upload Profile Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>

            <button
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition-all"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
