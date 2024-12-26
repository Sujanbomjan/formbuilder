import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { IFormItem } from "@/types/form"
import { Button } from "@/components/ui/button";


interface FormFieldProps {
    item: IFormItem;
    value: any;
    onChange: (value: any) => void;
  }

const FormField: React.FC<FormFieldProps> = ({ item, value, onChange }) => {
    return (
      <div key={item.id} className="mb-4">
        <Label htmlFor={item.id} className="text-white mb-2 block">
          {item.label}
        </Label>
        {item.type === "checkbox" && (
          <Checkbox
            id={item.id}
            checked={value || false}
            onCheckedChange={onChange}
          />
        )}
        {item.type === "input" && (
          <Input
            id={item.id}
            className="w-full"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {item.type === "inputOTP" && (
          <InputOTP
            maxLength={6}
            onChange={onChange}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
         {item.type === "datePicker" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                  format(new Date(value), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(selectedDate) => {
                  onChange(selectedDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
        {item.type === "date" && (
          <Input
            id={item.id}
            type="date"
            className="w-full"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {item.type === "file" && (
          <Input
            id={item.id}
            type="file"
            className="w-full"
            onChange={(e) =>
              onChange(e.target.files ? e.target.files : null)
            }
          />
        )}
        {item.type === "select" && (
          <Select
            value={value}
            onValueChange={onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {item.options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  };
  

export default FormField;