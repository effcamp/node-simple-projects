const fs = require('fs')

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}
const fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes-data.json'))
  } catch (error) {
    return []
  }
}

const addNote = (title, body) => {
  const notes = fetchNotes()
  const note = {
    title,
    body
  }

  duplicateNotes = notes.filter(note => note.title === title)
  if (duplicateNotes.length === 0) {
    notes.push(note)
    saveNotes(notes)
    console.log(`Note created! `)
    return note
  } else {
    console.log('Note title taken')
  }
}

const getAll = () => {
  return fetchNotes()
}
const getNote = title => {
  notes = fetchNotes().filter(note => note.title === title)
  return notes[0]
}
const removeNote = title => {
  const notes = fetchNotes()
  const filteredNotes = notes.filter(note => note.title !== title)
  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes)
    console.log(`Note: '${title}' removed successfully!`)
  } else {
    console.log('Note with that name not found.')
  }
}

const logNote = note => {
  debugger
  console.log(`------------ \nTitle: ${note.title} \n Body: ${note.body}`)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
