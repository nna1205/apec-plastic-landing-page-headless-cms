"use server"

import { client } from "@/lib/datocms";
import { ApiError } from "@datocms/cma-client-browser";
import { z } from "zod";

type FormState = {
    success: boolean;
    fields?: Record<string, string>;
    errors?: Record<string, string[]>;
};

const contactFormSchema = z.object({
    name: z.string().min(1, "This field is required"),
    contact: z
      .object({
        method: z.enum(["email", "phone"]),
        value: z.string().min(1, {
          message: "This field is required"
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
          message: "Invalid email or phone number",
          path: ["contact.value"],
        }
      ),
  });

export async function SubmitContactFormHandler(prevState: FormState, payload: FormData): Promise<FormState> {
    try {
        if (!(payload instanceof FormData)) {
            return {
              success: false,
              errors: { error: ["Invalid Form Data"] },
            };
        }

        const validatedData = contactFormSchema.safeParse({
            name: payload.get("name") as string,
            contact: {
                method: payload.get("contact.method") as string,
                value: payload.get("contact.value") as string
            }
        });

        if (!validatedData.success) {
            const formData = Object.fromEntries(payload);
            const errors = validatedData.error.flatten().fieldErrors;
            const fields: Record<string, string> = {};

            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            console.log("error returned data", formData);
            console.log("error returned error", errors);
            return {
                success: false,
                fields,
                errors,
            };
        }    
    
        await client.items.create({
            item_type: { type: "item_type", id: "I2zzp4buRZatIT1rh-vPwA" },
            customer_information: {
                type: "item",
                attributes: {
                    name: validatedData.data?.name,
                    email: validatedData.data?.contact.method === "email" ? validatedData.data?.contact.value : "",
                    phone: validatedData.data?.contact.method === "phone" ? validatedData.data?.contact.value : "",
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