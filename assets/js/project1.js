document.addEventListener('DOMContentLoaded', function () {
// left keycode = 37, up = 38, right = 39, down = 40
// Draw 50 div & set click listener to the board
var board = document.getElementById('board')
var tilesPos = [2]
var tilesCount = 2
var gameOver = false
for(var i=49; i>=0; i--){
  var div = document.createElement('div')
  div.setAttribute('data-num', i)
  div.textContent = i
  board.appendChild(div)
}

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

  var availBoxes = [0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,43,44,45,46,48,49]

  var sword = document.getElementById('sword')
  var randSword = Math.floor(Math.random()*47)
  document.querySelector('[data-num=' + '"'+ availBoxes[randSword] + '"' + ']').appendChild(sword)
  var swordPos = parseInt(document.getElementById('sword').parentElement.dataset.num)
  console.log('swordPos', swordPos)
  availBoxes.splice(randSword, 1)

  var shield = document.getElementById('shield')
  var randShield = Math.floor(Math.random()*46)
  document.querySelector('[data-num=' + '"'+ availBoxes[randShield] + '"' + ']').appendChild(shield)
  var shieldPos = parseInt(document.getElementById('shield').parentElement.dataset.num)
  console.log('shieldPos', shieldPos)
  availBoxes.splice(randShield, 1)

  var key = document.getElementById('key')
  var randKey = Math.floor(Math.random()*45)
  document.querySelector('[data-num=' + '"'+ availBoxes[randKey] + '"' + ']').appendChild(key)
  var keyPos = parseInt(document.getElementById('key').parentElement.dataset.num)
  console.log('keyPos', keyPos)
  availBoxes.splice(randKey, 1)
   console.log('availbox',availBoxes)

  var boxes = document.querySelector('#board').querySelectorAll('div')
  var tilesBtn = document.querySelector('#tiles')
  var turnCount = 10


  tilesBtn.addEventListener('click', function(){

// if (turnCount > 0 && gameOver === false){
  turnCount--
  putTiles()
  tilesCount = 2
  document.querySelector('#turns').textContent = 'Turns Left: ' + turnCount
  if (turnCount === 0) {
    gameOver === true
    tilesBtn.disabled = true
    console.log('gameover')
}
console.log(turnCount)
//}
  })
  function putTiles(){
  for(var i= 0; i < boxes.length; i++){
    if (i !== 47) {
      boxes[i].addEventListener('click', function(e){
        var tilesClicked = parseInt(e.target.dataset.num)
        if (tilesPos.includes(tilesClicked) === false && tilesCount > 0){
          e.target.setAttribute('class', 'colored')
        tilesPos.push(tilesClicked)
        tilesCount--
        console.log('tilePos inside putTiles',tilesPos)

      }
      })

      }
      }
    }
      // var moveBtn = document.getElementById('movePlayer')
      // moveBtn.addEventListener('click', movePlayer)
      // var moves = 0
      var swordCount = 0, shieldCount = 0, keyCount = 0
//function movePlayer(){
  //document.getElementById('step1').style.display = 'none'
  //document.getElementById('step2').style.display = 'block'
  // moves = Math.ceil(Math.random()*3)
  // console.log('moves', moves)
  // var moveCount = 0

  document.addEventListener("keydown", function (e){
    console.log('tilesPos inside movePlayer',tilesPos)
    //if (moves === moveCount) return false
    switch (e.keyCode){
      case 37:  //left
      boyCurrentPos += 1
      if (tilesPos.indexOf(boyCurrentPos) !== -1) {
      console.log(boyCurrentPos)
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').appendChild(boy)
      //moveCount++
      getItems()
      } else {
      boyCurrentPos -= 1
      console.log('Pls move within the gird')}
      break
      case 38:  //up
      boyCurrentPos += 5
      if (tilesPos.indexOf(boyCurrentPos) !== -1){
      console.log(boyCurrentPos)
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').appendChild(boy)
      //moveCount++
      getItems()
      } else {
        boyCurrentPos -= 5
        console.log('Pls move within the gird')}
      break
      case 39:  //right
      boyCurrentPos -= 1
      if (tilesPos.indexOf(boyCurrentPos) !== -1) {
      console.log(boyCurrentPos)
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').appendChild(boy)
      //moveCount++
      getItems()
      } else {
        boyCurrentPos += 1
        console.log('Pls move within the gird')}
      break
      case 40:  //down
      boyCurrentPos -= 5
      if (tilesPos.indexOf(boyCurrentPos) !== -1){
      console.log(boyCurrentPos)
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').appendChild(boy)
      //moveCount++
      getItems()
      } else {
        boyCurrentPos += 5
        console.log('Pls move within the gird')}
      break
    }
  })

var monsterDefeat = false
function getItems(){
  if (document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos !== 42 && boyCurrentPos !== 47) {
    document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').firstElementChild)
    if (boyCurrentPos === swordPos){
      swordCount = 1
      document.querySelector('#swordGet').textContent = 'Sword Obtained: 1'
    } else if (boyCurrentPos === shieldPos) {
      shieldCount = 1
      document.querySelector('#shieldGet').textContent = 'Shield Obtained: 1'
    } else if (boyCurrentPos === keyPos) {
      keyCount = 1
      document.querySelector('#keyGet').textContent = 'Key Obtained: 1'
    }
  } else if (document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos === 42) {
    if (swordCount === 1 && shieldCount === 1) {
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').firstElementChild)
      monsterDefeat = true
      console.log('Monster defeated!')
    } else {
      console.log('You are killed by the monster!')
      gameOver = true
      tilesBtn.disabled = true
      console.log(gameOver)
    }
  } else if (document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').childElementCount === 2 && boyCurrentPos === 47) {
    if (keyCount === 1 && monsterDefeat === true) {
      document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').removeChild(document.querySelector('[data-num=' + '"'+ boyCurrentPos + '"' + ']').firstElementChild)
      console.log('Treasure Obtained!')
      gameOver = true
      tilesBtn.disabled = true
      console.log(gameOver)
    } else {
      console.log('Make sure you have the key and defeat the monster first!')
    }
  }

}



  var restartBtn = document.getElementById('restart')
  restartBtn.addEventListener('click', restart)
function restart(){}



})
