'use client'
import * as Sentry from '@sentry/nextjs'

export default function TestButton() {
  return (
    <button
      onClick={() => {
        // Inicialización forzada directa para asegurar el envío
        Sentry.init({
          dsn: "https://ddd6a3040f3944eec9485ce84100de73@o4512388015915008.ingest.us.sentry.io/4512388043702272", 
          tracesSampleRate: 1.0,
        });
        
        const err = new Error("Sentry Test Final y Directo!");
        Sentry.captureException(err);
        console.log("Enviando a Sentry...");
        alert("El error fue disparado directamente. Revisa Sentry.");
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition whitespace-nowrap"
    >
      🚨 Trigger Sentry Error
    </button>
  )
}