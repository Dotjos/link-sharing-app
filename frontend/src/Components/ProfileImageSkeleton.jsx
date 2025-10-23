const ProfileImageSkeleton = ({ size = 80 }) => {
  return (
    <div
      className="relative rounded-full mx-auto overflow-hidden bg-gray-300 animate-pulse"
      style={{ width: size, height: size }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );
};

export default ProfileImageSkeleton;
