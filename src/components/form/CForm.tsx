import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { TCForm, TFormConfig } from "@/types/CFormTypes";

const CForm = <T extends FieldValues>({
  onSubmit,
  children,
  resolver,
  defaultValues,
  styles,
}: TCForm<T>) => {
  const formConfig: TFormConfig<T> = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = zodResolver(resolver);
  }
  const methods = useForm(formConfig);
  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className={styles}>
          {typeof children === "function"
            ? children({ form: methods })
            : children}
        </form>
      </Form>
    </FormProvider>
  );
};

export default CForm;
