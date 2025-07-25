"use client";

import {
  useEffect,
  useRef,
  useActionState,
  memo,
  startTransition,
} from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useProductFormSchema,
  type ProductContactFormData,
} from "./form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ProductQuery } from "@/graphql/types/graphql";
import SubmitButton from "@/components/Button/SubmitButton";
import { SubmiProductContactFormHandler } from "@/actions/submitProductContactForm";

const ProductContactForm = memo(
  ({ data }: { data: ProductQuery["product"] }) => {
    const productContactFormSchema = useProductFormSchema();
    const {
      handleSubmit,
      control,
      register,
      watch,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm<ProductContactFormData>({
      resolver: zodResolver(productContactFormSchema),
      defaultValues: {
        name: "",
        message: "",
        contact: {
          method: "email",
          value: "",
        },
      },
    });

    const contactMethod = watch("contact.method");

    const [state, formAction] = useActionState(SubmiProductContactFormHandler, {
      success: false,
    });

    useEffect(() => {
      if (isSubmitSuccessful && state.success) {
        reset();
      }
    }, [reset, isSubmitSuccessful, state.success]);

    const formRef = useRef(null);
    const t = useTranslations();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(() => {
        const formData = new FormData(formRef.current!);
        formData.append("productId", data?.id as string);
        startTransition(() => {
          formAction(formData);
        });
      })(e);
    };

    if (!data) {
      return <div>Loading...</div>;
    }
    return (
      <div className="w-full box-border p-3 bg-white border border-slate-100 rounded-lg shadow-md lg:p-6 lg:w-1/2">
        {/* Product Summary */}
        <div className="flex flex-col text-start justify-start items-start bg-gray-100 rounded-lg mb-3 px-3 py-2">
          <span className="font-bold text-xs text-green-400">
            {t("product.form_contact.product_label")}
          </span>
          <span className="font-black text-base lg:text-xl text-green-800">
            {data.title}
          </span>
        </div>

        {/* Product Contact Form */}
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
              <p className="text-red-500 text-sm mt-1">
                {state?.errors?.name[0]}
              </p>
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
                title="Liên lạc"
                className="w-min box-border flex-none text-sm p-3 mr-3 border border-gray-300 rounded lg:text-xl focus:outline-none focus:ring-1 focus:ring-green-400"
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
                      contactMethod === "email"
                        ? "example@gmail.com"
                        : "0123456789"
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
              <p className="text-red-400 text-sm mt-1">
                {state?.errors?.contact}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="hidden mb-1 font-medium">
              {t("form.customer_message_label")}
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder={t("form.customer_message_label")}
              className={`w-full max-h-20 box-border p-3 border rounded focus:outline-none focus:ring-1 ${
                errors.message
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
            {state?.errors?.message && (
              <p className="text-red-400 text-sm mt-1">
                {state?.errors?.message}
              </p>
            )}
          </div>

          <SubmitButton state={state} variant="primary">
            {t("form_submit")}
          </SubmitButton>
        </form>
      </div>
    );
  }
);

ProductContactForm.displayName = "ProductContactForm";

export default ProductContactForm;
