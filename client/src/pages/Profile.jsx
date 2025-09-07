import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: "",
    imageFile: null,
  });

  // User ma'lumotlarini olish
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Siz login qilmagansiz");

        const res = await axios.get("http://192.168.100.85:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.user || res.data;
        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          image: userData.image || "",
          imageFile: null,
        });
      } catch (err) {
        console.log(err.response);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Form inputlarni o'zgartirish
  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Formani saqlash
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Siz login qilmagansiz");

      let updateData;

      if (formData.imageFile) {
        // Rasm bilan yuborish
        const fileData = new FormData();
        fileData.append("image", formData.imageFile);
        fileData.append("firstName", formData.firstName);
        fileData.append("lastName", formData.lastName);

        const res = await axios.put(
          `http://192.168.100.85:5000/api/user/update/${user._id}`,
          fileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        updateData = res.data.user;
      } else {
        // Faqat matn ma'lumotlari
        const res = await axios.put(
          `http://192.168.100.85:5000/api/user/update/${user._id}`,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        updateData = res.data.user;
      }

      setUser(updateData);
      setIsEditing(false);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || err.message);
    }
  };

  // Rasm URLini tozalash (memory leak oldini olish)
  useEffect(() => {
    return () => {
      if (formData.imageFile) URL.revokeObjectURL(formData.imageFile);
    };
  }, [formData.imageFile]);

  // Loading va xatolarni ko'rsatish
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-500 border-b-4 border-gray-700"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900  to-gray-900 p-4">
      <div className="max-w-md w-full bg-[#1e1e3f] p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Edit button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 bg-violet-600 p-2 rounded-full shadow-lg hover:bg-violet-700 transition"
        >
          <Pencil className="w-5 h-5 text-white" />
        </button>

        {/* Profile rasm + name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-24 h-24">
            {isEditing && (
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full h-full rounded-full border-2 border-violet-500/50 cursor-pointer opacity-0 absolute top-0 left-0 z-10"
              />
            )}
            <img
              src={
                formData.imageFile
                  ? URL.createObjectURL(formData.imageFile)       // Tanlangan rasm
                  : formData.image
                    ? `http://192.168.100.85:5000/uploads/${formData.image}` // Serverdagi rasm
                    : "/default-profile.png"                         // Default rasm
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-violet-500/50 object-cover shadow-lg"
            />

          </div>

          <div className="flex flex-col gap-2 flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-[#3a3a65] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-[#3a3a65] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                  placeholder="Last Name"
                />
                <button
                  onClick={handleSave}
                  className="mt-3 bg-violet-600 px-4 py-2 rounded-lg text-white hover:bg-violet-700 shadow-lg transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-white">
                  {user.firstName}
                </p>
                <p className="text-xl text-gray-300">{user.lastName}</p>
              </>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mt-3 hover:bg-gray-800 p-3 rounded-lg shadow-inner transition">
          <p className="text-gray-400 text-sm">Email:</p>
          <p className="text-white font-medium">{user.email}</p>
        </div>

        {/* Role */}
        <div className="mt-3 hover:bg-gray-800 p-3 rounded-lg shadow-inner transition">
          <p className="text-gray-400 text-sm">Role:</p>
          <p className="text-white font-medium">{user.role}</p>
        </div>

        {/* Orders */}
        <div className="mt-3 hover:bg-gray-800 p-3 rounded-lg shadow-inner transition">
          <p className="text-gray-400 text-sm">Orders:</p>
          {user.orders && user.orders.length > 0 ? (
            <ul className="list-disc list-inside text-white">
              {user.orders.map((order, i) => (
                <li key={i}>{order}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white font-medium">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
