export interface IFormItem {
  id: string;
  type:
    | "checkbox"
    | "input"
    | "date"
    | "file"
    | "select"
    | "datetime"
    | "datePicker"
    | "inputOTP"
    | "password"
    | "phone";
  label: string;
  options?: string[];
  placeholder?: string;
  value?: any;
}