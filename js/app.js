import {getWord, checkWord} from './word-list.js'


/*-------------------------------- Constants --------------------------------*/
const allowableLetters = "abcdefghijklmnopqrstuvwxyz"


/*---------------------------- Variables (state) ----------------------------*/
let secretWord, guessedWord, currentRow, currentLetter


/*------------------------ Cached Element References ------------------------*/
const inputKeys = document.querySelector('section#keys')
const wordRows = document.querySelectorAll('div.word')
const diffEl = document.querySelector('section#difficulty')
const gameEl = document.querySelector('main')
const keyEl = document.querySelector('section#keys')
const titleEl = document.getElementById('title')
const messageEl = document.getElementById('message')

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

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Backspace') {
    if (currentLetter > 0) {
      handleDeleteLetter()
    }
  } else if (evt.key === 'Enter' && currentLetter === 5) {
    handleGuessWord()
  } else if (currentLetter < 5 && allowableLetters.includes(evt.key)){
    renderLetter(evt.key)
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
  messageEl.textContent = 'Pick a difficulty:'
  currentRow = 0
  currentLetter = 0
  guessedWord = []
}

function selectDifficulty(level) {
  init()
  diffEl.setAttribute('hidden', true)
  keyEl.removeAttribute('hidden')
  gameEl.removeAttribute('hidden')
  titleEl.removeAttribute('hidden')
  secretWord = getWord(level).toUpperCase().split('')
  console.log(secretWord)
}

function handleDeleteLetter() {
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
    wordRows[currentRow].classList.remove('animate__animated', 'animate__shakeX')
    setTimeout (() => {
      wordRows[currentRow].classList.add('animate__animated', 'animate__shakeX')
    }, 300)
    console.log('word does not exist')
  }
}

function renderLetter(letter) {
  console.log(letter + ' pressed')
  wordRows[currentRow].children[currentLetter].textContent = letter.toUpperCase()
  guessedWord.push(letter.toUpperCase())
  currentLetter += 1
  console.log(guessedWord)
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
  if (lettersRemaining.every(val => val === null)) {
    renderWin(currentRow + 1)
  } else {
    currentRow += 1
    currentLetter = 0
  }
}

function renderWin(numTries) {
  setTimeout(() => {
    diffEl.removeAttribute('hidden')
    messageEl.textContent = `You got it in ${numTries}!  Play again?`
    title.setAttribute('hidden', true)
  }, (6*725))
}

function resetTiles() {
  wordRows.forEach((row, idx) => {
    for (let i = 0; i < 5; i ++) {
      row.children[i].textContent = ''
      row.children[i].className = ''
    }
  })
}