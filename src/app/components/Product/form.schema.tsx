import { z } from "zod";
import { useTranslations } from "next-intl";

export const useProductFormSchema = () => {
  const t = useTranslations("form");

  const productContactFormSchema = z.object({
    name: z.string().min(1, t("error_message.required")),
    message: z
      .string()
      .min(1, t("error_message.required"))
      .max(500, { message: t("error_message.invalid") }),
    contact: z
      .object({
        method: z.enum(["email", "phone"]),
        value: z.string().min(1, {
          message: t("error_message.required"),
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
          message: t("error_message.invalid"),
          path: ["contact.value"],
        }
      ),
  });

  return productContactFormSchema;
};

export type ProductContactFormData = z.infer<
  ReturnType<typeof useProductFormSchema>
>;
