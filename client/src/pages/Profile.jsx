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

  const BASE_URL = "http://localhost:5000/api/user"; // localhost ishlaydi

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Siz login qilmagansiz");

        const res = await axios.get(`${BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.user;
        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          image: userData.image || "",
          imageFile: null,
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Siz login qilmagansiz");

      let updateData;

      if (formData.imageFile) {
        const fileData = new FormData();
        fileData.append("image", formData.imageFile);
        fileData.append("firstName", formData.firstName);
        fileData.append("lastName", formData.lastName);

        const res = await axios.put(`${BASE_URL}/update/${user._id}`, fileData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        updateData = res.data.user;
      } else {
        const res = await axios.put(`${BASE_URL}/update/${user._id}`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateData = res.data.user;
      }

      setUser(updateData);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    return () => {
      if (formData.imageFile) URL.revokeObjectURL(formData.imageFile);
    };
  }, [formData.imageFile]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg font-semibold">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-[#1e1e3f] p-6 rounded-3xl shadow-2xl relative">
        <button onClick={() => setIsEditing(!isEditing)} className="absolute top-4 right-4 bg-violet-600 p-2 rounded-full">
          <Pencil className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-24 h-24">
            {isEditing && (
              <input type="file" name="imageFile" accept="image/*" onChange={handleChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer rounded-full z-10" />
            )}
            <img
              src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.image ? `http://localhost:5000/uploads/${formData.image}` : "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-violet-500 object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {isEditing ? (
              <>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="bg-[#3a3a65] text-white px-3 py-2 rounded-lg" placeholder="First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="bg-[#3a3a65] text-white px-3 py-2 rounded-lg" placeholder="Last Name" />
                <button onClick={handleSave} className="mt-3 bg-violet-600 px-4 py-2 rounded-lg text-white">Save</button>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-white">{user.firstName}</p>
                <p className="text-xl text-gray-300">{user.lastName}</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-sm">Email:</p>
          <p className="text-white">{user.email}</p>
        </div>

        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-sm">Role:</p>
          <p className="text-white">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
