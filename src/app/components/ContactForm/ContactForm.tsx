"use client";

import { useForm, Controller } from "react-hook-form";
import {
  useContactFormSchema,
  type ContactFormData,
} from "@/components/ContactForm/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useActionState,
  memo,
  startTransition,
} from "react";
import { SubmitContactFormHandler } from "@/actions/submitContactForm";
import SubmitButton from "@/components/Button/SubmitButton";

const ContactForm = memo(() => {
  const contactFormSchema = useContactFormSchema();
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      contact: {
        method: "email",
        value: "",
      },
    },
  });

  const contactMethod = watch("contact.method"); // Watch the selected contact method

  const [state, formAction] = useActionState(SubmitContactFormHandler, {
    success: false,
  });

  useEffect(() => {
    if (isSubmitSuccessful && state.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, state.success]);

  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(() => {
      const formData = new FormData(formRef.current!);
      startTransition(() => {
        formAction(formData);
      });
    })(e);
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      className="w-full box-border flex flex-col text-sm gap-1 lg:gap-3 lg:text-xl"
    >
      {/* Customer Name */}
      <div>
        <label className="hidden mb-1 font-medium">
          {t("form.customer_name_label")}
        </label>
        <input
          {...register("name")}
          placeholder={t("form.customer_name_label")}
          className={`w-full p-3 box-border border rounded focus:outline-none focus:ring-1 ${
            errors.name
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300 focus:ring-green-400"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state?.errors?.name[0]}</p>
        )}
      </div>

      {/* Contact Method */}
      <div>
        <label className="hidden mb-1 font-medium">
          {t("form.contact_method_label")}
        </label>
        <div className="w-full flex justify-between items-center">
          <select
            {...register("contact.method")}
            title={t("form.contact_method_label")}
            className="w-min max-w-min box-border flex-none text-sm p-3 mr-3 border border-gray-300 rounded lg:text-xl focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            <option value="email">Email</option>
            <option value="phone">{t("form.contact_phone_label")}</option>
          </select>
          <Controller
            name="contact.value"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={contactMethod === "email" ? "email" : "tel"}
                placeholder={
                  contactMethod === "email" ? "example@gmail.com" : "0123456789"
                }
                className={`box-border grow p-3 pr-0 border rounded focus:outline-none focus:ring-1 ${
                  errors.contact?.value
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
            )}
          />
        </div>
        {errors.contact?.value && (
          <p className="text-red-400 text-sm mt-1">
            {errors.contact?.value.message}
          </p>
        )}
        {state?.errors?.contact && (
          <p className="text-red-400 text-sm mt-1">{state?.errors?.contact}</p>
        )}
      </div>

      <SubmitButton state={state} variant="primary">
        {t("form_submit")}
      </SubmitButton>
    </form>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
