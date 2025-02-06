"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductQuery } from "@/graphql/types/graphql";
import { client } from "@/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import SubmitButton from "@/components/Button/SubmitButton";
import { useTranslation } from "react-i18next";

const productContactFormSchema = z.object({
  name: z.string().min(1, "Tên khách hàng không được để trống"),
  message: z
    .string()
    .min(1, "Tin nhắn không được để trống")
    .max(500, { message: "Không được vượt quá 500 ký tự" }),
  contact: z
    .object({
      method: z.enum(["email", "phone"]),
      value: z.string().min(1, {
        message: "Thông tin liên lạc không được để trống",
      }),
    })
    .refine(
      (input) => {
        if (input.method === "email") {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            input.value
          );
        } else if (input.method === "phone") {
          return /^\+?[0-9]{1,3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/.test(
            input.value
          );
        }
        return true;
      },
      {
        message: "Thông tin liên lạc không hợp lệ",
        path: ["contact.value"],
      }
    ),
});

type ProductContactFormData = z.infer<typeof productContactFormSchema>;

const ProductContactForm: React.FC<{
  data: ProductQuery["product"];
}> = ({ data }) => {
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

  const { t } = useTranslation();

  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full box-border p-3 bg-white border border-slate-100 rounded-lg shadow-md lg:p-6 lg:w-1/2">
      {/* Product Summary */}
      <div className="flex flex-col text-start justify-start items-start bg-gray-100 rounded-lg mb-3 px-3 py-2">
        <span className="font-bold text-xs text-green-400">SẢN PHẨM</span>
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
          <label className="hidden mb-1 font-medium">Tên khách hàng</label>
          <input
            {...register("name")}
            placeholder="Tên khách hàng"
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
          <label className="hidden mb-1 font-medium">Liên lạc</label>
          <div className="w-full flex justify-between items-center">
            <select
              {...register("contact.method")}
              title="Liên lạc"
              className="w-min max-w-min box-border flex-none text-sm p-3 mr-3 border border-gray-300 rounded lg:text-xl focus:outline-none focus:ring-1 focus:ring-green-400"
            >
              <option value="email">Email</option>
              <option value="phone">Điện thoại</option>
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
          <label className="hidden mb-1 font-medium">Lời nhắn</label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Tin nhắn"
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
