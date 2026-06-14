import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TCTextarea } from "@/types/CTextareaTypes";

const CTextarea = ({ fieldName, label, placeholder, required }: TCTextarea) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={fieldName}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              {...field}
              id={fieldName}
              placeholder={placeholder}
              rows={1}
              className="flex-1 w-full resize-none overflow-y-auto custom-scrollbar h-10 max-h-24 p-2 rounded-md border border-input bg-background focus-visible:outline-none "
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CTextarea;
