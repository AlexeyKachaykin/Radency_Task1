let notes = [];

function addNote(newNote) {
    notes.push(newNote);
}

function editNote(id, updatedNote) {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNote };
    }
}

function archiveNote(id) {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes[index].archived = true;
    }
    
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
}

function getNotes() {
    return notes;
}

export { addNote, editNote, archiveNote, deleteNote, getNotes };
