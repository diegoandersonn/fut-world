import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type LabelProps = {
  text: string;
  htmlFor: string;
};

export function FormLabel(props: LabelProps) {
  return (
    <label
      htmlFor={props.htmlFor}
      className="flex items-center font-semibold text-zinc-300"
    >
      {props.text}
    </label>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholder: string;
  min?: string | number;
  max?: string | number;
};

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
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

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const FormField = <T extends FieldValues>({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
}: FormFieldProps<T>) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className="flex flex-col">
      <FormLabel text={label} htmlFor={String(name)} />
      <FormInput type={type} placeholder={placeholder} {...register(name)} />
      {errorMessage && (
        <p className="text-red-700 text-xs">{String(errorMessage)}</p>
      )}
    </div>
  );
};

export default FormField;
