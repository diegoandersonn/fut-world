import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import FormInput from "./form-input";
import FormLabel from "./form-label";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const FormField = <T extends FieldValues>({
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
      <FormInput
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {errorMessage && <p className="text-red-700 text-xs">{String(errorMessage)}</p>}
    </div>
  );
};


export default FormField;
