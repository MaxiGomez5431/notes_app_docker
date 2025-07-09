import { useFormContext } from "react-hook-form";

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  rules = {},
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const baseClass =
    "peer w-full border rounded-lg px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2";

  const inputClass = `${baseClass} ${
    hasError ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-brand-orange"
  }`;

  return (
    <div className="relative w-full">
      {type === "textarea" ? (
        <textarea
          id={name}
          className={`${inputClass} resize-none h-40`}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      ) : (
        <input
          id={name}
          type={type}
          className={`${inputClass} h-12`}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-3 top-0 text-gray-500 text-sm transition-all
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500"
      >
        {label}
      </label>
      {hasError && <p className="text-red-600 mt-1 text-sm">{errors[name].message}</p>}
    </div>
  );
}
