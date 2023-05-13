function create_board() {
  let board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([i, j]);
    }
  }
  return board;
}

function print_board(board) {
  for (let i = 7; i >= 0; i--) {
    let row = [];
    for (let j = 0; j < board.length; j++) {
      if (board[j][1] === i) {
        row.push(board[j]);
      }
    }
    console.log(...row);
  }
}

function create_knight(position) {
  const x = position[0];
  const y = position[1];

  let move_up_left = [];
  let move_up_right = [];
  let move_left_up = [];
  let move_right_up = [];
  let move_left_down = [];
  let move_right_down = [];
  let move_down_left = [];
  let move_down_right = [];

  let moves = [];
  // let moves = [
  //   [position, [x - 1, y + 2]],
  //   [position, [x + 1, y + 2]],
  //   [position, [x - 2, y + 1]],
  //   [position, [x + 2, y + 1]],
  //   [position, [x - 2, y - 1]],
  //   [position, [x + 2, y - 1]],
  //   [position, [x - 1, y - 2]],
  //   [position, [x + 1, y - 2]],
  // ];

  if (x > 0 && y < 5) {
    move_up_left = [x - 1, y + 2];
    moves.push(move_up_left);
  }
  if (x < 7 && y < 5) {
    move_up_right = [x + 1, y + 2];
    moves.push(move_up_right);
  }
  if (x > 1 && y < 7) {
    move_left_up = [x - 2, y + 1];
    moves.push(move_left_up);
  }
  if (x < 6 && y < 7) {
    move_right_up = [x + 2, y + 1];
    moves.push(move_right_up);
  }
  if (x > 1 && y > 0) {
    move_left_down = [x - 2, y - 1];
    moves.push(move_left_down);
  }
  if (x < 6 && y > 0) {
    move_right_down = [x + 2, y - 1];
    moves.push(move_right_down);
  }
  if (x > 0 && y > 1) {
    move_down_left = [x - 1, y - 2];
    moves.push(move_down_left);
  }
  if (x < 7 && y > 1) {
    move_down_right = [x + 1, y - 2];
    moves.push(move_down_right);
  }

  return {
    position,
    moves,
    // move_up_left,
    // move_up_right,
    // move_left_up,
    // move_right_up,
    // move_left_down,
    // move_right_down,
    // move_down_left,
    // move_down_right,
  };
}

function moves_tree(position) {
  let already_visited = false;

  if (already_visited) {
    return null;
  }

  let knight = create_knight(position);

  const x = position[0];
  const y = position[1];

  // if (x > 0 && y < 5) knight.move_up_left = moves_tree([x - 1, y + 2]);
  // if (x < 7 && y < 5) knight.move_up_right = moves_tree([x + 1, y + 2]);
  // if (x > 1 && y < 7) knight.move_left_up = moves_tree([x - 2, y + 1]);
  // if (x < 6 && y < 7) knight.move_right_up = moves_tree([x + 2, y + 1]);
  // if (x > 1 && y > 0) knight.move_left_down = moves_tree([x - 2, y - 1]);
  // if (x < 6 && y > 0) knight.move_right_down = moves_tree([x + 2, y - 1]);
  // if (x > 0 && y > 1) knight.move_down_left = moves_tree([x - 1, y - 2]);
  // if (x < 7 && y > 1) knight.move_down_right = moves_tree([x + 1, y - 2]);

  already_visited = true;
  if (x > 0 && y < 5 && !knight.moves.includes([position, [x - 1, y + 2]])) {
    knight.moves.push(moves_tree([x - 1, y + 2]));
  }
  if (x < 7 && y < 5 && !knight.moves.includes([position, [x + 1, y + 2]])) {
    knight.moves.push(moves_tree([x + 1, y + 2]));
  }
  if (x > 1 && y < 7 && !knight.moves.includes([position, [x - 2, y + 1]])) {
    knight.moves.push(moves_tree([x - 2, y + 1]));
  }
  if (x < 6 && y < 7 && !knight.moves.includes([position, [x + 2, y + 1]])) {
    knight.moves.push(moves_tree([x + 2, y + 1]));
  }
  if (x > 1 && y > 0 && !knight.moves.includes([position, [x - 2, y - 1]])) {
    knight.moves.push(moves_tree([x - 2, y - 1]));
  }
  if (x < 6 && y > 0 && !knight.moves.includes([position, [x + 2, y - 1]])) {
    knight.moves.push(moves_tree([x + 2, y - 1]));
  }
  if (x > 0 && y > 1 && !knight.moves.includes([position, [x - 1, y - 2]])) {
    knight.moves.push(moves_tree([x - 1, y - 2]));
  }
  if (x < 7 && y > 1 && !knight.moves.includes([position, [x + 1, y - 2]])) {
    knight.moves.push(moves_tree([x + 1, y - 2]));
  }

  return knight;
}

// check the base case where start = end
// create a knight with the start position
// create an "edge list" that will contain moves made by the knight
// for each move the knight can make
// check if the move is already in the "edge list"
// if not add it to the "edge list" and call knightMoves

function knightMoves(start, end) {
  if (start[0] == end[0] && start[1] == end[1]) {
    return "You're already there";
  }

  let test_knight = create_knight(start);
  let moves_done = [];
  test_knight.moves.forEach((move) => {
    let included = false;
    for (const move_done of moves_done) {
      if (move_done[0] == move[0] && move_done[1] == move[1]) {
        included = true;
      }
    }
    if (!included) {
      console.log(move);
      console.log(moves_done);
      moves_done.push([start, move]);
      return knightMoves(move, end);
    }
  });
}

let board = create_board();

print_board(board);
knightMoves([3, 3], [0, 0]);
//console.log(create_knight([3, 3]).moves);

// create a board array
// create a knight object with position and moves properties
// call recursively knightMoves to move from start to end square
