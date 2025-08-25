import { ClassAttributes, InputHTMLAttributes } from "react";

const InputText = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className="text-field__input" {...props}>
        </input>
    );
};

export default InputText;