import ProfileNav from "../../Components/ProfileNav";

function ProfilePage() {
  return (
    <div className="h-screen relative p-3 md:p-0 gap-5">
      <div className="w-full h-1/3 bg-NeonBlue rounded-b-xl border-b hidden md:inline-block "></div>
      <ProfileNav />
    </div>
  );
}

export default ProfilePage;
