// app.js

import { renderNotes, renderSummary } from './render.js';

// Initial Notes
let notes = [];

// Load Initial Notes
const initialNotes = [
    {
        id: 1,
        name: 'Note 1',
        created: new Date('2023-07-30'),
        category: 'Task',
        content: 'This is Task note with a date 07/30/2023.',
        archived: false,
    },
    {
        id: 2,
        name: 'Note 2',
        created: new Date('2023-07-29'),
        category: 'Random Thought',
        content: 'This is a random thought for 07/29/2023 and another date 08/05/2023.',
        archived: false,
    },
    {
        id: 3,
        name: 'Note 3',
        created: new Date('2023-07-28'),
        category: 'Idea',
        content: 'I have an idea for 07/28/2023.',
        archived: true,
    },
];

// Load Initial Notes
initialNotes.forEach((note) => addNote(note));
updateNotesAndSummary();

// Create Note Button
const addNoteBtn = document.getElementById('add-note-btn');
if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const noteForm = document.getElementById('note-form');
        modal.style.display = 'block';
        noteForm.reset();
        noteForm.removeAttribute('data-id');
    });
}

// Save Note Form
const noteForm = document.getElementById('note-form');
const saveNoteBtn = noteForm.querySelector('button[type="submit"]');
if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveNote();
    });
}

// Save Note Function
function saveNote() {
    const noteId = noteForm.dataset.id;
   
    const noteName = document.getElementById('note-name').value;
    const noteCategory = document.getElementById('note-category').value;
    const noteContent = document.getElementById('note-content').value;

    if (noteId) {
        // Editing existing note
        editNote(+noteId, {
            name: noteName,
            category: noteCategory,
            content: noteContent,
        });
    } else {
        // Adding new note
        addNote({
            id: Date.now(),
            name: noteName,
            created: new Date(),
            category: noteCategory,
            content: noteContent,
            archived: false,
        });
    }

    closeModal();
    updateNotesAndSummary();
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Update Notes and Summary
function updateNotesAndSummary() {
    const activeNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);
    renderNotes(activeNotes);
    renderSummary(activeNotes, archivedNotes);
}

// Edit Note
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-icon')) {
        const noteId = e.target.dataset.id;
        const note = notes.find((note) => note.id === +noteId);

        if (note) {
            const modal = document.getElementById('modal');
            const noteForm = document.getElementById('note-form');
            modal.style.display = 'block';
            noteForm.dataset.id = note.id;
            document.getElementById('note-name').value = note.name;
            document.getElementById('note-category').value = note.category;
            document.getElementById('note-content').value = note.content;
        }
    }
});


document.addEventListener('click', (e) => {
    if ( e.target.classList.contains('unarchive-icon')) {
        const noteId = e.target.dataset.id;
        const isArchived = e.target.classList.contains('unarchive-icon');
        archiveUnarchiveNote(+noteId, !isArchived);
        updateNotesAndSummary();
        showArchivedNotes();
    }
});
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('archive-icon') ) {
        const noteId = e.target.dataset.id;
        const isArchived = e.target.classList.contains('archive-icon');
        archiveUnarchiveNote(+noteId, isArchived);
        updateNotesAndSummary();
    }
});
// Delete Note
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-icon')) {
        const noteId = e.target.dataset.id;
        deleteNote(+noteId);
        updateNotesAndSummary();
    }
});

// Close Modal on Click Outside
const modal = document.getElementById('modal');
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Load Initial Notes
function addNote(newNote) {
    notes.push(newNote);
}

function editNote(id, updatedNote) {
    console.log(id)
    const index = notes.findIndex((note) => note.id === id);
    console.log(index)
    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNote };
    }
}

function archiveUnarchiveNote(id, isArchived) {
    const index = notes.findIndex((note) => note.id === id);
    console.log(id)
    if (index !== -1) {
        notes[index].archived = isArchived;
    }
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
}

function getDatesFromContent(content) {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    return content.match(dateRegex) || [];
}

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
        <span class="${note.archived ?"":"edit-icon"}" data-id="${note.id}"></span>
        <span class="${note.archived ? 'unarchive-icon' : 'archive-icon'}" data-id="${note.id}"></span>
        <span class="${note.archived ? "" : "delete-icon"}"  data-id="${note.id}"></span>
    </div>
  `;

    return div;
}

const viewArchivedBtn = document.getElementById('view-archived-btn');
if (viewArchivedBtn) {
    viewArchivedBtn.addEventListener('click', () => {
        const archivedModal = document.getElementById('archived-modal');
        const archivedNotes = notes.filter((note) => note.archived);
        if (archivedNotes.length>0) {
            archivedModal.style.display = 'block';

            showArchivedNotes();
        }
     
    });
}

// Function to show Archived Notes in the Modal
function showArchivedNotes() {
    const archivedNotes = notes.filter((note) => note.archived);

      renderArchivedNotes(archivedNotes);  

   
}

// Function to render Archived Notes in the Modal
function renderArchivedNotes(archivedNotes) {
    const archivedNotesGrid = document.getElementById('archived-notes');
    archivedNotesGrid.innerHTML = '';

    archivedNotes.forEach((note) => {
        const archivedNoteEl = generateNoteHTML(note);
        archivedNotesGrid.appendChild(archivedNoteEl);
    });
}

// Close Archived Notes Modal
const archivedModal = document.getElementById('archived-modal');
const archivedModalClose = archivedModal.querySelector('.close');
archivedModalClose.addEventListener('click', () => {
    archivedModal.style.display = 'none';
});
