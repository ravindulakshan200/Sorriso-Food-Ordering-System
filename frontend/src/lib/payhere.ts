import crypto from "crypto";
import { createClient } from "@/lib/supabase/client";

export function generatePayHereHash(
  order_id: string,
  amount: string,
  currency: string
): string {
  const merchant_id = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_SECRET;

  if (!merchant_id || !merchant_secret) {
    throw new Error("Missing PayHere credentials");
  }

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const amountFormatted = parseFloat(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });

  const hashString = merchant_id + order_id + amountFormatted + currency + hashedSecret;
  const hash = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

  return hash;
}

export async function processPayHereNotification(data: FormData): Promise<void> {
  const merchant_id = data.get("merchant_id") as string;
  const order_id = data.get("order_id") as string;
  const payhere_amount = data.get("payhere_amount") as string;
  const payhere_currency = data.get("payhere_currency") as string;
  const status_code = data.get("status_code") as string;
  const md5sig = data.get("md5sig") as string;

  const merchant_secret = process.env.PAYHERE_SECRET || "";

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();
  const hashString = merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret;
  const localMd5sig = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

  if (localMd5sig === md5sig) {
    const supabase = createClient();

    if (status_code === "2") {
      await supabase.from("orders").update({ payment_status: "paid" }).eq("id", order_id);
    } else if (status_code === "-1" || status_code === "-2") {
      await supabase.from("orders").update({ payment_status: "failed" }).eq("id", order_id);
    }
  }
}
