"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useContactFormSchema,
  type ContactFormData,
} from "@/components/ContactForm/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const contactFormSchema = useContactFormSchema();
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

  const t = useTranslations();

  return (
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
      </div>

      <button
        type="submit"
        className="w-full bg-green-400 text-black py-3 rounded font-bold hover:bg-green-400 transition"
      >
        {t("form_submit")}
      </button>
    </form>
  );
};

export default ContactForm;
