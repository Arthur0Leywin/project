# Recall: Design Guide

This guide describes the colors, text, and parts already used in the app.

## Colors

| What it is for | Color |
| --- | --- |
| Main buttons and highlights | `#7658E8` |
| Button hover | `#6545DC` |
| Selected items | `#F0EBFF` |
| Page background | `#F8F8FB` |
| Cards and panels | `#FFFFFF` |
| Main text | `#24233A` |
| Supporting text | `#89899B` |
| Borders and lines | `#EEEFF4` |
| Starred files | `#EFA94F` |
| Notes file icon | `#5CAA91` |
| PDF file icon | `#E97576` |
| Slides file icon | `#9272DC` |
| Word file icon | `#5B91D7` |

Category dots use orange, green, purple, pink, and blue. The app does not use separate colors for success and error messages; it shows those messages as text.

## Text

- **Font family:** Manrope for the logo and headings; DM Sans for body text and buttons. Both use a sans-serif fallback.
- **Main heading (H1):** Manrope, 29px, bold (700).
- **Section heading (H2):** Manrope, 15px, bold (700).
- **Document title:** Manrope, 12px, bold (700).
- **Dialog title:** Manrope, 19px, bold (700).
- **Body text:** DM Sans, 13px, regular (400).
- **Button text:** DM Sans, 11px, semi-bold (600) for main buttons; 10px for smaller buttons.
- **Small or secondary text:** DM Sans, usually 9–12px; small labels are 9px and bold (700).
- If the Google Fonts cannot load, the browser uses its default sans-serif font.

## Page layout

- The left menu is 254 pixels wide on large screens.
- On medium screens, the document cards use two columns.
- On small screens, the menu becomes a narrow icon strip and the cards use one column.
- Use the buttons above the documents to switch between grid and list views.
- Selecting a document opens a scrollable pop-up with its details.

## Parts of the app

- **Left menu:** Main pages, categories, storage use, and upload button.
- **Search box:** Search your documents and try the example question.
- **Document card:** File type, category, title, summary, date, and star.
- **Empty message:** Shows an upload button when there are no matching documents.
- **Document pop-up:** Category, summary, key terms, key points, study tools, full text, and original file.
- **Study cards:** Open a question to see its answer.
- **Messages:** Briefly tell you when an action worked or needs attention.

## How to use it

- Add a file with an upload button or drag it onto the page.
- Select a document to read it, change its category, star it, remove it, or make study questions.
- Search looks through document titles, categories, summaries, and readable text. It shows matching notes; it does not write an AI answer.
- Press **Ctrl+K** or **Cmd+K** to jump to search. Press **Escape** to close a document.

## Notes

The file picker lists PDF, TXT, MD, DOC, DOCX, and CSV. Scanned PDFs need text recognition (OCR), which is not included. Other file formats may not have readable text.

The wireframe is in [WIREFRAME.svg](./WIREFRAME.svg). Setup steps are in [README.md](./README.md).
