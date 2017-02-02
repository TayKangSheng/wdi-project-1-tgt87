document.addEventListener('DOMContentLoaded', function () {
// Draw 50 div to be use as grids for game board
  var board = document.getElementById('board')
  for (var i = 49; i >= 0; i--) {
    var div = document.createElement('div')
    div.setAttribute('data-num', i)
    div.textContent = i
    board.appendChild(div)
  }

  // Fixed player, treasure chest and monster starting position on the board
  var boy = document.getElementById('boy')
  var box2 = document.querySelector("[data-num='2']")
  box2.setAttribute('class', 'colored')
  box2.appendChild(boy)
  var boyCurrentPos = parseInt(document.getElementById('boy').parentElement.dataset.num)

  var chest = document.getElementById('chest')
  var box47 = document.querySelector("[data-num='47']")
  box47.appendChild(chest)

  var monster = document.getElementById('monster')
  var box42 = document.querySelector("[data-num='42']")
  box42.appendChild(monster)

// Randomise sword, shield and key positions and make sure they don't appear on the same grid by having an array to track the unoccupied grids
  var availBoxes = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 48, 49]

  var sword = document.getElementById('sword')
  var randSword = Math.floor(Math.random() * 47)
  document.querySelector('[data-num=' + '"' + availBoxes[randSword] + '"' + ']').appendChild(sword)
  var swordPos = parseInt(document.getElementById('sword').parentElement.dataset.num)
  console.log('swordPos', swordPos)
  availBoxes.splice(randSword, 1)

  var shield = document.getElementById('shield')
  var randShield = Math.floor(Math.random() * 46)
  document.querySelector('[data-num=' + '"' + availBoxes[randShield] + '"' + ']').appendChild(shield)
  var shieldPos = parseInt(document.getElementById('shield').parentElement.dataset.num)
  console.log('shieldPos', shieldPos)
  availBoxes.splice(randShield, 1)

  var key = document.getElementById('key')
  var randKey = Math.floor(Math.random() * 45)
  document.querySelector('[data-num=' + '"' + availBoxes[randKey] + '"' + ']').appendChild(key)
  var keyPos = parseInt(document.getElementById('key').parentElement.dataset.num)
  console.log('keyPos', keyPos)
  availBoxes.splice(randKey, 1)

  var boxes = document.querySelector('#board').querySelectorAll('div')
  var tilesBtn = document.querySelector('#tiles')
  var turnCount = 11
  var tilesPos = [2]
  var tilesCount = 0
  var gameOver = false

  for (var i = 0; i < boxes.length; i++) {
    if (i !== 47) {
      boxes[i].addEventListener('click', function (e) {
        var boxIndex = parseInt(e.target.dataset.num)
        console.log(boxIndex)
        if (isNaN(boxIndex)) {
          boxIndex = parseInt(e.target.parentElement.dataset.num)
          if (!tilesPos.includes(boxIndex) && tilesCount > 0) {
            tilesPos.push(boxIndex)
            e.target.parentElement.setAttribute('class', 'colored')
            tilesCount--
          }
          console.log('if NaN',boxIndex)
        } else {
          if (!tilesPos.includes(boxIndex) && tilesCount > 0) {
            tilesPos.push(boxIndex)
            e.target.setAttribute('class', 'colored')
            tilesCount--
        }
           }
          // tilesCount--
          console.log('tilesPos after push', tilesPos)
          console.log(tilesPos)
      })
    }
  }

// Each time the Put Tiles button is clicked, putTiles function will be called to check if it's valid position to place the tile.
// No. of turns will reduce by 1 and when it reaches 0 the button will be disabled to disallow putting of tiles.
  tilesBtn.addEventListener('click', function () {
    turnCount--
    tilesCount = 2
    document.querySelector('#turns').textContent = 'Turns: ' + turnCount
    if (turnCount === 0) {
      tilesCount -= 2
      tilesBtn.disabled = true
      h2.textContent = 'You have run out of turns. Game Over!'
    }
    console.log('turnCount', turnCount)
  })

  var swordCount = 0
  var shieldCount = 0
  var keyCount = 0

  document.addEventListener('keydown', function (e) {
    console.log('tilesPos inside movePlayer', tilesPos)
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
    if (gameOver === true) return false
    switch (e.keyCode) {
      case 37:  // left
        boyCurrentPos += 1
        if (tilesPos.indexOf(boyCurrentPos) !== -1) {
          console.log(boyCurrentPos)
          document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').appendChild(boy)
          getItems()
        } else {
          boyCurrentPos -= 1
          h2.textContent = 'Please move within your path.'
        }
        break
      case 38:  // up
        boyCurrentPos += 5
        if (tilesPos.indexOf(boyCurrentPos) !== -1) {
          console.log(boyCurrentPos)
          document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').appendChild(boy)
          getItems()
        } else {
          boyCurrentPos -= 5
          h2.textContent = 'Please move within your path.'
        }
        break
      case 39:  // right
        boyCurrentPos -= 1
        if (tilesPos.indexOf(boyCurrentPos) !== -1) {
          console.log(boyCurrentPos)
          document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').appendChild(boy)
          getItems()
        } else {
          boyCurrentPos += 1
          h2.textContent = 'Please move within your path.'
        }
        break
      case 40:  // down
        boyCurrentPos -= 5
        if (tilesPos.indexOf(boyCurrentPos) !== -1) {
          console.log(boyCurrentPos)
          document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').appendChild(boy)
          getItems()
        } else {
          boyCurrentPos += 5
          h2.textContent = 'Please move within your path.'
        }
        break
    }
  })

  var monsterDefeat = false
  function getItems () {
    if (document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos !== 42 && boyCurrentPos !== 47) {
      document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').firstElementChild)
      if (boyCurrentPos === swordPos) {
        swordCount = 1
        document.querySelector('#swordGet').textContent = 'Sword: 1'
      } else if (boyCurrentPos === shieldPos) {
        shieldCount = 1
        document.querySelector('#shieldGet').textContent = 'Shield: 1'
      } else if (boyCurrentPos === keyPos) {
        keyCount = 1
        document.querySelector('#keyGet').textContent = 'Key: 1'
      }
    }
    isGameOver()
  }

  var h2 = document.querySelector('h2')
  function isGameOver () {
    console.log('turn inside GO', turnCount)
    if (document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos === 42 && turnCount > 0) {
      if (swordCount === 1 && shieldCount === 1) {
        document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').firstElementChild)
        monsterDefeat = true
        h2.textContent = 'Monster defeated!'
      } else {
        gameOver = true
        tilesBtn.disabled = true
        h2.textContent = 'You are killed by the monster! Game Over!'
        document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').lastElementChild)
      }
    } else if (document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos === 47 && turnCount > 0) {
      if (keyCount === 1 && monsterDefeat === true) {
        document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"' + boyCurrentPos + '"' + ']').firstElementChild)
        h2.textContent = 'Treasure Obtained! You won!'
        gameOver = true
        tilesBtn.disabled = true
      } else {
        h2.textContent = 'Make sure you have the key and defeat the monster first!'
      }
    } else if (turnCount === 0) {
      gameOver = true
    }
  }

  var restartBtn = document.getElementById('restart')
  restartBtn.addEventListener('click', restart)
  function restart () {
    location.reload()
  }
})
