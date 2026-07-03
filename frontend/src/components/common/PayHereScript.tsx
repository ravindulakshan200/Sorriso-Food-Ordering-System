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
      document.body.appendChild(s);
    };

    if (document.readyState === "complete") {
      loadScript();
    } else {
      window.addEventListener("load", loadScript, { once: true });
    }

    return () => {
      // no teardown required; leave script if loaded. If not loaded, ensure listener is removed.
      window.removeEventListener("load", loadScript as EventListener);
    };
  }, []);

  return null;
}
