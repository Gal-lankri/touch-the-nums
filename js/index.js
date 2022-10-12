"use strict"
const EASY_LEVEL_TABLE = 16
const HURD_LEVEL_TABLE = 25
const EXTREME_LEVEL_TABLE = 36

var gTableCells = []
var gShuffledNumsArr = []
var gPrevCellNum = 0
var currLevel

var milliseconds = 0
var seconds = 0
var minutes = 0
var gInterval

function resetTableNums(level) {
  for (var i = 0; i < level; i++) {
    gTableCells[i] = i + 1
  }
}

function shuffleCellsNums(level) {
  for (var i = 0; i < level; i++) {
    var randomNum = getRandomIntInclusive(0, gTableCells.length - 1)
    var currNum = gTableCells.splice(randomNum, 1)[0]
    gShuffledNumsArr.push(currNum)
  }
}

function intGame() {
  document.querySelector("h2").innerHTML = ''
  const EL_TD = document.querySelectorAll("td")
  for (var i = 0; i < EL_TD.length; i++) {
    EL_TD[i].classList.remove("td-none")
  }
  clearInterval(gInterval)
  milliseconds = "00"
  seconds = "00"
  minutes = "00:"
  var elMilliseconds = document.querySelector(".milliseconds")
  var elSeconds = document.querySelector(".seconds")
  var elMinutes = document.querySelector(".minuts")
  elMilliseconds.innerHTML = milliseconds
  elSeconds.innerHTML = seconds
  elMinutes.innerHTML = minutes
}

function renderTable(level) {
  var colCount
  if (level === EASY_LEVEL_TABLE) colCount = 4
  if (level === HURD_LEVEL_TABLE) colCount = 5
  if (level === EXTREME_LEVEL_TABLE) colCount = 6
  var strHTML = ""
  for (var i = 0; i < gShuffledNumsArr.length; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < colCount; j++) {
      var currNum = gShuffledNumsArr.pop()
      strHTML += `\n <td onclick="cellClicked(this, ${currNum})">${currNum}</td>`
    }
    strHTML += `</tr>`
  }
  var elTable = document.querySelector("tbody")
  elTable.innerHTML = strHTML
}

function cellClicked(elCell, clickedNum) { // using inner text with 'this'. insted of  'clickedNum'
  if (clickedNum === 1) {
    clearInterval(gInterval)
    gInterval = setInterval(startTimer, 10)

    elCell.classList.add("td-none")
    gPrevCellNum = clickedNum              // using 'gNextNum++' insted 'gPrevNum'
  } else if (gPrevCellNum === clickedNum - 1) {
    elCell.classList.add("td-none")
    gPrevCellNum = clickedNum
  }
  endGame() // gLEVEL global ? using if
}

function chooseLevel(level) {
  currLevel = level
  document.querySelector(".reset-btn").style.display = "block"
  resetTableNums(level)
  shuffleCellsNums(level)
  renderTable(level)
}

function endGame() {
  if (gPrevCellNum === 16 && currLevel === EASY_LEVEL_TABLE) {
    clearInterval(gInterval)
    document.querySelector("h2").innerHTML = "You Win !"
  } else if (gPrevCellNum === 25 && currLevel === HURD_LEVEL_TABLE) {
    clearInterval(gInterval)
    document.querySelector("h2").innerHTML = "You Win !"
  } else if (gPrevCellNum === 36 && currLevel === EASY_LEVEL_TABLE) {
    clearInterval(gInterval)
    document.querySelector("h2").innerHTML = "You Win !"
  }
}

function startTimer() { // mybe short
  var elMilliseconds = document.querySelector(".milliseconds")
  var elSeconds = document.querySelector(".seconds")
  var elMinutes = document.querySelector(".minuts")

  milliseconds++

  if (milliseconds <= 9) elMilliseconds.innerHTML = "0" + milliseconds
  if (milliseconds > 9) elMilliseconds.innerHTML = milliseconds
  if (milliseconds > 99) {
    console.log("seconds")
    seconds++
    elSeconds.innerHTML = "0" + seconds
    milliseconds = 0
    elMilliseconds.innerHTML = "0" + 0
  }
  if (seconds > 9) elSeconds.innerHTML = seconds

  if (seconds === 60) {
    seconds = 0
    minutes++
    elMinutes.innerHTML = "0" + minutes + ":"
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
