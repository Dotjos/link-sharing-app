import ProfileNav from "../Components/ProfileNav";

function PreviewPage() {
  return (
    <div>
      <div className="h-screen relative p-3 md:p-0 gap-5">
        <div className="w-full h-1/3 bg-NeonBlue rounded-b-xl border-b hidden md:inline-block "></div>
        <ProfileNav />
      </div>
      <ProfileNav />
    </div>
  );
}

export default PreviewPage;
