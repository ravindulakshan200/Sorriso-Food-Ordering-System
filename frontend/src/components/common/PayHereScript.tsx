"use client";

import { useEffect } from "react";

export default function PayHereScript() {
  useEffect(() => {
    const SCRIPT_ID = "payhere-sdk-script";

    const dispatchReady = () => {
      window.dispatchEvent(new Event("payhere-script-ready"));
    };

    if (window.payhere && typeof window.payhere.startPayment === "function") {
      dispatchReady();
      return;
    }

    if (document.getElementById(SCRIPT_ID)) {
      const existing = window.setInterval(() => {
        if (window.payhere && typeof window.payhere.startPayment === "function") {
          window.clearInterval(existing);
          dispatchReady();
        }
      }, 100);

      return () => window.clearInterval(existing);
    }

    const loadScript = () => {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://www.payhere.lk/lib/payhere.js";
      s.async = true;
      s.onload = () => {
        dispatchReady();
      };
      s.onerror = () => {
        window.dispatchEvent(new Event("payhere-script-error"));
      };
      document.body.appendChild(s);
    };

    if (document.readyState === "complete") {
      loadScript();
    } else {
      window.addEventListener("load", loadScript, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadScript as EventListener);
    };
  }, []);

  return null;
}
