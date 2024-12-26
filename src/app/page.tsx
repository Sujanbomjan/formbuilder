"use client";
import { useLayout } from "@/app/layout";
import DynamicFormBuilder from "@/features/FormBuilder";

export default function Home() {
  const { layout, setLayout } = useLayout();

  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLayout(event.target.value as "default" | "custom");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dynamic Form Builder Page</h1>
      <div className="mb-4">
        <label htmlFor="layout-select" className="block text-gray-700 mb-2">
          Choose Layout:
        </label>
        <select
          id="layout-select"
          value={layout}
          onChange={handleLayoutChange}
          className="p-2 border rounded w-full max-w-sm"
        >
          <option value="default">Default Layout</option>
          <option value="custom">Custom Layout</option>
        </select>
      </div>
      <div className="mt-6">
        <DynamicFormBuilder layout={layout} />
      </div>
    </main>
  );
}
