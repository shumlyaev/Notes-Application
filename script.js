let notes = {};
let $saveChanges = $('#saveChanges');
let editedNoteIndex;
let currentNoteIndex = 0;

$(document).ready(function() {
    $('#addNoteButton').on('click', showAddModal);
    $('.resetNoteForm').on('click', resetNoteForm);
    $('body').on('click', '.editNoteButton', showEditModal);
    $('body').on('click', '.deleteNoteButton', showDeleteModal);
    $('#confirmDeleteButton').on('click', deleteNote);
    $('body').on('click', '.addNote', addNote);
    $('body').on('click', '.editNote', editNote);
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));
        for (let key in notes) {
            $('.notesPanel').append('<div class="col-lg-4 noteCard" data="' + key + '"><div class="card"><div class="card-body"><h5 class="card-title">' + notes[key]['noteTitle'] + '</h5><p class="card-text">' + notes[key]['noteText'] + '</p><button type="button" class="btn btn-primary editNoteButton"  data="' + key + '">Edit</button><button type="button" class="btn btn-secondary deleteNoteButton" data="' + key + '">Delete</button></div></div></div>');
        }
        for (let key in notes) {
            if (key > currentNoteIndex) currentNoteIndex = key;
        }
        currentNoteIndex++;
    }
});

function addNote() {
    let data = $('#noteForm').serializeArray();
    let noteData = {};
    for (let key in data) {
        noteData[data[key]['name']] = data[key]['value'];
    }
    notes[currentNoteIndex] = noteData;
    $('.notesPanel').append('<div class="col-lg-4 noteCard" data="' + currentNoteIndex + '"><div class="card"><div class="card-body"><h5 class="card-title">' + noteData['noteTitle'] + '</h5><p class="card-text">' + noteData['noteText'] + '</p><button type="button" class="btn btn-primary editNoteButton"  data="' + currentNoteIndex + '">Edit</button><button type="button" class="btn btn-secondary deleteNoteButton" data="' + currentNoteIndex + '">Delete</button></div></div></div>');
    $('#noteModal').modal('hide');
    $('#noteForm').trigger("reset");
    currentNoteIndex++;
    localStorage.setItem('notes', JSON.stringify(notes));
}

function editNote() {
    $('.noteCard[data=' + editedNoteIndex + '] .card-title').html($('#inputNoteTitle').val());
    notes[editedNoteIndex]['noteTitle'] = $('#inputNoteTitle').val();
    $('.noteCard[data=' + editedNoteIndex + '] .card-text').html($('#inputNoteText').val());
    notes[editedNoteIndex]['noteText'] = $('#inputNoteText').val();
    $('#noteModal').modal('hide');
    $('#noteForm').trigger("reset");
    localStorage.setItem('notes', JSON.stringify(notes));
}
function deleteNote() {
    $('.noteCard[data=' + editedNoteIndex + ']').remove();
    delete notes[editedNoteIndex];
    localStorage.setItem('notes', JSON.stringify(notes));
    $('#confirmDeleteModal').modal('hide');
}

function showAddModal() {
    $('#noteModalHeader').html('Create note');
    $saveChanges.html('Create note');
    if ($saveChanges.hasClass('editNote')) $saveChanges.removeClass('editNote');
    $saveChanges.addClass('addNote');
    $('#noteModal').modal('show');
}
function showEditModal() {
    $('#noteModalHeader').html('Edit note');
    $saveChanges.html('Save changes');
    if ($saveChanges.hasClass('addNote')) $saveChanges.removeClass('addNote');
    $saveChanges.addClass('editNote');
    editedNoteIndex = $(this).attr('data');
    $('#inputNoteTitle').val(notes[editedNoteIndex]['noteTitle']);
    $('#inputNoteText').val(notes[editedNoteIndex]['noteText']);
    $('#noteModal').modal('show');
}
function showDeleteModal() {
    editedNoteIndex = $(this).attr('data');
    $('#confirmDeleteModal').modal('show');
}
function resetNoteForm() {
    $('#noteForm').trigger("reset");
}

/*
                                                <div class="col-lg-4 noteCard">
                                                        <div class="card">
                                                                <div class="card-body">
                                                                        <h5 class="card-title">Card title</h5>
                                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                                        <a href="#" class="btn btn-primary">Edit</a>
                                                                        <a href="#" class="btn btn-secondary">Delete</a>
                                                                </div>
                                                        </div>
                                                </div>*/