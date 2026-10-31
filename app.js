const SUBJECTS = ["Biology", "History", "Psychology", "Literature"];
const COLORS = ["#f3a268", "#69c6a5", "#8c78e0", "#e79aaf", "#68a0dd"];
const STORAGE_KEY = "recall-documents-v1";
const SEARCH_STOP_WORDS = new Set(["what", "which", "where", "when", "who", "whom", "whose", "why", "how", "the", "and", "for", "from", "with", "about", "into", "that", "this", "these", "those", "are", "was", "were", "is", "in", "on", "of", "to", "my", "me", "i", "a", "an", "it", "its", "key", "ideas", "notes", "document", "documents", "tell", "show", "find"]);

const starterDocuments = [
  {
    id: "sample-bio", title: "Cell Biology — Lecture 04", subject: "Biology", kind: "slides", size: 2.4, date: "Today",
    summary: "A quick guide to cell membranes, transport mechanisms, and how organelles keep a cell running.",
    text: "Cell Biology lecture 04: Cell membranes are selectively permeable barriers made primarily of a phospholipid bilayer. Passive transport moves substances down their concentration gradient without energy. Osmosis is the diffusion of water. Facilitated diffusion uses channel proteins. Active transport moves substances against the gradient and uses ATP, such as the sodium-potassium pump. Mitochondria produce ATP through cellular respiration. The endoplasmic reticulum synthesizes proteins and lipids; the Golgi apparatus modifies and packages them. Key idea: structure determines function at every level of the cell.",
    points: ["The phospholipid bilayer controls what enters and leaves a cell.", "Passive transport needs no energy; active transport uses ATP.", "Mitochondria produce ATP, while the Golgi modifies and packages cell products."], starred: true, fileType: "slides"
  },
  {
    id: "sample-history", title: "The Industrial Revolution", subject: "History", kind: "pdf", size: 4.8, date: "Yesterday",
    summary: "How a shift from hand production to machinery transformed economies, cities, and everyday life.",
    text: "The Industrial Revolution began in Britain in the late eighteenth century before spreading to Europe and North America. The steam engine, spinning jenny, and mechanized factory changed how goods were made. Factories created new urban jobs, leading to rapid urbanization. Working conditions were often difficult: long hours, low wages, and unsafe workplaces. Railways and steamships connected markets and lowered transport costs. Industrialization increased output and eventually living standards, but initially widened inequality and created public health challenges. Reform movements led to labor laws and universal education.",
    points: ["The Industrial Revolution began in Britain in the late 18th century.", "Steam power and mechanized factories increased production and accelerated urbanization.", "Industrialization brought growth alongside inequality and difficult working conditions."], starred: false, fileType: "pdf"
  },
  {
    id: "sample-psych", title: "Cognitive Psychology: Memory", subject: "Psychology", kind: "notes", size: 1.1, date: "Oct 26",
    summary: "A concise overview of encoding, storage, retrieval, and the spacing effect in learning.",
    text: "Memory is often described through three processes: encoding, storage, and retrieval. Working memory temporarily holds and manipulates a small amount of information. Long-term memory has a much larger capacity and duration. Elaborative rehearsal connects new information to existing knowledge, helping it move into long-term memory. Retrieval practice strengthens recall more effectively than rereading. Spaced practice—reviewing information over increasing intervals—reduces forgetting and improves long-term retention. Context and sleep also influence consolidation.",
    points: ["Memory involves encoding, storage, and retrieval.", "Retrieval practice is more effective than simply rereading notes.", "Spacing study sessions and sleeping well support long-term retention."], starred: true, fileType: "notes"
  },
  {
    id: "sample-lit", title: "The Great Gatsby — Themes", subject: "Literature", kind: "pdf", size: 3.2, date: "Oct 24",
    summary: "Class notes on the American Dream, social class, and symbolism in Fitzgerald’s novel.",
    text: "F. Scott Fitzgerald's The Great Gatsby explores the American Dream through Jay Gatsby's pursuit of wealth and Daisy Buchanan. The green light symbolizes Gatsby's hope and the future always just out of reach. The Valley of Ashes represents the moral and social cost of wealth. East Egg and West Egg distinguish inherited wealth from newly acquired wealth, exposing class divisions. Nick Carraway narrates the story, and his observations reveal both fascination and criticism of the wealthy. The novel suggests that material success cannot recover the past.",
    points: ["The green light symbolizes Gatsby's hope and an unreachable future.", "East Egg and West Egg represent old money and new money.", "The novel questions whether wealth can fulfill the American Dream."], starred: false, fileType: "pdf"
  },
  {
    id: "sample-bio2", title: "Genetics & Inheritance", subject: "Biology", kind: "notes", size: 0.8, date: "Oct 21",
    summary: "Mendelian inheritance, dominant and recessive alleles, and the basics of Punnett squares.",
    text: "Genes are segments of DNA that provide instructions for traits. Different versions of a gene are called alleles. A dominant allele can mask a recessive allele. Genotype describes an organism's genetic makeup; phenotype describes observable traits. Mendel used pea plants to develop principles of inheritance. A Punnett square predicts possible offspring genotypes by combining parental alleles. For a heterozygous cross Aa x Aa, the genotypic ratio is 1 AA : 2 Aa : 1 aa and the phenotypic ratio for complete dominance is 3:1.",
    points: ["Genes have different versions called alleles.", "Genotype is genetic makeup; phenotype is an observable trait.", "An Aa × Aa cross produces a 3:1 dominant-to-recessive phenotype ratio."], starred: false, fileType: "notes"
  },
  {
    id: "sample-history2", title: "French Revolution — Timeline", subject: "History", kind: "slides", size: 5.6, date: "Oct 18",
    summary: "Key moments from the Estates-General to the Reign of Terror and the rise of Napoleon.",
    text: "The French Revolution began in 1789 amid financial crisis and social inequality. The Estates-General met in May. The Third Estate declared itself the National Assembly, and the storming of the Bastille on July 14 became a symbol of revolt. The Declaration of the Rights of Man set out liberty and equality. France became a republic in 1792. The Reign of Terror followed under the Committee of Public Safety from 1793 to 1794. The Directory governed from 1795 until Napoleon's coup in 1799. The revolution ended absolute monarchy but did not immediately create stable democracy.",
    points: ["The revolution began in 1789 after a financial crisis and social inequality.", "The Bastille was stormed on July 14, 1789.", "Napoleon's coup in 1799 ended the Directory and began a new political era."], starred: false, fileType: "slides"
  }
];

