
function SaveButton({ loading = false, text, small, disabled, onClick, notTooSmall }) {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 w-full 
        ${small ? "md:w-1/12" : ""}
        ${notTooSmall ? "md:w-2/12" : ""}
        ${isDisabled ? "bg-MaximumBluePurple cursor-not-allowed" : "bg-NeonBlue"}
        rounded-md py-1.5 px-1.5 text-whiteFA`}
    >
      {/* Spinner shows only when loading */}
      {loading && (
        <svg
          className="size-5 animate-spin text-whiteFA"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {text}
    </button>
  );
}

export default SaveButton;

