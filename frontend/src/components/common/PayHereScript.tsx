"use client";

import { useEffect } from "react";

export default function PayHereScript() {
  useEffect(() => {
    const SCRIPT_ID = "payhere-sdk-script";

    const dispatchReady = () => {
      window.dispatchEvent(new Event("payhere-script-ready"));
    };

    const dispatchError = () => {
      window.dispatchEvent(new Event("payhere-script-error"));
    };

    const tryReady = () => {
      if (window.payhere && typeof window.payhere.startPayment === "function") {
        dispatchReady();
        return true;
      }
      return false;
    };

    if (tryReady()) return;

    if (document.getElementById(SCRIPT_ID)) {
      const existing = window.setInterval(() => {
        if (tryReady()) {
          window.clearInterval(existing);
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
        window.setTimeout(() => {
          if (!tryReady()) {
            dispatchError();
          }
        }, 200);
      };
      s.onerror = () => {
        dispatchError();
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
