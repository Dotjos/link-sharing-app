import StartLnkPage from "../../../Components/StartLnkPage";

function Page() {
  return (
    <div className="lg:w-7/12 text-sm text-Nickel bg-white rounded-lg">
        <div className="border-b w-full p-6 md:px-6 md:pt-10 md:pb-7">
          <h1 className="font-bold text-xl text-DarkCharcoal">
            Customize your links
          </h1>
          <p className="text-sm mb-3">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button className="my-3 w-full border-NeonBlue p-2 border rounded-lg text-NeonBlue">
            + Add new link
          </button>
         <StartLnkPage/>
        </div>
        <div className="flex md md:justify-end md:items-center  w-full p-3">
          <button className="w-full md:w-1/12 bg-NeonBlue rounded-md py-2 text-whiteFA">
            Save
          </button>
        </div>
    </div>
  );
}

export default Page;
