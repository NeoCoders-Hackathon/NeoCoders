import React, { useEffect, useState } from "react";
import { PencilLine, Check, X } from "lucide-react";
import Loading from "../components/Loading";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    setTimeout(() => {
      // localStorage dan tekshirish
      const savedProfile = localStorage.getItem("profileData");

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setNewName(parsed.name);
        setPreviewImage(parsed.image);
      } else {
        const fakeData = {
          name: "Abror Bakhromov",
          email: "Bakhromovv@gmail.com",
          phone: "+998 95 210 05 50",
          address: "Tashkent, Uzbekistan",
          createdAt: today,
          orders: 0,
          wishlist: 4,
          image: "https://via.placeholder.com/150",
        };
        setProfile(fakeData);
        setNewName(fakeData.name);
        setPreviewImage(fakeData.image);
        localStorage.setItem("profileData", JSON.stringify(fakeData));
      }

      setLoading(false);
    }, 1200);
  }, [today]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
        <Loading />
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
  };

  const saveChanges = () => {
    const updated = {
      ...profile,
      name: newName,
      image: previewImage,
    };
    setProfile(updated);
    localStorage.setItem("profileData", JSON.stringify(updated)); // ✅ localStorage ga yozildi
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setNewName(profile.name);
    setPreviewImage(profile.image);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-6">
      <div className="bg-gradient-to-br from-[#1e1e3f] to-[#2b2b55] text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col gap-6">
        
        {/* Profil rasmi + ism yonma-yon */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-violet-500"
            />
            <label className="absolute bottom-2 right-2 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full cursor-pointer shadow-md">
              <PencilLine className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#3a3a65] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            ) : (
              <h2 className="text-2xl font-bold">{profile.name}</h2>
            )}
            <p className="text-gray-300">📧 {profile.email}</p>
          </div>
        </div>

        {/* Pastki ma’lumotlar */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center">
            <p className="text-lg font-bold">{profile.orders}</p>
            <p className="text-sm text-gray-300">Orders</p>
          </div>
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center">
            <p className="text-lg font-bold">{profile.phone}</p>
            <p className="text-sm text-gray-300">Phone</p>
          </div>
        </div>

        {/* Qo‘shimcha info */}
        <div className="space-y-2 mt-4 text-gray-300">
          <p>📍 {profile.address}</p>
          <p>🗓 Created At: {profile.createdAt}</p>
          <p>❤️ Wishlist: {profile.wishlist}</p>
        </div>

        {/* Edit button */}
        <div className="flex gap-3 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Save
              </button>
              <button
                onClick={cancelChanges}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 flex items-center gap-1"
            >
              <PencilLine className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
