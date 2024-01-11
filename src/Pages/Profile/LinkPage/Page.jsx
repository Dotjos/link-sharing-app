function Page() {
  return (
    <div className="w-full flex">
      <div className="relative hidden lg:inline-block w-2/3 h-full bg-white rounded-lg">
        <img src="illustration-phone-mockup.svg" />
      </div>
      <div>
        <div className=" rounded-t-lg border-b bg-white w-full h-screen px-3 py-4">
          <h1>Customize your links</h1>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button>+ Add new link</button>
          <div className="bg-LavenderMist p-3 rounded-lg">
            <img src="illustration-empty.svg" />
            <h1>Let's get you started</h1>
            <p>
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div className="rounded-b-lg bg-white p-3">
          <button className="w-full bg-NeonBlue rounded-md text-whiteFA">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
