import {getWord, checkWord} from './word-list.js'


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let secretWord, guessedWord, currentRow, currentLetter


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
    if (currentLetter > 0) {
      handleDeleteLetter(evt.target.id)
    }
  } else if (evt.target.id === 'enter' && currentLetter === 5) {
    handleGuessWord()
  } else if (evt.target.id === 'reset') {
    init()
  } else if (currentLetter < 5 && evt.target.id.length === 1){
    renderLetter(evt.target.id)
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
  guessedWord = []
  render()
}

function selectDifficulty(level) {
  diffEl.setAttribute('hidden', true)
  keyEl.removeAttribute('hidden')
  gameEl.removeAttribute('hidden')
  titleEl.removeAttribute('hidden')
  secretWord = getWord(level).toUpperCase().split('')
  console.log(secretWord)
}

function handleDeleteLetter(letter) {
  console.log(letter + ' deleted')
  guessedWord.pop()
  currentLetter -= 1
  wordRows[currentRow].children[currentLetter].textContent = ''
}

function handleGuessWord() {
  console.log('guess word')
  let wordToCheck = guessedWord.join('').toLowerCase()
  console.log(wordToCheck)
  if (checkWord(wordToCheck)) {
    console.log('word exists')
    renderGuess()
    guessedWord = []
  } else {
    // shake animation
    console.log('word does not exist')
  }
}

function renderLetter(letter) {
  console.log(letter + ' pressed')
  wordRows[currentRow].children[currentLetter].textContent = letter.toUpperCase()
  guessedWord.push(letter.toUpperCase())
  currentLetter += 1
  console.log(guessedWord)
  // If current guess.length < 5
    // add character to current word
    // renderLetter()
}

function renderGuess() {
  console.log(guessedWord)
  let lettersRemaining = [...secretWord]
  let flipTimeout = 750
  guessedWord.forEach((letter, idx) => {
    let guessEl = wordRows[currentRow].children[idx]
    if (secretWord[idx] === guessedWord[idx]) {
      setTimeout(()=> {
        guessEl.classList.add('right-place', 'animate__animated', 'animate__flipInY')
      }, flipTimeout * idx)
      lettersRemaining[idx] = null      
    } 
  })
  console.log(lettersRemaining)
  guessedWord.forEach((letter, idx) => {
    let guessEl = wordRows[currentRow].children[idx]
    if (lettersRemaining.includes(guessedWord[idx])) {
      setTimeout(()=> {
        guessEl.classList.add('wrong-place', 'animate__animated', 'animate__flipInY')
      }, flipTimeout * idx)
    } else {
      setTimeout(()=> {
        guessEl.classList.add('wrong-letter', 'animate__animated', 'animate__flipInY')
      }, flipTimeout * idx)
    } 
  })
  currentRow += 1
  currentLetter = 0
}

function render() {

}

function resetTiles() {
  wordRows.forEach((row, idx) => {
    for (let i = 0; i < 5; i ++) {
      row.children[i].textContent = ''
      row.children[i].className = ''
    }
  })
}