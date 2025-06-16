/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../ui/input";

const InputField = ({ label, name, value, onChange, type = "text" }: any) => (
  <div className="inputfie flex flex-col gap-2">
    <label>{label}</label>
    <Input name={name} value={value} onChange={onChange} type={type} required />
  </div>
);

export default InputField;