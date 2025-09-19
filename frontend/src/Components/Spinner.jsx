function Spinner (){
  return (
    <div className="rounded-md bg-white p-4 max-w-sm w-full mx-auto">
  <div className="animate-pulse flex items-center flex-col">
    <div className="h-28 w-28 rounded-full bg-slate-300 mb-7"></div>
    <div className="h-10 bg-slate-300 w-full rounded-lg my-2"></div>
    <div className="h-10 bg-slate-300 w-full rounded-lg my-2"></div>
    <div className="h-10 bg-slate-300 w-full rounded-lg my-2"></div>
    <div className="h-10 bg-slate-300 w-full rounded-lg my-2"></div>
    <div className="h-10 bg-slate-300 w-full rounded-lg my-2"></div>
  </div>
</div>
  );
}

export default Spinner
