function StartLnkPage (){
  return (
    <div className="bg-whiteFA text-center px-4 py-8 lg:p-12 rounded-lg">
        <img
            className="w-2/4 md:w-1/3 ml-auto mr-auto my-6"
              src="illustration-empty.svg"
            />
            <div className="md:p-7 lg:p-10"> 
            <h1 className="font-black text-2xl mb-5 text-DarkCharcoal">
              Let&apos;s get you started
            </h1>
            <p className="text-justify text-base">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We&apos;re here to help
              you share your profiles with everyone!
            </p>
            </div>
            
    </div>
  );
}

export default StartLnkPage;
