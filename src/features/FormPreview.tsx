import React from "react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { IFormItem } from "@/types/form";


interface FormPreviewProps {
    formItems: IFormItem[];
    formData: Record<string, any>;
    onInputChange: (id: string, value: any) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    jsonOutput: string | null;
  }

const FormPreview: React.FC<FormPreviewProps> = ({
    formItems,
    formData,
    onInputChange,
    onSubmit,
    jsonOutput
  }) => {
    return (
      <div className="w-full md:w-2/4 bg-gray-900 p-4 rounded-md mt-4 md:mt-0">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <div className="bg-gray-800 p-4 rounded-md">
          <form onSubmit={onSubmit}>
            {formItems.map((item) => (
                <FormField
                  key={item.id}
                  item={item}
                  value={formData[item.id]}
                  onChange={(value) => onInputChange(item.id, value)}
                />
              ))}
            <Button type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </form>
          {jsonOutput && (
            <div className="mt-4 p-4 bg-gray-800 rounded-md">
              <h3 className="text-lg font-bold mb-2">Form Data (JSON):</h3>
              <pre className="whitespace-pre-wrap break-words text-green-400">
                {jsonOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  };

export default FormPreview;