let documents = loadDocuments();
let activeView = "all";
let activeSubject = null;
let currentLayout = "grid";
let searchQuery = "";
let toastTimer;

const grid = document.getElementById("document-grid");
const fileInput = document.getElementById("file-input");
const toast = document.getElementById("toast");
const searchInput = document.getElementById("search-input");

function loadDocuments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterDocuments.map(doc => ({ ...doc }));
  } catch (error) {
    console.error("Could not load saved documents:", error);
    return starterDocuments.map(doc => ({ ...doc }));
  }
}

function saveDocuments() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    showToast("Couldn't save changes. Your browser storage may be full.");
    console.error("Could not save documents:", error);
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function formatSize(mb) {
  if (mb < 0.1) return `${Math.max(1, Math.round(mb * 1024))} KB`;
  return `${mb.toFixed(1)} MB`;
}

function scoreDocument(doc, query) {
  const terms = [...new Set(getTerms(query).filter(term => term.length > 2 && !SEARCH_STOP_WORDS.has(term)))];
  const title = `${doc.title} ${doc.subject || ""}`.toLowerCase();
  const haystack = `${title} ${doc.summary || ""} ${doc.text || ""}`.toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? (title.includes(term) ? 3 : 1) : 0), 0);
}

function getVisibleDocuments() {
  let visible = [...documents];
  if (activeView === "starred") visible = visible.filter(doc => doc.starred);
  if (activeView === "recent") visible = visible.slice().sort((a, b) => b.addedAt - a.addedAt);
  if (activeSubject) visible = visible.filter(doc => doc.subject === activeSubject);
  if (searchQuery) visible = visible.map(doc => ({ doc, score: scoreDocument(doc, searchQuery) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.doc);
  return visible;
}

function render() {
  const visible = getVisibleDocuments();
  grid.classList.toggle("list-layout", currentLayout === "list");
  grid.innerHTML = visible.map(doc => {
    const badge = doc.fileType === "pdf" ? "PDF" : doc.fileType === "slides" ? "SLIDES" : doc.fileType === "doc" ? "DOC" : "NOTES";
    return `<article class="document-card" data-id="${escapeHtml(doc.id)}" tabindex="0" aria-label="Open ${escapeHtml(doc.title)}">
      <div class="card-top"><div class="file-badge ${escapeHtml(doc.fileType)}">${badge}</div><button class="card-menu" data-action="menu" aria-label="Document options">···</button></div>
      <div class="card-subject">${escapeHtml(doc.subject || "Uncategorized")}</div>
      <h3 class="card-title">${escapeHtml(doc.title)}</h3>
      <p class="card-summary">${escapeHtml(doc.summary || "Open to view your document and its extracted key points.")}</p>
      <div class="card-footer"><span class="file-size">▤ &nbsp;${formatSize(Number(doc.size) || 0)}</span><span class="card-right"><span>${escapeHtml(doc.date || "Just now")}</span><button class="star-button ${doc.starred ? "starred" : ""}" data-action="star" aria-label="${doc.starred ? "Remove from" : "Add to"} starred">${doc.starred ? "★" : "☆"}</button></span></div>
    </article>`;
  }).join("");
  document.getElementById("all-count").textContent = String(documents.length);
  document.getElementById("document-total").textContent = String(visible.length);
  document.getElementById("list-heading").textContent = activeSubject || (activeView === "starred" ? "Starred documents" : activeView === "recent" ? "Recently added" : "Your documents");
  document.getElementById("breadcrumb-current").textContent = activeSubject || (activeView === "starred" ? "Starred" : activeView === "recent" ? "Recently added" : "All documents");
  document.getElementById("page-title").innerHTML = activeSubject ? `${escapeHtml(activeSubject)} <span>study space.</span>` : "Everything in its <span>right place.</span>";
  const empty = document.getElementById("empty-state");
  empty.classList.toggle("hidden", visible.length > 0);
  document.getElementById("empty-title").textContent = searchQuery ? "No matches just yet" : "Your study space starts here";
  document.getElementById("empty-copy").textContent = searchQuery ? "Try a different search, or add a document to your library." : "Drop in your notes, lecture slides, or readings. We’ll help you make sense of it all.";
  updateSubjects();
  updateStorage();
  renderSearchAnswer();
}

function updateSubjects() {
  const nav = document.getElementById("subject-nav");
  const subjects = [...new Set([...SUBJECTS, ...documents.map(doc => doc.subject).filter(Boolean)])];
  nav.innerHTML = subjects.map((subject, index) => `<button class="subject-item ${activeSubject === subject ? "selected" : ""}" data-subject="${escapeHtml(subject)}"><span class="subject-dot" style="background:${COLORS[index % COLORS.length]}"></span>${escapeHtml(subject)}</button>`).join("");
}

function updateStorage() {
  const total = documents.reduce((sum, doc) => sum + (Number(doc.size) || 0), 0);
  document.getElementById("storage-text").textContent = `${formatSize(total)} of 500 MB`;
  document.getElementById("storage-fill").style.width = `${Math.max(2, Math.min(100, total / 5))}%`;
}

function getTerms(text) {
  return text.toLowerCase().match(/[a-z0-9]+/g) || [];
}

function renderSearchAnswer() {
  const panel = document.getElementById("search-answer");
  if (!searchQuery) {
    panel.classList.add("hidden");
    panel.innerHTML = "";
    return;
  }
  const queryTerms = [...new Set(getTerms(searchQuery).filter(term => term.length > 2 && !SEARCH_STOP_WORDS.has(term)))];
  const matches = documents.map(doc => ({ doc, score: scoreDocument(doc, searchQuery) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (!matches.length) {
    panel.classList.add("hidden");
    panel.innerHTML = "";
    return;
  }
  const excerpts = matches.slice(0, 2).map(({ doc }) => {
    const sentences = (doc.text.match(/[^.!?]+[.!?]+/g) || [doc.summary]).map(sentence => sentence.trim());
    const best = sentences.find(sentence => queryTerms.some(term => sentence.toLowerCase().includes(term))) || sentences[0];
    return best;
  });
  panel.innerHTML = `<div class="answer-heading"><span class="suggestion-sparkle">✦</span> A little help from your notes</div><div>${escapeHtml(excerpts.join(" "))}</div><div>${matches.map(({ doc }) => `<span class="answer-source">${escapeHtml(doc.title)}</span>`).join("")}</div>`;
  panel.classList.remove("hidden");
}

function summarize(text) {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || [text]).map(sentence => sentence.trim()).filter(Boolean);
  if (sentences.length <= 2) return sentences.join(" ");
  const words = getTerms(text);
  const frequency = {};
  words.forEach(word => { if (word.length > 3) frequency[word] = (frequency[word] || 0) + 1; });
  const ranked = sentences.map((sentence, index) => ({
    sentence, index,
    score: getTerms(sentence).reduce((sum, word) => sum + (frequency[word] || 0), 0) / Math.max(1, getTerms(sentence).length)
  })).sort((a, b) => b.score - a.score).slice(0, 2).sort((a, b) => a.index - b.index);
  return ranked.map(item => item.sentence).join(" ");
}

function extractPoints(text) {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || [text]).map(sentence => sentence.trim()).filter(sentence => sentence.length > 35);
  const cues = /\b(is|are|means|because|therefore|important|key|causes|result|such as|for example|increased|reduces|uses|produces|represents|began|created)\b/i;
  const selected = sentences.filter(sentence => cues.test(sentence)).slice(0, 4);
  return (selected.length ? selected : sentences.slice(0, 4)).map(sentence => sentence.replace(/^[•\-\s]+/, ""));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openDocument(id) {
  const doc = documents.find(item => item.id === id);
  if (!doc) return;
  const points = doc.points?.length ? doc.points : extractPoints(doc.text || "");
  const hasText = Boolean(doc.text && doc.text.trim());
  document.getElementById("detail-content").innerHTML = `
    <div class="detail-header"><div class="file-badge ${escapeHtml(doc.fileType)}">${doc.fileType === "pdf" ? "PDF" : doc.fileType === "slides" ? "SLIDES" : doc.fileType === "doc" ? "DOC" : "NOTES"}</div><div><h2 id="detail-title">${escapeHtml(doc.title)}</h2><div class="detail-meta">${escapeHtml(doc.subject || "Uncategorized")} &nbsp;·&nbsp; ${formatSize(Number(doc.size) || 0)} &nbsp;·&nbsp; Added ${escapeHtml(doc.date || "just now")}</div></div></div>
    <section class="detail-section"><h3>✦ &nbsp;Quick summary</h3><p>${escapeHtml(doc.summary || (hasText ? summarize(doc.text) : "This document is saved in your library. Add a text version to generate a summary and key points."))}</p></section>
    <section class="detail-section"><h3>Key points</h3>${points.length ? `<ul>${points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : "<p>We couldn't extract readable text from this file yet.</p>"}</section>
    ${hasText ? `<section class="detail-section"><h3>Document text</h3><p>${escapeHtml(doc.text.slice(0, 1400))}${doc.text.length > 1400 ? "…" : ""}</p></section>` : `<section class="detail-section"><p>Text extraction works for .txt, .md, and .csv files in this prototype. PDF and Word files are saved in your library, ready for a future AI/API integration.</p></section>`}
    <div class="detail-actions"><button class="secondary-button" id="detail-star">${doc.starred ? "★ Starred" : "☆ Add to starred"}</button><button class="secondary-button" id="detail-delete">Remove document</button></div>`;
  document.getElementById("modal-backdrop").classList.remove("hidden");
  document.getElementById("detail-star").onclick = () => {
    doc.starred = !doc.starred;
    saveDocuments();
    render();
    openDocument(id);
  };
  document.getElementById("detail-delete").onclick = () => {
    documents = documents.filter(item => item.id !== id);
    saveDocuments();
    closeModal();
    render();
    showToast("Document removed from your library.");
  };
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
}

async function readFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  const fileType = extension === "pdf" ? "pdf" : ["ppt", "pptx"].includes(extension) ? "slides" : ["doc", "docx"].includes(extension) ? "doc" : "notes";
  let text = "";
  if (["txt", "md", "csv"].includes(extension)) {
    try { text = await file.text(); }
    catch (error) { console.error(`Could not read ${file.name}:`, error); showToast(`Couldn't read ${file.name}.`); return; }
  }
  const subject = SUBJECTS.find(name => file.name.toLowerCase().includes(name.toLowerCase())) || "Uncategorized";
  const doc = {
    id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
    subject, kind: fileType, fileType, size: file.size / (1024 * 1024),
    date: "Just now", addedAt: Date.now(), text,
    summary: text ? summarize(text) : "",
    points: text ? extractPoints(text) : [],
    starred: false
  };
  documents.unshift(doc);
}

async function importFiles(files) {
  if (!files.length) return;
  for (const file of files) await readFile(file);
  saveDocuments();
  activeView = "all";
  activeSubject = null;
  searchQuery = "";
  searchInput.value = "";
  render();
  showToast(`${files.length} document${files.length === 1 ? "" : "s"} added to your study space.`);
  fileInput.value = "";
}

document.querySelectorAll("#upload-main, #upload-sidebar, #empty-upload").forEach(button => button.addEventListener("click", () => fileInput.click()));
fileInput.addEventListener("change", event => importFiles([...event.target.files]));
document.getElementById("add-subject").addEventListener("click", () => {
  const subject = window.prompt("Name your new subject:");
  if (subject?.trim() && !SUBJECTS.includes(subject.trim()) && !documents.some(doc => doc.subject === subject.trim())) {
    SUBJECTS.push(subject.trim());
    render();
    showToast(`${subject.trim()} added to your subjects.`);
  }
});
document.querySelector(".main-nav").addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  activeView = button.dataset.view;
  activeSubject = null;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item === button));
  render();
});
document.getElementById("subject-nav").addEventListener("click", event => {
  const button = event.target.closest("[data-subject]");
  if (!button) return;
  activeSubject = activeSubject === button.dataset.subject ? null : button.dataset.subject;
  activeView = "all";
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === "all" && !activeSubject));
  render();
});
grid.addEventListener("click", event => {
  const card = event.target.closest(".document-card");
  if (!card) return;
  const doc = documents.find(item => item.id === card.dataset.id);
  if (event.target.closest('[data-action="star"]')) {
    event.stopPropagation();
    if (doc) { doc.starred = !doc.starred; saveDocuments(); render(); }
    return;
  }
  if (event.target.closest('[data-action="menu"]')) {
    event.stopPropagation();
    openDocument(card.dataset.id);
    return;
  }
  openDocument(card.dataset.id);
});
grid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".document-card")) openDocument(event.target.dataset.id);
});
document.querySelectorAll(".view-button").forEach(button => button.addEventListener("click", () => {
  currentLayout = button.dataset.layout;
  document.querySelectorAll(".view-button").forEach(item => item.classList.toggle("selected", item === button));
  render();
}));
function runSearch() {
  searchQuery = searchInput.value.trim();
  activeSubject = null;
  activeView = "all";
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === "all"));
  render();
}
document.getElementById("search-button").addEventListener("click", runSearch);
searchInput.addEventListener("input", runSearch);
document.querySelector(".query-chip").addEventListener("click", () => {
  searchInput.value = "key ideas biology notes";
  runSearch();
});
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", event => {
  if (event.target.id === "modal-backdrop") closeModal();
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") closeModal();
});
let dragDepth = 0;
const dropOverlay = document.createElement("div");
dropOverlay.className = "drop-overlay";
dropOverlay.textContent = "Drop your documents to add them";
document.body.appendChild(dropOverlay);
document.addEventListener("dragenter", event => {
  if (![...event.dataTransfer.types].includes("Files")) return;
  event.preventDefault();
  dragDepth += 1;
  dropOverlay.classList.add("active");
});
document.addEventListener("dragleave", event => {
  event.preventDefault();
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) dropOverlay.classList.remove("active");
});
document.addEventListener("dragover", event => event.preventDefault());
document.addEventListener("drop", event => {
  event.preventDefault();
  dragDepth = 0;
  dropOverlay.classList.remove("active");
  if (event.dataTransfer.files.length) importFiles([...event.dataTransfer.files]);
});
document.getElementById("sort-button").addEventListener("click", () => {
  documents.reverse();
  render();
  showToast("Document order updated.");
});
render();
