"use strict"
(function(){

    const container = document.querySelector(".container")
    for(let i = 0; i < 9; i++){
        const div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute("data", i)
        div.addEventListener("click", () => {
            game.setBoard(i)
        }, {once: true})
        container.appendChild(div);
    }

})()

let game = (() => {

    let _gameBoard = ["", "", "", "", "", "", "", "", ""]
    let _winningState = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let currentState = "x" ? "x" : "o"

    function setBoard (where) { 
        _gameBoard[where] = currentState

        const dataDom = document.querySelector(`[data="${where}"]`)
        dataDom.textContent = currentState

        checkWin()
        switchState()
    }

    function checkWin () {
        for (let i = 0; i < _winningState.length; i++) {
            const array = _winningState[i]
            if(_gameBoard[array[0]] === currentState &&
               _gameBoard[array[1]] === currentState &&
               _gameBoard[array[2]] === currentState) {
                   console.log("match!")
               }
        }
    }

    function switchState () {
        currentState = !currentState
    }

    return { currentState, setBoard } 

})()
