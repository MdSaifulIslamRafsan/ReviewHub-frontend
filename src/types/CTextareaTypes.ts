export type TCTextarea = {
  fieldName: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  emitTyping?: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  emitStopTyping?: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
