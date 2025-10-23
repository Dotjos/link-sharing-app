function Input({
  type,
  label,
  placeholder,
  id,
  asteriks,
  required,
  onChange,
  value,
  errText,
}) {
  return (
    <div className="md:flex justify-between text-DarkCharcoal items-center mb-3">
      <div className="flex justify-between">
        <label className="" htmlFor={id}>
          {label}
          {asteriks && "*"}
        </label>
        <span className="text-xs text-red-400 md:hidden">{errText}</span>
      </div>
      <div
        className={`flex justify-between items-center border ${
          errText ? "border-red-400" : ""
        } md:w-3/4 border-LavenderMist rounded-lg  hover:border-NeonBlue hover:shadow-MaximumBluePurple  focus:shadow bg-white`}
      >
        <input
          required={required}
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className={`w-full py-2.5 px-2 md:w-3/4 selection:bg-transparent rounded-lg bg-inherit focus:outline-none`}
        />
        <span className="text-red-400 text-xs hidden md:inline-block px-2">
          {errText}
        </span>
      </div>
    </div>
  );
}

export default Input;
