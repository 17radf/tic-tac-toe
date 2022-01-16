"use strict";
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

const player = (name, marker) => {
    return { name, marker }
}

const one = player("raihan", "x")
const two = player("irfan", "o")

let game = ((playerOne, playerTwo) => {

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

    let _currentState = playerOne

    function setBoard (where) { 
        _gameBoard[where] = _currentState.marker

        const dataDom = document.querySelector(`[data="${where}"]`)
        dataDom.textContent = _currentState.marker

        checkWin()
        switchState()
    }

    function checkWin () {
        for (let i = 0; i < _winningState.length; i++) {
            const array = _winningState[i]
            if(_gameBoard[array[0]] === _currentState.marker &&
               _gameBoard[array[1]] === _currentState.marker &&
               _gameBoard[array[2]] === _currentState.marker ) {
                   alert(`${_currentState.name} wins`)
               }
        }
    }

    function switchState () {
        _currentState = _currentState === playerOne ? playerTwo : playerOne
    }
    
    return { setBoard } 

})(one, two)