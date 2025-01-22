import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholder: string;
};

const TeamFormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ type, placeholder, ...rest }, ref) => {
    return (
      <input
        className="p-4 h-8 text-white bg-neutral-950 rounded-md hover:scale-110 focus:outline-none"
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default TeamFormInput;
