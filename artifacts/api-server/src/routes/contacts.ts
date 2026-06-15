import { Router, type IRouter } from "express";
import { z } from "zod";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";

const router: IRouter = Router();

const GeneralContactSchema = z.object({
  type: z.literal("general"),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
});

const ServiceContactSchema = z.object({
  type: z.literal("service"),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  role: z.string().optional(),
  company_type: z.string().optional(),
  company_size: z.string().optional(),
  budget_range: z.string().optional(),
  best_time: z.string().optional(),
  challenge: z.string().optional(),
});

const ContactBodySchema = z.union([GeneralContactSchema, ServiceContactSchema]);

router.post("/contacts", async (req, res) => {
  const parsed = ContactBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", issues: parsed.error.issues });
    return;
  }

  const data = parsed.data;

  try {
    const [contact] = await db
      .insert(contactsTable)
      .values({
        type: data.type,
        name: data.name,
        email: data.email,
        phone: "phone" in data ? data.phone : undefined,
        subject: "subject" in data ? data.subject : undefined,
        message: "message" in data ? data.message : undefined,
        service: "service" in data ? data.service : undefined,
        role: "role" in data ? data.role : undefined,
        company_type: "company_type" in data ? data.company_type : undefined,
        company_size: "company_size" in data ? data.company_size : undefined,
        budget_range: "budget_range" in data ? data.budget_range : undefined,
        best_time: "best_time" in data ? data.best_time : undefined,
        challenge: "challenge" in data ? data.challenge : undefined,
      })
      .returning();

    req.log.info({ contactId: contact.id, type: data.type }, "Contact form submitted");
    res.status(201).json({ id: contact.id, status: "received" });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact");
    res.status(500).json({ error: "Failed to save contact" });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(contactsTable.created_at);

    res.json({ contacts });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contacts");
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
