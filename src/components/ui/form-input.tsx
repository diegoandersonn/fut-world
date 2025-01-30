import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholder: string;
  min?: string | number;
  max?: string | number;
};

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ type, placeholder, min, max, ...rest }, ref) => {
    return (
      <>
        {type === "number" ? (
          <input
            className="p-3 h-8 text-white text-sm bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none"
            type={type}
            placeholder={placeholder}
            ref={ref}
            min={min}
            max={max}
            {...rest}
          />
        ) : (
          <input
            className="p-4 h-8 text-white bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none"
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        )}
      </>
    );
  }
);

export default FormInput;
