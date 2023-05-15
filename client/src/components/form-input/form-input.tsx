import { InputHTMLAttributes, FC } from "react";

import './form-input.css';

type FromInputProps = { label: string } &
  InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FromInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input {...otherProps} />
      {
        label &&
        <div className="form-input-label">
          {label}
        </div>
      }
    </div>
  );
}

export default FormInput;