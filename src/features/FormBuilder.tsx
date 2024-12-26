import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IFormItem } from "@/types/form";
import FormElementsSidebar from "./Sidebar";
import DragAndDropArea from "./Draganddrop";
import FormPreview from "./FormPreview";

interface DynamicFormBuilderProps {
  layout: "default" | "custom";
}

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({ layout }) => {
  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [jsonOutput, setJsonOutput] = useState<string | null>(null);

  const addFormItem = (type: IFormItem["type"]) => {
    const newItem: IFormItem = {
      id: `${type}-${Date.now()}`,
      type,
      label: `${
        type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")
      }`,
      value: null,
    };

    if (type === "select") {
      newItem.options = ["Option 1", "Option 2", "Option 3"];
    }

    setFormItems([...formItems, newItem]);
  };

  const handleInputChange = (id: string, value: any) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleFormItemsChange = (updatedItems: IFormItem[]) => {
    setFormItems(updatedItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJsonOutput(JSON.stringify(formData, null, 2));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`${
          layout === "default"
            ? "bg-white text-black"
            : "bg-gray-900 text-white"
        } flex h-screen w-screen justify-between flex-row p-4`}
      >
        {/* Sidebar */}
        <div
          className={`${
            layout === "default"
              ? "w-1/4 bg-gray-100 p-4 border-r border-gray-300"
              : "w-1/5 bg-gray-800 p-6 border-r border-gray-700"
          }`}
        >
          <h2
            className={`${
              layout === "default"
                ? "text-xl font-semibold"
                : "text-2xl font-bold"
            }`}
          >
            {layout === "default" ? "Add Form Elements" : "Create Your Form"}
          </h2>
          <FormElementsSidebar onAddFormItem={addFormItem} />
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`${
            layout === "default" ? "w-2/4" : "w-3/5 bg-gray-700"
          } p-4`}
        >
          <h3
            className={`${
              layout === "default"
                ? "text-lg font-medium"
                : "text-xl font-bold text-yellow-400"
            } mb-4`}
          >
            {layout === "default"
              ? "Drag and Drop Your Fields"
              : "Customize Your Form Layout"}
          </h3>
          <DragAndDropArea
            formItems={formItems}
            onFormItemsChange={handleFormItemsChange}
          />
        </div>

        {/* Form Preview */}
        <div
          className={`${
            layout === "default"
              ? "w-1/4 bg-gray-100 p-4"
              : "w-1/5 bg-gray-800 p-6"
          }`}
        >
          <h3
            className={`${
              layout === "default"
                ? "text-lg font-medium"
                : "text-xl font-bold text-green-400"
            } mb-4`}
          >
            {layout === "default" ? "Form Preview" : "Preview Your Creation"}
          </h3>
          <FormPreview
            formItems={formItems}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            jsonOutput={jsonOutput}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default DynamicFormBuilder;
