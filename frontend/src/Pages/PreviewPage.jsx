import LinkOverview from "../Components/LinkOverview";
import ProfileNav from "../Components/ProfileNav";
import { useParams } from "react-router-dom";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
// import { useEffect, useState } from "react";

function PreviewPage() {
  const { userId } = useParams();
  const { user, isAuthenticated } = getCurrentAccountAuth();
  const isOwner = isAuthenticated && String(userId) === String(user?.id);

  return (
    <div className=" bg-white min-h-screen md:bg-transparent relative p-3 md:p-0 gap-5">
      <div className="w-full h-60 bg-NeonBlue rounded-b-xl border-b hidden md:inline-block"></div>
      {isOwner && <ProfileNav />}
      <main className="">
        <LinkOverview />
      </main>
    </div>
  );
}

export default PreviewPage;
