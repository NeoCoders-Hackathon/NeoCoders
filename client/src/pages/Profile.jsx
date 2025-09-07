import React, { useEffect, useState } from "react";
import { PencilLine, Check, X, MapPin, Calendar, Heart, Phone, Camera } from "lucide-react";

const Loading = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
    <p className="text-white text-lg font-medium">Loading profile...</p>
  </div>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-GB");

 
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    const defaultProfile = {
      id: 1,
      name: "Abror Bakhromov",
      email: "Bakhromovv@gmail.com",
      role: "admin",
      phone: "+998 95 210 05 50",
      address: "Tashkent, Uzbekistan",
      createdAt: today,
      wishlist: 4,
      image: "https://via.placeholder.com/150/6366f1/ffffff?text=AB",
    };

    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setPreviewImage(parsed.image);
    } else {
      setProfile(defaultProfile);
      setPreviewImage(defaultProfile.image);
      localStorage.setItem("profileData", JSON.stringify(defaultProfile));
    }

    setTimeout(() => setLoading(false), 800);
  }, [today]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewImage(ev.target.result);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = (newName) => {
    if (!newName.trim()) return;
    const updated = { ...profile, name: newName.trim(), image: previewImage };
    setProfile(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setPreviewImage(profile.image);
    setIsEditing(false);
  };

  if (loading || !profile) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <Loading />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-6">
      <div className="bg-[#1e1e3f] text-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col gap-6">
        
   
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <img src={previewImage} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-violet-500 shadow-md" />
            <label className="absolute bottom-0 right-0 bg-violet-600 p-2 rounded-full cursor-pointer">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="space-y-2 flex-1">
            {isEditing ? (
              <input
                type="text"
                defaultValue={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#3a3a65] text-white w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {profile.name}
                <PencilLine className="w-5 h-5 cursor-pointer" onClick={() => setIsEditing(true)} />
              </h2>
            )}
            <p>📧 {profile.email}</p>
            <p>🛡 Role: {profile.role}</p>
            <p>🆔 ID: {profile.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center shadow-md"><Phone className="w-5 h-5 mx-auto mb-1" />{profile.phone}</div>
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center shadow-md"><MapPin className="w-5 h-5 mx-auto mb-1" />{profile.address}</div>
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center shadow-md"><Calendar className="w-5 h-5 mx-auto mb-1" />{profile.createdAt}</div>
          <div className="bg-[#3a3a65] rounded-xl p-4 text-center shadow-md"><Heart className="w-5 h-5 mx-auto mb-1" />{profile.wishlist}</div>
        </div>

    
        {isEditing && (
          <div className="flex gap-3 mt-4">
            <button onClick={() => saveChanges(profile.name)} className="flex-1 px-4 py-2 bg-green-600 rounded-lg">Save</button>
            <button onClick={cancelChanges} className="flex-1 px-4 py-2 bg-red-600 rounded-lg">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
