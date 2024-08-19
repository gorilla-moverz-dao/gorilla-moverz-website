import { z } from "zod";

const message = "Field is required";

export const PartnerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message }),
  socials: z.string().min(1, { message }),
  contact_discord: z.string().min(1, { message }),
  description: z.string().min(1, { message }),
  benefits_gorillaz: z.string().min(1, { message }),
  benefits_partner: z.string().min(1, { message }),
  comments: z.string().optional(),
});

export type Partner = z.infer<typeof PartnerSchema>;
