/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export type TFormConfig<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: any;
  styles?: string;
};

export type TCForm<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode | ((props: { form: UseFormReturn<T> }) => ReactNode);
} & TFormConfig<T>;
