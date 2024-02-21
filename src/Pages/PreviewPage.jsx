import LinkOverview from "../Components/LinkOverview";
import ProfileNav from "../Components/ProfileNav";
import { useParams } from "react-router-dom";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
import { useEffect, useState } from "react";

function PreviewPage() {
  const {userId}= useParams()
  const {user,isAuthenticated} =  getCurrentAccountAuth()
  const [idCheck, setIdCheck] = useState(false);


  useEffect(() => {
    if (userId && user?.id) {
      setIdCheck(userId === user.id);
    }
  }, [userId, user]);

  return (
    <div className="bg-white relative md:bg-LavenderMist  h-screen  p-3 md:p-0 gap-5">
      <div className="w-full h-1/3 bg-NeonBlue rounded-b-xl border-b hidden md:inline-block"></div>
      {isAuthenticated&&idCheck&&<ProfileNav />}
        <main>
          <LinkOverview/>
        </main>
      </div>
  );
}

export default PreviewPage;
