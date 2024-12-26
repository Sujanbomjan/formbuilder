import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { IFormItem } from "@/types/form";
import * as z from "zod";
import { Form } from "@/components/ui/form";

interface FormPreviewProps {
  formItems: IFormItem[];
  onSubmit: (data: any) => void;
  jsonOutput: string | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  formItems,
  onSubmit,
  jsonOutput,
}) => {
  // Create form schema based on form items
  const createDynamicSchema = (items: IFormItem[]) => {
    const schemaObject: { [key: string]: any } = {};

    items.forEach((item) => {
      switch (item.type) {
        case "input":
        case "password":
        case "phone":
          schemaObject[item.id] = z
            .string()
            .min(1, { message: `${item.label} is required` });
          break;
        case "checkbox":
          schemaObject[item.id] = z.boolean().default(false);
          break;
        case "select":
          schemaObject[item.id] = z
            .string()
            .min(1, { message: `Please select ${item.label}` });
          break;
          case "date":
            schemaObject[item.id] = z
              .string()
              .min(1, { message: `Please select ${item.label}` });
            break;
        case "datePicker":
        case "datetime":
          schemaObject[item.id] = z.date().optional();
          break;
        case "file":
          schemaObject[item.id] = z.instanceof(FileList).optional();
          break;
        case "inputOTP":
          schemaObject[item.id] = z
            .string()
            .length(6, { message: "Must be 6 characters" });
          break;
        default:
          schemaObject[item.id] = z.string().optional();
      }
    });

    return z.object(schemaObject);
  };

  const dynamicSchema = createDynamicSchema(formItems);
  type FormData = z.infer<typeof dynamicSchema>;

  const defaultValues = formItems.reduce((acc, item) => {
    acc[item.id] = item.value ?? (item.type === "checkbox" ? false : "");
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
  });

  const handleSubmit = async (data: FormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded-md">
      <div className="bg-gray-800 p-4 rounded-md">
        <Form {...form}>
          <>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                {formItems.map((item) => (
                  <FormField key={item.id} item={item} name={item.id} />
                ))}
              </div>
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </>
        </Form>

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
