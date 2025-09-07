import React, { useEffect, useState } from "react";
import { Pencil, X, User, Camera, Save } from "lucide-react";

const Profile = ({ user: appUser }) => {
  const [user, setUser] = useState(appUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    image: "",
    imageFile: null,
  });

  useEffect(() => {
    if (appUser) {
      setUser(appUser);
      setFormData({
        firstName: appUser.firstName || "",
        lastName: appUser.lastName || "",
        bio: appUser.bio || "",
        image: appUser.image || "",
        imageFile: null,
      });
    }
  }, [appUser]);

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      if (file) setFormData({ ...formData, imageFile: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      bio: formData.bio.trim(),
      image: formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.image,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      image: user.image,
      imageFile: null,
    });
    setIsEditing(false);
  };

  const getImageSrc = () => {
    if (formData.imageFile) return URL.createObjectURL(formData.imageFile);
    if (formData.image) return formData.image.startsWith("http") ? formData.image : `/uploads/${formData.image}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&size=200&background=8b5cf6&color=ffffff&bold=true`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-900 p-4">
      <div className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
          >
            {isEditing ? <X className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Image & Name */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-blue-500 p-1">
              <img
                src={getImageSrc()}
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-gray-700"
              />
            </div>
            {isEditing && (
              <>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
              </>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-xl"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-xl"
                  placeholder="Last Name"
                />
              </>
            ) : (
              <h3 className="text-3xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h3>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" /> Bio
          </label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-xl resize-none"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <div className="bg-gray-700/30 rounded-xl p-4">
              <p className="text-gray-300">{user.bio}</p>
            </div>
          )}
        </div>

        {/* Save / Cancel */}
        {isEditing && (
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl"
            >
              <Save className="w-5 h-5 inline-block mr-2" /> Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Non-editable info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-700/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">{user.email}</p>
          </div>
          <div className="bg-gray-700/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Role</p>
            <p className="text-white font-medium">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
