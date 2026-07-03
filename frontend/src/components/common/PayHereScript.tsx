"use client";

import Script from "next/script";

export default function PayHereScript() {
  return <Script src="https://www.payhere.lk/lib/payhere.js" strategy="lazyOnload" />;
}
