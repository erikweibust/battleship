document.addEventListener('DOMContentLoaded', () => {

   const userGrid = document.querySelector('.grid-user');
   const computerGrid = document.querySelector('.grid-computer');
   const displayGrid = document.querySelector('.grid-display');
   const ships = document.querySelector('.ship');
   const destroyer = document.querySelector('.destroyer-container');
   const submarine = document.querySelector('.submarine-container');
   const cruiser = document.querySelector('.cruiser-container');
   const battleship = document.querySelector('.battleship-container');
   const carrier = document.querySelector('.carrier-container');

   const startButton = document.querySelector("#start");
   const rotateButton = document.querySelector("#rotate");
   const turnDisply = document.querySelector("#whose-go");
   const infoDisplay = document.querySelector("#info");

   const userSquares = [];
   const computerSquares = [];

   const width = 10;

   // create board
   function createBoard(grid, squares) {
      for (let i = 0; i < width * width; i++) {
         const square = document.createElement('div');
         square.dataset.id = i;
         grid.appendChild(square);
         squares.push(square);
      }
   }

   createBoard(userGrid, userSquares);
   createBoard(computerGrid, computerSquares);

   // ships
   const shipArray = [
      {
         name: 'destroyer',
         directions: [
            [0, 1], // horizontal in row 1, col 1 and 2
            [0, width] // vertical in col 1, row 1 and row 2
         ]
      },
      {
         name: 'submarine',
         directions: [
            [0, 1, 2], 
            [0, width, width*2]
         ]
      },
      {
         name: 'cruiser',
         directions: [
            [0, 1, 2], 
            [0, width, width*2]
         ]
      },
      {
         name: 'battleship',
         directions: [
            [0, 1, 2, 3], 
            [0, width, width*2, width*3]
         ]
      },
      {
         name: 'carrier',
         directions: [
            [0, 1, 2, 3, 4], 
            [0, width, width*2, width*3, width*4]
         ]
      }
   ]

   // draw the computers ships in random locations
   function generate( ship ) {
      // 1. if you call Math.random and multiply it by a number, it returns a number in that range... I think Anna means you get a number between zero and the number you multiply by
      // 2. then we wrap in Math.floor so we don't get any outliers.... I think Anna meant so we don't get any decimal numbers... she also mentioned we "round down"
      // TODO go read about Math.random and Math.floor
      // Since ship.directions.length is 2; i think we can only get a 0 or 1 with this formula; like flipping a coin???
      let randomDirection = Math.floor( Math.random() * ship.directions.length );

      // now that we can randomly pick a horizontal or vertical direction we can 
      // assign our ships
      // this selects is our ship going horizontal or vertical
      let current = ship.directions[randomDirection];

      // i have no idea what we're doing here;
      // clearly if direction == horizontal we set direction = 1
      // and if dir == vertical positioning we set direction = 10
      if (randomDirection === 0) direction = 1;
      if (randomDirection === 1) direction = 10;

      // this will select where we start the random placement of our ship on the board
      // more specifically, this formula respects the bottom of the board and makes sure
      // we don't start a ship to far down the board that it would wrap off the board
      let randomStart = Math.abs(Math.floor( Math.random() * computerSquares.length - 
            (ship.directions[0].length * direction))); 

      // we also need to make sure the square is not taken, and won't make the ship go
      // off the left or right of the board
      const isTaken = current.some(index => 
            computerSquares[randomStart + index].classList.contains("taken")); 

      const isAtRightEdge = current.some(index => 
            (randomStart + index) % width === width -1);

      const isAtLeftEdge = current.some(index => 
            (randomStart + index) % width === 0);

      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index =>
            computerSquares[randomStart + index].classList.add('taken', ship.name))
      else generate(ship)
   }

   generate(shipArray[0]);
   generate(shipArray[1]);
   generate(shipArray[2]);
   generate(shipArray[3]);
   generate(shipArray[4]);

});