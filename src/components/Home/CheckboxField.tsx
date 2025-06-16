/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@radix-ui/react-checkbox";

const CheckboxField = ({ label, checked, onChange }: any) => (
  <div className="inputfie flex flex-row gap-2 items-center pt-2">
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <label>{label}</label>
  </div>
);

export default CheckboxField;