document.addEventListener('DOMContentLoaded', init);

function init() {
  fetchNotes();
  fetchMelodies();
  onSubmitClick();
  onClearButtonClick();

  saveButton.addEventListener('click', function(event) {
    event.preventDefault();

    let melodyIdForPatch = event.target.id;
    // let titleForPatch = document.querySelector('#title-bar-value').value;
    let notesForPatch = noteArray.map(note => note.id);
    let patchData = {id: melodyIdForPatch, note_id_array: notesForPatch};

    updateSongFromDomToDatabase(patchData);
    noteCollection.innerHTML = "";
  })
}

//Global Variables
let noteArray = [];

let body = document.querySelector('body');

let noteBar = document.querySelector('.note-bar');
noteBar.className = "note-bar ui inverted segment";

let noteBarCard = document.createElement('div');
noteBarCard.className = "note-bar ui inverted secondary menu";

let melodyCollection = document.querySelector('.melody-collection');

let creationContainer = document.querySelector('.creation-container');

let noteCollection = document.querySelector('.note-collection');
noteCollection.className = "note-collection ui big horizontal divided list";


//Buttons
let clearButton = document.querySelector('.clear-button');
let submitButton = document.querySelector('.submit-button');
let saveButton = document.querySelector('.save-button');


// Fetch Functions
function fetchNotes() {
  fetch(`https://soundscribe-api.herokuapp.com/notes`)
  .then(res => res.json())
  .then(notes => notes.forEach(note => addToNoteBar(note)))
}

function fetchMelodies() {
  fetch(`https://soundscribe-api.herokuapp.com/melodies`)
  .then(res => res.json())
  .then(data => data.forEach(melody => addMelodyToDom(melody)))
}

function addSongTitleToDatabase() {
  let titleValue = document.getElementById('title-bar-value').value;
  let newSongTitle = {title: titleValue};
  fetch('https://soundscribe-api.herokuapp.com/songs', {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(newSongTitle)
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    addMelodyToDatabase(data.id);
  })
}

function addMelodyToDatabase(id) {
  let newNoteArrayFromNewMelody = {song_id: id, note_id_array: noteArray.map(note => note.id)};
  fetch('https://soundscribe-api.herokuapp.com/melodies', {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(newNoteArrayFromNewMelody)
  })
  .then(res => res.json())
  .then(data => addMelodyToDom(data))
}

function deleteCard(id) {
  let deleteCurrentSongCard = document.querySelector(`.song-card-${id}`);
  fetch(`https://soundscribe-api.herokuapp.com/melodies/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => deleteCurrentSongCard.remove())
}

function fetchIndividualMelody(cardDatasetInfo) {
  fetch(`https://soundscribe-api.herokuapp.com/melodies/${cardDatasetInfo.id}`)
  .then(res => res.json())
  .then(melodyData => editCard(melodyData))
}

function updateSongFromDomToDatabase(patchData, submitButton) {
  let melodyId = patchData.id;
  debugger
  fetch(`https://soundscribe-api.herokuapp.com/melodies/${melodyId}`, {
    method: "PATCH",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({note_id_array: patchData.note_id_array})
  })
  .then(res => res.json())
  .then(data => renderUpdatedSong(data))  //<--- Write Render function for UPDATE
}

function editCard(cardDatasetInfo) {
  // console.log(cardDatasetInfo);
  saveButton.id = cardDatasetInfo.id;
  // debugger

  document.querySelector('#make-a-melody-div').scrollIntoView();

  let songTitle = document.querySelector('#title-bar-value');
  songTitle.value = cardDatasetInfo.song.title;

  renderNoteCollection(cardDatasetInfo.notesArray);
  saveButton.classList.remove('hide');

  onSaveClick(cardDatasetInfo);
}

function onSaveClick(cardDatasetInfo) {
  console.log(cardDatasetInfo);

}


function onNoteClick(id) {
  fetch(`https://soundscribe-api.herokuapp.com/notes/${id}`)
  .then(res => res.json())
  .then(singleNote => {
    addNoteToArray(singleNote);
    renderNoteCollection(noteArray.map(note => note.name));
    // playAudio()
  })
}

function onSubmitClick() {
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    validateData();
    addSongTitleToDatabase();
    noteCollection.innerHTML = "";

  })
}

