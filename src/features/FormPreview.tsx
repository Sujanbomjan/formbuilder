import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { IFormItem } from "@/types/form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    const schemaObject: { [key: string]: z.ZodType<any, any, any> } = {};

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

  const defaultValues: Record<string, any> = formItems.reduce((acc, item) => {
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

  const generateCode = () => {
    const formCode = `
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  ${formItems
    .map((item) => {
      switch (item.type) {
        case "input":
          return `${item.id}: z.string().min(1, { message: "${item.label} is required" })`;
        case "checkbox":
          return `${item.id}: z.boolean().default(false)`;
        case "select":
          return `${item.id}: z.string().min(1, { message: "Please select ${item.label}" })`;
        default:
          return `${item.id}: z.string().optional()`;
      }
    })
    .join(",\n  ")}
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      ${formItems
        .map(
          (item) => `
      <div>
        <label htmlFor="${item.id}">${item.label}</label>
        <${item.type === "select" ? "select" : "input"}
          type="${item.type}"
          {...form.register("${item.id}")}
        ${
          item.type === "select"
            ? `>
          ${(item.options || [])
            .map((opt) => `<option value="${opt}">${opt}</option>`)
            .join("\n          ")}
        </select>`
            : "/>"
        }
      </div>`
        )
        .join("\n      ")}
      <button type="submit">Submit</button>
    </form>
  );
}`;

    return formCode;
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded-md">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className=" w-full grid-cols-2 flex flex-row gap-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="bg-gray-800 p-4 rounded-md">
            <Form {...form}>
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
        </TabsContent>

        <TabsContent value="code">
          <div className="bg-gray-800 p-4 rounded-md">
            <pre className="whitespace-pre-wrap break-words text-green-400 overflow-x-auto">
              {generateCode()}
            </pre>
            <Button
              className="mt-4"
              onClick={() => {
                navigator.clipboard.writeText(generateCode());
              }}
            >
              Copy Code
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormPreview;
