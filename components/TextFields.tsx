// components/TextFields.tsx
import MaterialIcon from "../islands/MaterialIcon.tsx";

interface TextFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel";
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  icon?: string;
  supportingText?: string;
  autoComplete?: string;
}

export function TextField({
  type = "text",
  value,
  onInput,
  placeholder,
  label,
  required = false,
  disabled = false,
  minLength,
  maxLength,
  icon,
  supportingText,
  autoComplete,
}: TextFieldProps) {
  return (
    <div>
      <div class="textfield-outlined">
        {icon && (
          <div class="leading">
            <MaterialIcon name={icon} title={icon} ariaHidden />
          </div>
        )}
        <input
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          onInput={(e) => onInput(e.currentTarget.value)}
          autoComplete={autoComplete}
          aria-label={label}
        />
        <label>{label}</label>
      </div>
      {supportingText && (
        <div class="supporting-text">
          {supportingText}
        </div>
      )}
    </div>
  );
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  disabled?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  options,
  placeholder,
}: SelectFieldProps) {
  return (
    <div class="textfield-outlined">
      <select
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.value)}
        aria-label={label}
      >
        {placeholder && (
          <option value="" disabled selected>{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  );
}