//Create New Song - Validation Checks, Fetch POST functions, Render New Song to addMelodyToDom() func.
function validateTitle() {
  let titleValue = document.getElementById('title-bar-value').value;
  if (titleValue.length === 0) {
    alert("Missing Title")
  }
}

function validateMelody() {
  let notationValue = document.getElementsByClassName('new-notation-pattern item');
  if (notationValue.length === 0) {
    alert("You kind of need notes to make a Melody...")
  }
}

function validateData() {
  validateTitle();
  validateMelody();
}

function onClearButtonClick() {
  clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    noteArray = [];
    noteCollection.innerText = "";
    // onClearButtonClick();
  })
}


// Render Functions
function addNoteToArray(singleNote) {
  noteCollection.innerHTML = "";
  noteArray.push(singleNote);
}

function renderNoteCollection(noteLettersArray) {
  // console.log(noteLettersArray)
  let noteCard = document.createElement('div');
  noteCard.className = "new-notation-pattern item";
  noteCard.innerText = noteLettersArray;

  noteCollection.innerHTML = ""
  noteCollection.appendChild(noteCard);
}

function addToNoteBar(note) {

  let noteName = document.createElement('a');
  noteName.className = `note-${note.id} item `;
  noteName.innerText = note.name;
  noteName.dataset.id = note.id;
  noteName.dataset.name = note.name;

  noteName.addEventListener('click', function (event) {
    event.preventDefault();
    let noteNameClicked = event.target.dataset.name;
    let audio = document.querySelector(`#${noteNameClicked}-Note`);
    audio.play()
    onNoteClick(event.target.dataset.id)
  })

  noteBarCard.appendChild(noteName);
  noteBar.appendChild(noteBarCard);
}

function addMelodyToDom(melody) {
  // console.log(melody)

  let songCard = document.createElement('div');
  songCard.className = `song-card-${melody.id} card four wide column`;
  songCard.dataset.id = melody.id;

  let songContent = document.createElement('div');
  songContent.className = "content";

  let songName = document.createElement('h4');
  songName.className = "song-name header";
  songName.innerText = melody.song.title;

  let noteSequence = document.createElement('h5');
  noteSequence.className="meta";
  noteSequence.innerText = "Notation";

  let songNotes = document.createElement('span');
  songNotes.id = `song-notes-${melody.id}`;
  songNotes.className = "song-notes description";
  songNotes.innerText = melody.notesArray;


  let deleteButton = document.createElement('button');
  deleteButton.className = "delete-button ui inverted red button";
  deleteButton.innerText = "Delete";
  deleteButton.dataset.id = melody.id;
  deleteButton.addEventListener('click', function(event) {
    deleteCard(event.target.dataset.id);
  })

  let editButton = document.createElement('button');
  editButton.className = "edit=button ui inverted secondary button";
  editButton.innerText = "Edit";
  editButton.dataset.id = melody.id;
  editButton.dataset.songId = melody.song.id;
  editButton.dataset.songTitle = melody.song.title;
  editButton.dataset.notation = melody.notesArray;

  editButton.addEventListener('click', function(event) {
    fetchIndividualMelody(event.target.dataset);
    noteCollection.innerHTML = "";
  })

  songContent.appendChild(songName);
  songContent.appendChild(noteSequence);
  songContent.appendChild(songNotes);
  songCard.appendChild(songContent);
  songCard.appendChild(deleteButton);
  songCard.appendChild(editButton);
  melodyCollection.appendChild(songCard);
}

function renderUpdatedSong(newSongData) {
  console.log('In renderUpdatedSong function')
  console.log(newSongData)
  document.querySelector(`.song-card-${newSongData.id}`).scrollIntoView();

  let newNotation = document.querySelector(`#song-notes-${newSongData.id}`)
  newNotation.innerText = newSongData.notesArray

}
