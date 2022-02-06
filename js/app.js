import {getWord, checkWord} from './word-list.js'


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let word, currentRow, currentLetter


/*------------------------ Cached Element References ------------------------*/
const inputKeys = document.querySelector('section#keys')
const wordRows = document.querySelectorAll('div.word')
const diffEl = document.querySelector('section#difficulty')
const gameEl = document.querySelector('main')
const keyEl = document.querySelector('section#keys')
const titleEl = document.getElementById('title')
const resetBtn = document.getElementById('reset')

/*----------------------------- Event Listeners -----------------------------*/
diffEl.addEventListener('click', (evt) => {
  if (evt.target.id.length === 4) {
    selectDifficulty(parseInt(evt.target.id.replace('lvl', '')))
  }
})

inputKeys.addEventListener('click', (evt) => {
  if (evt.target.id === 'del') {
    handleDeleteLetter(evt.target.id)
  } else if (evt.target.id === 'enter') {
    handleGuessWord()
  } else if (evt.target.id === 'reset') {
    init()
  } else {
    handleSelectLetter(evt.target.id)
  }
})


/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  resetTiles()
  diffEl.removeAttribute('hidden')
  keyEl.setAttribute('hidden', true)
  gameEl.setAttribute('hidden', true)
  title.setAttribute('hidden', true)
  currentRow = 0
  currentLetter = 0
  render()
}

function selectDifficulty(level) {
  diffEl.setAttribute('hidden', true)
  keyEl.removeAttribute('hidden')
  gameEl.removeAttribute('hidden')
  titleEl.removeAttribute('hidden')
  word = getWord(level)
  console.log(word)
}

function handleDeleteLetter(letter) {
  console.log(letter + ' deleted')
  currentLetter -= 1
  wordRows[currentRow].children[currentLetter].textContent = ''

  // If current guess.length
    // remove last character
    // render letter
}

function handleGuessWord() {
  console.log('guess word')
  // if current guess length is 5
  // check word for match
  // check if word exists
  // renderWord()
}

function handleSelectLetter(letter) {
  console.log(letter + ' pressed')
  wordRows[currentRow].children[currentLetter].textContent = letter.toUpperCase()
  currentLetter += 1
  // If current guess.length < 5
    // add character to current word
    // renderLetter()
}


function renderLetter(letter) {
  console.log(letter + ' to be rendered')
  // Change textContent of element to letter
}

function renderWord() {
  // Flip the letters and add styling based on status
    // Letter is in the correct position (right-place)
    // Letter is in the wrong position (wrong-place)
    // Letter is not in the word (wrong-letter)
}

function render() {

}

function resetTiles() {
  wordRows.forEach((row, idx) => {
    for (let i = 0; i < 5; i ++) {
      row.children[i].textContent = ''
    }
  })
}