const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')
const yargCommands = {
  title: { describe: 'Title of note', demand: true, alias: 't' },
  body: { describe: 'Body of note', demand: true, alias: 'b' }
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: yargCommands.title,
    body: yargCommands.body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', { title: yargCommands.body })
  .command('remove', 'Remove a note', { title: yargCommands.title })
  .help().argv

let command = argv._[0]

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body)
  if (note) {
    notes.logNote(note)
  }
} else if (command === 'list') {
  const noteList = notes.getAll()
  console.log(`Printing ${noteList.length} note(s).`)
  noteList.forEach(note => notes.logNote(note))
} else if (command === 'read') {
  const note = notes.getNote(argv.title)
  if (note) {
    console.log(`Note found!`)
    notes.logNote(note)
  } else {
    console.log('Note not found!')
  }
} else if (command === 'remove') {
  notes.removeNote(argv.title)
} else {
  console.log('Command not recognized')
}
