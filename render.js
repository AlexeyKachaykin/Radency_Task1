// Render Notes
function renderNotes(notes) {
    const notesGrid = document.getElementById('notes');
    notesGrid.innerHTML = '';

    const notesHeader = document.createElement('div');
    notesHeader.classList.add('note-header');
    notesHeader.innerHTML = `
    <div>Name</div>
    <div>Created</div>
    <div>Category</div>
    <div>Content</div>
    <div>Dates</div>
    <div class="note-actions">
      <span class="edit-icon"></span>
      <span class="archive-icon"></span>
      <span class="delete-icon"></span>
    </div>
  `;
    notesGrid.appendChild(notesHeader);

    notes.forEach((note) => {
        const noteEl = generateNoteHTML(note);
        notesGrid.appendChild(noteEl);
    });

}

// Render Summary
function renderSummary(activeNotes, archivedNotes) {
    const summaryGrid = document.getElementById('summary');
    summaryGrid.innerHTML = '';

    const summaryHeader = document.createElement('div');
    summaryHeader.classList.add('summary-header');
    summaryHeader.innerHTML = `
    <div>Notes Category</div>
    <div>Active</div>
    <div>Archived</div>
  `;
    summaryGrid.appendChild(summaryHeader);

    const categories = ['Task', 'Random Thought', 'Idea'];
    categories.forEach((category) => {
        const activeCount = activeNotes.filter((note) => note.category === category).length;
        const archivedCount = archivedNotes.filter((note) => note.category === category && note.archived).length;

        const summaryRow = document.createElement('div');
        summaryRow.classList.add('summary-row');
        summaryRow.innerHTML = `
      <div>${category}</div>
      <div>${activeCount}</div>
      <div>${archivedCount}</div>
    `;
        summaryGrid.appendChild(summaryRow);
    });
}

// Generate Note HTML
function generateNoteHTML(note) {
    const div = document.createElement('div');
    div.classList.add('note');
    const createdDate = new Date(note.created);
    const createdDateString = createdDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    div.innerHTML = `
    <div>${note.name}</div>
    <div>${createdDateString}</div>
    <div>${note.category}</div>
    <div>${note.content}</div>
    <div>${getDatesFromContent(note.content).join(', ')}</div>
    <div class="note-actions">
        <span class="edit-icon" data-id="${note.id}"></span>
        <span class="archive-icon" data-id="${note.id}"></span>
        <span class="delete-icon" data-id="${note.id}"></span>
    </div>
  `;

    return div;
}

// Get Dates from Note Content
function getDatesFromContent(content) {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    return content.match(dateRegex) || [];
}

export { renderNotes, renderSummary };
