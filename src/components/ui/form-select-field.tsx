import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import FormLabel from "./form-label";
import React from "react";

interface FormSelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  placeholder: string;
  children: React.ReactNode; 
}

const FormSelectField = <T extends FieldValues>({
  label,
  name,
  errors,
  control,
  placeholder,
  children,
}: FormSelectFieldProps<T>) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className="flex flex-col">
      <FormLabel text={label} htmlFor={name} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {React.cloneElement(children as React.ReactElement, {
              ...field,
              placeholder,
            })}
          </div>
        )}
      />
      {errorMessage && (
        <p className="text-red-700 text-xs">{String(errorMessage)}</p>
      )}
    </div>
  );
};

export default FormSelectField;
