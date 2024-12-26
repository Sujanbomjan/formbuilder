import React from "react";
import { Button } from "@/components/ui/button";
import { IFormItem } from "@/types/form";

interface FormElementsSidebarProps {
  onAddFormItem: (type: IFormItem["type"]) => void;
}

const FormElementsSidebar: React.FC<FormElementsSidebarProps> = ({
  onAddFormItem,
}) => {
  return (
    <div className="w-full md:w-1/4 pr-5 md:p-0 bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Form Elements</h2>
      <div className="flex flex-col gap-2">
        <Button onClick={() => onAddFormItem("checkbox")}>Checkbox</Button>
        <Button onClick={() => onAddFormItem("input")}>Input</Button>
        <Button onClick={() => onAddFormItem("date")}>Date</Button>
        <Button onClick={() => onAddFormItem("file")}>File</Button>
        <Button onClick={() => onAddFormItem("select")}>Select</Button>
        <Button onClick={() => onAddFormItem("inputOTP")}>InputOtp</Button>
        <Button onClick={() => onAddFormItem("datePicker")}>
          Date Picker
        </Button>
      </div>
    </div>
  );
};

export default FormElementsSidebar;