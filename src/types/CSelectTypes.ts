/* eslint-disable @typescript-eslint/no-explicit-any */
export type TCSelect = {
  label: string;
  name: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  required?: boolean;
  onValueChange?: (value: string) => void;
};
