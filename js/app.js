import {getWord, checkWord} from './word-list.js'


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let word, currentRow


/*------------------------ Cached Element References ------------------------*/
const letterKeys = document.querySelectorAll('div.keys > button')
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

resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  diffEl.removeAttribute('hidden')
  keyEl.setAttribute('hidden', true)
  gameEl.setAttribute('hidden', true)
  title.setAttribute('hidden', true)
  render()
}

function selectDifficulty(level) {
  diffEl.setAttribute('hidden', true)
  keyEl.removeAttribute('hidden')
  gameEl.removeAttribute('hidden')
  titleEl.removeAttribute('hidden')
  word = getWord(level)
}

function render() {
  
}