const ProfileImageSkeleton = () => {
  return (
    <div className="relative rounded-full mx-auto h-28 w-20 overflow-hidden bg-gray-300 animate-pulse">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );
};

export default ProfileImageSkeleton;
