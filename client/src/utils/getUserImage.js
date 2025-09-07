export const getUserImage = (user) => {
  const userName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : user?.name || 'User';

  if (user?.image) {
    return user.image.startsWith("http") ? user.image : `/uploads/${user.image}`;
  }

  // Default image
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=200&background=8b5cf6&color=ffffff&bold=true`;
};
