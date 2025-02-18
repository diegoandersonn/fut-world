import { z } from "zod";

const attributeSchema = z.coerce
  .number()
  .refine((value) => value >= 1 && value <= 99, {
    message: "Attribute value must be between 1 and 99",
  });

export const playerSchema = z.object({
  name: z.string().nonempty("Player Name Field is Required"),
  age: z
    .string()
    .nonempty("Player Age Field is Required")
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) >= 16 && Number(value) <= 40,
      "Player Age must be a valid number between 16 and 40"
    ),
  country: z.object({
    name: z.string(),
    flag: z.string(),
    id: z.string(),
    abbreviation: z.string(),
  }),
  picture: z.string().optional(),
  position: z.string().nonempty("Position Name Field is Required"),
  atb1: attributeSchema,
  atb2: attributeSchema,
  atb3: attributeSchema,
  atb4: attributeSchema,
  atb5: attributeSchema,
  atb6: attributeSchema,
});