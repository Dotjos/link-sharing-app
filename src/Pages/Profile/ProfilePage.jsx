function ProfilePage() {
  return <div className="bg-white rounded-lg p-4 lg:w-7/12">
    <h1>Profile Details</h1>
    <p>Add your details to create a personal touch to your profile.</p>
    <div className="bg-whiteFA p-2"></div>
    <form className="bg-whiteFA grid">
      <input type="text"/>
      <input type="text"/>
      <input type="mail"/>
    </form>
    <div className="w-full p-3">
      <button className="bg-NeonBlue p-1 w-full rounded-lg text-whiteFA">Save</button>
    </div>
  </div>;
}

export default ProfilePage;
