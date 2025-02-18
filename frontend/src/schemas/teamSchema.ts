import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().nonempty("The Team Name field is Required"),
  country: z.object({
    name: z.string(),
    flag: z.string(),
  }),
  stadium: z.string().nonempty("The Team Stadium field is Required"),
  id: z.string().optional(),
  logo: z.string().optional(),
  manager: z.string().optional(),
});
