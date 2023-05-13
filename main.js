// to output the path
// store all possibles moves as children of an adjency list
// use depth first search from the root to the goal child

function knightMoves(start, goal) {
  const dx = [-1, -1, 1, 1, -2, -2, 2, 2];
  const dy = [2, -2, 2, -2, 1, -1, 1, -1];
  const queue = [start];
  const visited = [];
  const movesCounter = [];
  const edgeList = []; // aka the board
  const path = [];

  for (let i = 0; i < 8; i++) {
    const row = [];
    const rowCounter = [];
    for (let i = 0; i < 8; i++) {
      row.push(false);
      rowCounter.push(0);
    }
    visited.push(row);
    movesCounter.push(rowCounter);
  }

  visited[start[1]][start[0]] = true;

  while (queue.length != 0) {
    let move = queue.shift();
    if (move[0] == goal[0] && move[1] == goal[1]) {
      const numOfMoves = movesCounter[move[1]][move[0]];

      let tempGoal = goal;
      for (let i = 0; i < numOfMoves; i++) {
        edgeList.forEach((edge) => {
          const firstVertice = edge[0];
          const secondVertice = edge[1];
          if (
            secondVertice[0] == tempGoal[0] &&
            secondVertice[1] == tempGoal[1]
          ) {
            path.unshift(firstVertice);
            tempGoal = firstVertice;
          }
        });
      }
      path.push(goal);
      return path;
    }
    for (let i = 0; i < 8; i++) {
      // at each iteration add the newMoves in
      // an edge list
      let newMove = [move[0] + dx[i], move[1] + dy[i]];
      if (onBoard(newMove) && !visited[newMove[1]][newMove[0]]) {
        edgeList.push([move, newMove]);
        queue.push(newMove);
        visited[newMove[1]][newMove[0]] = true;
        movesCounter[newMove[1]][newMove[0]] =
          movesCounter[move[1]][move[0]] + 1;
      }
    }
  }
}

function onBoard(move) {
  if (move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8) {
    return true;
  }
  return false;
}

console.log(knightMoves([3, 3], [4, 3]));
