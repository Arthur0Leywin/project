export default function Home() {
  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <a className="brand" href="#" aria-label="Recall home">
            <span className="brand-mark"><span></span><span></span><span></span></span>
            <span>recall<span className="brand-period">.</span></span>
          </a>

          <button className="workspace-switcher">
            <span className="workspace-avatar">S</span>
            <span className="workspace-copy"><strong>Study space</strong><small>Personal workspace</small></span>
            <span className="chevron">⌄</span>
          </button>

          <div className="side-label">WORKSPACE</div>
          <nav className="main-nav" aria-label="Main navigation">
            <button className="nav-item active" data-view="all"><span className="nav-icon">▦</span> All documents <span className="nav-count" id="all-count">0</span></button>
            <button className="nav-item" data-view="starred"><span className="nav-icon">☆</span> Starred</button>
            <button className="nav-item" data-view="recent"><span className="nav-icon">◷</span> Recently added</button>
          </nav>

          <div className="side-label subject-label">SUBJECTS <button id="add-subject" className="tiny-add" aria-label="Add subject">+</button></div>
          <nav className="subject-nav" id="subject-nav" aria-label="Subjects"></nav>

          <div className="storage-card">
            <div className="storage-heading"><span>Storage</span><span id="storage-text">0 MB of 500 MB</span></div>
            <div className="storage-track"><span id="storage-fill"></span></div>
            <p>Your study library is looking good.</p>
            <button id="upload-sidebar" className="storage-upload">↑ &nbsp; Upload a document</button>
          </div>
          <div className="sidebar-bottom"><span className="avatar">J</span><span><strong>Jamie Parker</strong><small>Free plan</small></span><button aria-label="More account options">···</button></div>
        </aside>

        <main className="main-area">
          <header className="topbar">
            <div className="breadcrumbs"><span>Study space</span><span className="crumb-slash">/</span><strong id="breadcrumb-current">All documents</strong></div>
            <div className="topbar-actions"><button className="help-button" title="Help">?</button><span className="top-avatar">J</span></div>
          </header>

          <section className="content">
            <div className="welcome-row">
              <div>
                <p className="eyebrow"><span className="sparkle">✳</span> YOUR SECOND BRAIN FOR STUDYING</p>
                <h1 id="page-title">Everything in its <span>right place.</span></h1>
                <p className="welcome-subtitle">Your notes, readings, and assignments — organized and ready when you need them.</p>
              </div>
              <button className="primary-button" id="upload-main"><span>＋</span> Add documents</button>
            </div>

            <section className="search-panel" aria-label="Search documents">
              <div className="search-icon">⌕</div>
              <input id="search-input" type="search" placeholder="Ask anything or search your documents..." autoComplete="off" />
              <kbd>⌘ K</kbd>
              <button id="search-button" className="search-submit">Search <span>↗</span></button>
              <div className="search-suggestions"><span className="suggestion-sparkle">✦</span> Try <button className="query-chip">“What are the key ideas in my biology notes?”</button></div>
            </section>

            <div className="section-toolbar">
              <div className="section-title-wrap"><h2 id="list-heading">Your documents</h2><span className="document-total" id="document-total">0</span></div>
              <div className="toolbar-right">
                <button className="sort-button" id="sort-button"><span>☷</span> Recently added <span className="sort-chevron">⌄</span></button>
                <div className="view-toggle"><button className="view-button selected" data-layout="grid" aria-label="Grid view">▦</button><button className="view-button" data-layout="list" aria-label="List view">☰</button></div>
              </div>
            </div>

            <div className="document-grid" id="document-grid"></div>
            <div className="empty-state hidden" id="empty-state">
              <div className="empty-icon">✳</div>
              <h3 id="empty-title">Your study space starts here</h3>
              <p id="empty-copy">Drop in your notes, lecture slides, or readings. We’ll help you make sense of it all.</p>
              <button className="primary-button" id="empty-upload">＋ Add your first document</button>
            </div>
            <div className="search-answer hidden" id="search-answer"></div>
            <footer className="content-footer"><span>Made for curious minds <span className="footer-heart">♥</span></span><span>Everything you need to remember, in one place.</span></footer>
          </section>
        </main>
      </div>

      <input id="file-input" type="file" accept=".pdf,.txt,.md,.doc,.docx,.csv" multiple hidden />
      <div className="toast" id="toast" role="status"></div>
      <div className="modal-backdrop hidden" id="modal-backdrop">
        <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          <button className="modal-close" id="modal-close" aria-label="Close document">×</button>
          <div id="detail-content"></div>
        </section>
      </div>
    </>
  );
}
