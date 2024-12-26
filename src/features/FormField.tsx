import React from "react";
import {
  FormControl,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IFormItem } from "@/types/form";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  item: IFormItem;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ item, name }) => {
  const { control, getValues, setValue } = useFormContext();

  const renderField = () => {
    switch (item.type) {
      case "input":
        return (
          <Input
            {...control.register(name)}
            type={name === "password" ? "password" : "text"}
            placeholder={item.placeholder}
          />
        );
      case "date":
        return (
          <Input
            {...control.register(name)}
            type="date"
            placeholder={item.placeholder}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked={getValues(name)}
            onCheckedChange={(checked: any) => setValue(name, checked)}
          />
        );

      case "select":
        return (
          <Select
            value={getValues(name)}
            onValueChange={(value: any) => setValue(name, value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={item.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {item.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "datePicker":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !getValues(name) && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {getValues(name)
                  ? format(getValues(name), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={getValues(name)}
                onSelect={(date) => setValue(name, date)}
              />
            </PopoverContent>
          </Popover>
        );

      case "inputOTP":
        return (
          <InputOTP
            maxLength={6}
            value={getValues(name)}
            onChange={(value) => setValue(name, value)}
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
        );

      case "file":
        return (
          <Input
            type="file"
            onChange={(e) => {
              setValue(name, e.target.files);
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem>
          <FormLabel>{item.label}</FormLabel>
          <FormControl>{renderField()}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
