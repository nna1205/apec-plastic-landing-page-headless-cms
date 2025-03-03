"use server"

import { client } from "@/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import { z } from "zod";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

const productContactFormSchema = z.object({
    name: z.string().min(1, "This field is required"),
    message: z
      .string()
      .min(1, "This field is required")
      .max(500, { message: "This field is not valid" }),
    contact: z
      .object({
        method: z.enum(["email", "phone"]),
        value: z.string().min(1, {
          message: "This field is required",
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
          message: "This field is not valid",
          path: ["contact.value"],
        }
      ),
  });

export async function SubmiProductContactFormHandler(prevState: FormState, payload: FormData): Promise<FormState> {
    try {
        if (!(payload instanceof FormData)) {
            return {
              success: false,
              errors: { error: ["Invalid Form Data"] },
            };
        }

        const validatedFormData =  productContactFormSchema.safeParse({
            name: payload.get("name") as string,
            message: payload.get("message") as string,
            contact: {
                method: payload.get("contact.method") as string,
                value: payload.get("contact.value") as string
            }
        });

        if (!validatedFormData.success) {
            const formData = Object.fromEntries(payload);
            const errors = validatedFormData.error.flatten().fieldErrors;
            const fields: Record<string, string> = {};

            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                success: false,
                fields,
                errors,
            };
        }    
    
        await client.items.create({
            item_type: { type: "item_type", id: "HUuou7VGSOit4M2dVjU9eg" },
            message: validatedFormData.data?.message,
            product: payload.get("productId") as string,
            customer_information: {
              type: "item",
              attributes: {
                name: validatedFormData.data?.name,
                email:
                validatedFormData.data?.contact.method === "email" ? validatedFormData.data?.contact.value : "",
                phone:
                validatedFormData.data?.contact.method === "phone" ? validatedFormData.data?.contact.value : "",
              },
              relationships: {
                item_type: {
                  data: { type: "item_type", id: "IeGLw8eLSeqoET9G9NmVCA" },
                },
              },
            },
          });
        return { success: true };
    } catch (error) {
        if (error instanceof ApiError) {
            return { 
                success: false,
                errors: {
                    form: ["Error submitting contact form"]
                }
            };
        } else {
            throw error;
        }
    }
};