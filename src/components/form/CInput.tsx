
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { TCInput } from "@/types/CInputTypes";

const CInput = ({
  type = "text",
  label,
  fieldName,
  placeholder,
  required,
}: TCInput) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

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
            <div className="relative">
              <Input
                {...field}
                id={fieldName}
                type={inputType}
                placeholder={placeholder}
                className={cn("pr-10")}
              />

              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CInput;