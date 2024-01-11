import ProfileNav from "../Components/ProfileNav";

function PreviewPage() {
  return (
    <div className="bg-white">
      <div className="h-screen relative p-3 md:p-0 gap-5">
        <div className="w-full h-1/3 bg-NeonBlue rounded-b-xl border-b hidden md:inline-block "></div>
        <ProfileNav />
      </div>
    </div>
  );
}

export default PreviewPage;
