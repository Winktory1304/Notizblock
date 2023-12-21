let notes = [];
let trashes = [];
load();


function pushArray() { // der input aus der Textarea wird ins Array gepusht
    const note = document.getElementById('inputNote').value;
    if (note.length == '') { // Es wird kontrolliert ob der Wert note gleich null ist
        alert('Bitte Notiz eintragen')
    }
    else {
        notes.push(note);
        document.getElementById('inputNote').value = ''; //Input wird auf Wert leer gesetzt
        save();
        render();
    }
}


function render() {
    trashrender();
    document.getElementById('content').innerHTML = ''; // Die vorhandenen Notizen werden gelöscht (dadurch werden keine doppelten Notizen angezeigt)
    for (let i = 0; i < notes.length; i++) {
        let nr = (i + 1)
        document.getElementById('content').innerHTML += `
        <div class="noteContent"> 
        <h1>Notiz Nr. ${[nr]}</h1> 
        <p class="noteText">${notes[i]}</p>
        <button class="NoteDeleteButton" onclick="noteDelete(${i})">Löschen</button>
        </div >`;

    }
}
function trashrender() {
    document.getElementById('deletetNotes').innerHTML = ''; // Die vorhandenen Notizen werden gelöscht (dadurch werden keine doppelten Notizen angezeigt)
    for (let i = 0; i < trashes.length; i++) {
        let nr = (i + 1)
        document.getElementById('deletetNotes').innerHTML += `
        <div class="trashContent"> 
        <h1>Notiz Nr. ${[nr]}</h1> 
        <p class="trashText">${trashes[i]}</p>
        <button class="recoverButton" onclick="recoverNote(${i})">Widerherstellen</button>  
        <button class="trashDeleteButton" onclick="trashDelete(${i})">Löschen</button>
        </div >`;
    }
}


function deleteButton() {
    document.getElementById('inputNote').addEventListener('input', deleteButton); //es wird nach jeder Textarea eingabe geprüft ob sich der Wert verändert
    const note = document.getElementById('inputNote').value;
    if (note.length == '') {
        document.getElementById('deleteButton').innerHTML = `Schließen`
    }
    else {
        document.getElementById('deleteButton').innerHTML = `Löschen`
    }
}


function save() {
    let notesAstext = JSON.stringify(notes); //Array wird in Text umgewandelt
    let trashesAstext = JSON.stringify(trashes);
    localStorage.setItem('notes', notesAstext);//der Text aus namesAstext wird in den Local Storage unter dem Key names gespeichert
    localStorage.setItem('trashes', trashesAstext);//der Text aus trashesAstext wird in den Local Storage unter dem Key trashes gespeichert

}


function load() {
    let notesAstext = localStorage.getItem('notes'); // names wird aus dem Local Storage geholt und in die Variable namesAstext gespeichert
    let trashesAstext = localStorage.getItem('trashes'); // names wird aus dem Local Storage geholt und in die Variable namesAstext gespeichert
    if (notesAstext && trashesAstext) {
        notes = JSON.parse(notesAstext); //Text(namesAstext) wird in ein Array umgewandelt
        trashes = JSON.parse(trashesAstext); //Text(namesAstext) wird in ein Array umgewandelt
    }
}


function noteDelete(i) {
    let trash = notes[i] // das Array welches gelöscht wird, wird vorher in trash gespeichert und dann durch push ins Array trashes geladen
    trashes.push(trash);
    notes.splice(i, 1);
    save();
    render();
}


function recoverNote(i) { // Notiz wieder herstellen
    let recovery = trashes[i];
    notes.push(recovery);
    trashes.splice(i, 1);
    save();
    render();
}


function trashDelete(i) { // endgültig löschen
    trashes.splice(i, 1);
    save();
    render();
}


// function deleteAll() {
//     notes = [];
//     save();
//     render();
// }


function insertDnone(i) {  //lässt den Backgroundcontainer verschwinden
    document.getElementById('inputNote').value = '';
    document.getElementById(i).classList.add('d-none');
}


function removeDnone(i) {  //lässt den Backgroundcontainer erscheinen
    document.getElementById(i).classList.remove('d-none');
}
load();
