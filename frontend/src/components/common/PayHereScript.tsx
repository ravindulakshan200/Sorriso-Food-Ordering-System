"use client";

import { useEffect } from "react";

export default function PayHereScript() {
  useEffect(() => {
    const SCRIPT_ID = "payhere-sdk-script";

    if (document.getElementById(SCRIPT_ID)) return;

    const loadScript = () => {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://www.payhere.lk/lib/payhere.js";
      s.async = true;
      s.onload = () => {
        window.dispatchEvent(new Event("payhere-script-ready"));
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
