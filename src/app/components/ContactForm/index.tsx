"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import { useTranslation } from "react-i18next";

const contactFormSchema = z.object({
  name: z.string().min(1, "Tên khách hàng không được để trống"),
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

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
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

  const onSubmit: SubmitHandler<ContactFormData> = async (formData) => {
    try {
      const result = await client.items.create({
        item_type: { type: "item_type", id: "I2zzp4buRZatIT1rh-vPwA" },
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
    } catch (error) {
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

  return (
    <div className="w-full box-border p-3 bg-white border border-slate-100 rounded-lg shadow-md lg:p-6 lg:w-1/2">
      {/* Contact Form */}
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

        <button
          type="submit"
          className="w-full bg-green-400 text-white py-3 rounded font-bold hover:bg-green-400 transition"
        >
          {t("form_submit")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
