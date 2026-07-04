import crypto from 'crypto';
import { supabase } from '../services/supabase';

const FALLBACK_MERCHANT_ID = '4OVyvQT17YG4JH5FFpd2qv3Td';
const FALLBACK_MERCHANT_SECRET = '48fcgBCD9iV4ZHjeqStu1z4TrGoIknZjc8mxoCtHXwQ6';

/**
 * Generates the PayHere MD5 hash required to initialise a payment.
 * Extracted from the /api/payhere/hash route handler.
 *
 * Hash formula (PayHere spec):
 *   MD5( merchant_id + order_id + formatted_amount + currency + MD5(merchant_secret).toUpperCase() ).toUpperCase()
 */
export function generatePayHereHash(
  order_id: string,
  amount: string,
  currency: string
): string {
  const merchant_id = (process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || FALLBACK_MERCHANT_ID).trim();
  const merchant_secret = (process.env.PAYHERE_SECRET || FALLBACK_MERCHANT_SECRET).trim();

  if (!merchant_id || !merchant_secret) {
    throw new Error('Missing PayHere credentials');
  }

  const hashedSecret = crypto
    .createHash('md5')
    .update(merchant_secret)
    .digest('hex')
    .toUpperCase();

  // Amount must be completely formatted to 2 decimals without commas
  const amountFormatted = parseFloat(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });

  const hashString = merchant_id + order_id + amountFormatted + currency + hashedSecret;
  const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

  console.log("=== PayHere Hash Debug ===");
  console.log("Merchant ID:", merchant_id);
  console.log("Order ID:", order_id);
  console.log("Generated Amount String:", amountFormatted);
  console.log("Raw Hash String (Before MD5):", hashString);
  console.log("Final Uppercase Hash:", hash);
  console.log("==========================");

  return hash;
}

/**
 * Verifies a PayHere server notification and updates the order payment status.
 * Extracted from the /api/payhere/notify route handler.
 *
 * Returns silently on HMAC mismatch (PayHere keeps retrying, so we always 200).
 */
export async function processPayHereNotification(data: FormData): Promise<void> {
  const merchant_id     = data.get('merchant_id')      as string;
  const order_id        = data.get('order_id')          as string;
  const payhere_amount   = data.get('payhere_amount')   as string;
  const payhere_currency = data.get('payhere_currency') as string;
  const status_code     = data.get('status_code')       as string;
  const md5sig          = data.get('md5sig')             as string;

  const merchant_secret = (process.env.PAYHERE_SECRET || FALLBACK_MERCHANT_SECRET).trim();

  // 1. Generate local MD5
  const hashedSecret = crypto
    .createHash('md5')
    .update(merchant_secret)
    .digest('hex')
    .toUpperCase();
  const hashString = merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret;
  const localMd5sig = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

  // 2. Compare matching MD5 payload to securely verify requests are genuinely coming from PayHere
  if (localMd5sig === md5sig) {
    if (status_code === '2') {
      // 2 = Success in PayHere
      await supabase.from('orders').update({ payment_status: 'paid' }).eq('id', order_id);
    } else if (status_code === '-1' || status_code === '-2') {
      // Canceled / Failed
      await supabase.from('orders').update({ payment_status: 'failed' }).eq('id', order_id);
    }
  }
}
