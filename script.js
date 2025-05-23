
    const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
    const board = document.getElementById("board");
    const message = document.getElementById("message");

    let cells = Array(9).fill(null);
    let playerMoves = [];
    let computerMoves = [];
    let gameOver = false;

    function checkWin(moves) {
      if (moves.length < 3) return false;
      // Check all combinations of 3 moves
      for (let i = 0; i < moves.length; i++) {
        for (let j = i + 1; j < moves.length; j++) {
          for (let k = j + 1; k < moves.length; k++) {
            if (
              moves[i] + moves[j] + moves[k] === 15
            ) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function computerTurn() {
      let bestMove = null;

      const emptyIndices = cells.map((c, i) => (c === null ? i : null)).filter(i => i !== null);

      // Try to win
      for (let i of emptyIndices) {
        let testMoves = [...computerMoves, magicSquare[i]];
        if (checkWin(testMoves)) {
          bestMove = i;
          break;
        }
      }

      // Try to block player
      if (bestMove === null) {
        for (let i of emptyIndices) {
          let testMoves = [...playerMoves, magicSquare[i]];
          if (checkWin(testMoves)) {
            bestMove = i;
            break;
          }
        }
      }

      // Otherwise, pick center or first available
      if (bestMove === null) {
        bestMove = emptyIndices.includes(4) ? 4 : emptyIndices[0];
      }

      cells[bestMove] = "O";
      computerMoves.push(magicSquare[bestMove]);
      renderBoard();

      if (checkWin(computerMoves)) {
        message.textContent = "Computer (O) wins!";
        gameOver = true;
      } else if (playerMoves.length + computerMoves.length === 9) {
        message.textContent = "It's a draw!";
        gameOver = true;
      } else {
        message.textContent = "Your turn (X)";
      }
    }

    function handleClick(index) {
      if (cells[index] !== null || gameOver) return;

      cells[index] = "X";
      playerMoves.push(magicSquare[index]);
      renderBoard();

      if (checkWin(playerMoves)) {
        message.textContent = "You (X) win!";
        gameOver = true;
        return;
      }

      if (playerMoves.length + computerMoves.length === 9) {
        message.textContent = "It's a draw!";
        gameOver = true;
        return;
      }

      message.textContent = "Computer is thinking...";
      setTimeout(computerTurn, 500);
    }

    function renderBoard() {
      board.innerHTML = "";
      cells.forEach((val, i) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.textContent = val || "";
        div.onclick = () => handleClick(i);
        board.appendChild(div);
      });
    }

    function resetGame() {
      cells = Array(9).fill(null);
      playerMoves = [];
      computerMoves = [];
      gameOver = false;
      message.textContent = "Your turn (X)";
      renderBoard();
    }

    renderBoard();
