"use strict";

const player = (name, marker) => {
    return { name, marker }
}

const game = (() => {

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

    let playerOne = {}
    let playerTwo = {}

    let _currentState = {}

    const _results = document.querySelector(".results")
    const _turns = document.querySelector(".turns")
    const _container = document.querySelector(".container")
    const _forms = document.querySelector(".forms")
    const _restart = document.querySelector(".restart")
    const _start = document.querySelector("#startBtn")

    function _initGame(){

        for(let i = 0; i < 9; i++){
            const div = document.createElement('div');
            div.classList.add('square');
            div.setAttribute("data", i)
            div.addEventListener("click", () => {
                _setBoard(i)
                console.log("test")
            }, {once: true})
            _container.appendChild(div);
        }

    }

    function _setBoard(where) { 
        _gameBoard[where] = _currentState.marker

        const dataDom = document.querySelector(`[data="${where}"]`)
        dataDom.textContent = _currentState.marker

        _checkWin()
        _switchState()
    }

    function _getPlayer() {
        const nameOne = document.querySelector("#oneName").value
        const markerOne = document.querySelector("#oneMarker").value
        const nameTwo = document.querySelector("#twoName").value
        const markerTwo = document.querySelector("#twoMarker").value

        if(nameOne && markerOne && nameTwo && markerTwo) {
            playerOne = player(nameOne, markerOne)
            playerTwo = player(nameTwo, markerTwo)
            _currentState = playerOne
            _forms.style.display = "none"
            _initGame()
        }else{
            alert("please fill all the forms")
        }
    }

    function _switchState() {
        _currentState = _currentState === playerOne ? playerTwo : playerOne
        _turns.textContent = `it's ${_currentState.name} turn now!`
    }

    function _checkWin() {
        for (let i = 0; i < _winningState.length; i++) {
            const array = _winningState[i]
            if(_gameBoard[array[0]] === _currentState.marker &&
            _gameBoard[array[1]] === _currentState.marker &&
            _gameBoard[array[2]] === _currentState.marker ) {
                _endGame()
            }else if(!_gameBoard.includes("")){
                _draw()
            }
        }
    }

    function _endGame() {
        _results.textContent = `${_currentState.name} wins`
        console.log(_gameBoard)
        _hide()
    }

    function _draw() {
        _results.textContent = `it's a draw!`
        _hide()
    }

    function _hide() {
        _container.style.display = "none"
        _turns.style.display = "none"
        _restart.style.display = "block"
    }

    function startGame() {
        _start.addEventListener("click", () => {
            _getPlayer()
            _restartGame()
        })
    }

    function _restartGame() {
        _restart.addEventListener("click", () => {
            _gameBoard = ["", "", "", "", "", "", "", "", ""]
            _container.style.display = "grid"
            _results.textContent = "Tic Tac Toe"
            _turns.style.display = "none"
            _forms.style.display = "flex"
            _container.innerHTML = ""
            _restart.style.display = "none"
            console.log(_gameBoard)
        })
    }
    
    return { startGame } 

})()

game.startGame()