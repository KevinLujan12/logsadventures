'use client'
import { logAction } from '../actions/logger'

export default function PdfButton({ elementId, fishermanName }: { elementId: string, fishermanName: string }) {
  const handleDownload = async () => {
    // Import html2pdf dinámicamente para evitar errores de SSR
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById(elementId);
    
    if (element) {
      html2pdf().from(element).save(`${fishermanName.replace(/\s+/g, '_')}_info.pdf`);
      // Loggear la descarga del PDF
      await logAction("DOWNLOAD_PDF", `Downloaded PDF for fisherman: ${fishermanName}`);
    }
  }

  return (
    <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
      Download Info as PDF
    </button>
  )
}