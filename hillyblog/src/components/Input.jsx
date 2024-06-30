import React, { useId } from "react";


const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input type={type} className={`${className} w-full px-4 py-2 rounded-lg bg-white
      text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 `}
      ref={ref}
      {...props}
      id={id}
      />
    </div>
  );
});

export default Input;
