import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";
import { resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const STANDARD_FONT_DATA_URL = pathToFileURL(`${resolve(process.cwd(), "node_modules/pdfjs-dist/standard_fonts")}${sep}`).href;

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file.arrayBuffer !== "function" || !file.name) {
    return Response.json({ error: "Choose a PDF or Word document to analyze." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return Response.json({ error: "This file is larger than the 50 MB upload limit." }, { status: 413 });
  }

  const extension = file.name.split(".").pop().toLowerCase();
  try {
    let text = "";
    if (extension === "pdf") {
      const loadingTask = getDocument({
        data: new Uint8Array(await file.arrayBuffer()),
        standardFontDataUrl: STANDARD_FONT_DATA_URL
      });
      const pdf = await loadingTask.promise;
      const pages = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        pages.push(content.items.map(item => item.str || "").filter(Boolean).join(" "));
        page.cleanup();
      }
      await loadingTask.destroy();
      text = pages.join("\n\n").trim();
    } else if (extension === "docx") {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(await file.arrayBuffer()) });
      text = result.value.trim();
    } else {
      return Response.json({ error: "Text extraction is supported for PDF and DOCX files." }, { status: 415 });
    }

    return Response.json({
      text,
      warning: text ? "" : "No selectable text was found. Scanned PDFs need OCR to read."
    });
  } catch (error) {
    console.error(`Could not extract text from ${file.name}:`, error);
    return Response.json({ error: "This file could not be read. It may be damaged or password-protected." }, { status: 422 });
  }
}
