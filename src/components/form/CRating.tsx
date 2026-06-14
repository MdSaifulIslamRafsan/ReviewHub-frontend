import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Star } from "lucide-react";
import { TCRating } from "@/types/CRatingTypes";

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const CRating = ({ name, label, required }: TCRating) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => field.onChange(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        (hoveredStar || field.value) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {(hoveredStar || field.value) > 0 && (
                <span className="text-sm">
                  {ratingLabels[hoveredStar || field.value]}
                </span>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CRating;
