function Page() {
  return (
    <div className="w-full flex justify-between">
      <div className="relative hidden w-2/5 lg:flex items-center justify-center item h-screen bg-white rounded-lg p-4">
        <img src="illustration-phone-mockup.svg" className="w-1/2" />
      </div>
      <div className="text-sm text-Nickel md:w-7/12">
        <div className="rounded-t-lg border-b bg-white w-full h-full px-3 lg:px  py-4">
          <h1 className="font-bold text-xl mb-3 text-DarkCharcoal">
            Customize your links
          </h1>
          <p className="text-sm mb-3">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button className="my-3 w-full border-NeonBlue p-2 border rounded-lg text-NeonBlue">
            + Add new link
          </button>
          <div className="bg-whiteFA text-center p-3 rounded-lg">
            <img
              className="w-2/4 ml-auto mr-auto my-6"
              src="illustration-empty.svg"
            />
            <h1 className="font-bold text-xl mb-3 text-DarkCharcoal">
              Let's get you started
            </h1>
            <p>
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div className="rounded-b-lg bg-white p-3">
          <button className="w-full bg-NeonBlue rounded-md py-2 text-whiteFA">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
