# Recall

Recall helps students keep study documents in one place, find them, and make simple study notes.

## Run the app

Install Node.js 20.9 or newer. Then open a terminal in this folder and run:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To make and run a production build:

```powershell
npm run build
npm start
```

## What it can do

- Upload PDF, DOCX, DOC, TXT, MD, and CSV files. You can also drag files onto the page.
- Search documents, browse by category, view starred or recent files, and switch between grid and list views.
- Add your own categories and keywords. The app uses the file name and readable text to suggest a category. You can change it yourself.
- Open PDFs in the app. Read extracted text or download the original file.
- Make simple summaries, key points, key terms, flashcards, and practice questions from readable text.

## File and storage limits

- PDF and DOCX text is read by the app. TXT, MD, and CSV text is read in your browser.
- Files sent for text extraction must be under 50 MB. Scanned PDFs need OCR, which is not included.
- DOC files can be downloaded, but their text is not extracted. PPT and PPTX files are not supported.
- Files and categories are saved in your browser, not online. They will not appear on another device. Clearing browser data may delete them.
- Summaries and study questions are made with simple text rules, not AI. Check them for mistakes.

## Files in this project

- `app/` contains the Next.js pages and the PDF/Word text reader.
- `public/app.js` handles the buttons, search, categories, and study tools.
- `public/styles.css` controls how the app looks.
- `package.json` lists the commands and packages.
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) explains the colors and text styles.
- [WIREFRAME.svg](./WIREFRAME.svg) shows the screen layout and main steps.

The root `index.html`, `app.js`, and `styles.css` are from the earlier version.

## Publishing

The app needs a web host that can run Next.js. The current GitHub Pages workflow does not build the app or run its file reader, so it cannot publish this version as-is.
