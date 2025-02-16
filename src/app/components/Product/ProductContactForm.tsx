"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useProductFormSchema,
  type ProductContactFormData,
} from "./form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductQuery } from "@/app/graphql/types/graphql";
import { client } from "@/app/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import SubmitButton from "@/app/components/Button/SubmitButton";
import { useTranslations } from "next-intl";

const ProductContactForm: React.FC<{
  data: ProductQuery["product"];
}> = ({ data }) => {
  const productContactFormSchema = useProductFormSchema();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
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

  const productData = data;
  const contactMethod = watch("contact.method"); // Watch the selected contact method

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit: SubmitHandler<ProductContactFormData> = async (formData) => {
    setStatus("loading");
    try {
      const result = await client.items.create({
        item_type: { type: "item_type", id: "HUuou7VGSOit4M2dVjU9eg" },
        message: formData.message,
        product: productData?.id,
        customer_information: {
          type: "item",
          attributes: {
            name: formData.name,
            email:
              formData.contact.method === "email" ? formData.contact.value : "",
            phone:
              formData.contact.method === "phone" ? formData.contact.value : "",
          },
          relationships: {
            item_type: {
              data: { type: "item_type", id: "IeGLw8eLSeqoET9G9NmVCA" },
            },
          },
        },
      });
      console.log(result);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      if (error instanceof ApiError) {
        console.log(error.response.body);
      } else {
        throw error;
      }
    }
    // Reset the form after submission
    reset();
  };

  const t = useTranslations();

  if (!productData) {
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
          {productData?.title}
        </span>
      </div>

      {/* Product Contact Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        </div>

        <SubmitButton type="submit" status={status} variant="primary">
          {t("form_submit")}
        </SubmitButton>
      </form>
    </div>
  );
};

export default ProductContactForm;
