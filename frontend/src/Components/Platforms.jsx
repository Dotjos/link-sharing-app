import Platform from "../ui/Platform";

function Platforms (){
  return (
    <div className="rounded-lg bg-white p-2">
      <Platform platform="Github" icon="icon-github.svg" mb={true}/>
      <Platform platform="Frontend Mentor" icon="icon-frontend-mentor.svg" mb={true}/>
      <Platform platform="Twitter" icon="icon-twitter.svg" mb={true}/>
      <Platform platform="LinkedIn" icon="icon-linkedin.svg" mb={true}/>
      <Platform platform="YouTube" icon="icon-youtube.svg" mb={true}/>
      <Platform platform="Facebook" icon="icon-facebook.svg" mb={true}/>
      <Platform platform="Twitch" icon="icon-twitch.svg" mb={true}/>
      <Platform platform="Dev.to" icon="icon-devto.svg" mb={true}/>
      <Platform platform="codePen" icon="icon-codepen.svg" mb={true}/>
      <Platform platform="freeCodeCamp" icon="icon-freecodecamp.svg" mb={true}/>
      <Platform platform="GitLab" icon="icon-gitlab.svg" mb={true}/>
      <Platform platform="Hashnode" icon="icon-hashnode.svg" mb={true}/>
      <Platform platform="Stack Overflow" icon="icon-stack-overflow.svg" mb={false}/>
    </div>
  );
}

export default Platforms;
