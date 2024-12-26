import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/constants";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IFormItem } from "@/types/form";

interface DragAndDropAreaProps {
  formItems: IFormItem[];
  onFormItemsChange: (updatedItems: IFormItem[]) => void;
}
interface DragItemProps {
  item: IFormItem;
  index: number;
  onRemove: () => void;
  formItems: IFormItem[];
  onFormItemsChange: (updatedItems: IFormItem[]) => void;
}

const DragItem: React.FC<DragItemProps> = ({
  item,
  index,
  formItems,
  onFormItemsChange,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: ItemTypes.FORM_ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.FORM_ITEM,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        const draggedItemData = formItems[draggedItem.index];
        const updatedItems = [...formItems];

        updatedItems.splice(draggedItem.index, 1);
        updatedItems.splice(index, 0, draggedItemData);

        onFormItemsChange(updatedItems);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="mb-2 p-3 border rounded-md shadow-sm bg-gray-800 text-white cursor-move flex items-center justify-between"
    >
      <span>{item.label}</span>
      <Button variant="ghost" size="icon" onClick={onRemove}>
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({
  formItems,
  onFormItemsChange,
}) => {
  return (
    <div className="w-full md:w-1/4 pr-5 md:p-0 bg-gray-900 p-4 rounded-md mt-4 md:mt-0">
      <h2 className="text-xl font-bold mb-4">Drag Items</h2>
      <div className="border border-gray-700 p-3 rounded-md bg-gray-800">
        {formItems.map((item, index) => (
          <DragItem
            key={item.id}
            item={item}
            index={index}
            formItems={formItems}
            onFormItemsChange={onFormItemsChange}
            onRemove={() =>
              onFormItemsChange(formItems.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DragAndDropArea;
