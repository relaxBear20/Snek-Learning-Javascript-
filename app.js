document.addEventListener("DOMContentLoaded", () => {
  const height = 18;
  const width = 18;
  let grid = document.querySelector(".display-grid");
  const squares = Array.from(document.querySelectorAll(".display-grid div"));
  const startPosition = 0;
  let moveBy = 1;
  let currentHead = startPosition;
  const speed = 100;

  const isMovingRight = 39;
  const isMovingLeft = 37;
  const isMovingUp = 38;
  const isMovingDown = 40;
  let cherryPosition = 28;
  let currentDirection = isMovingRight;

  function Node(pos, next) {
    this.position = pos;
    this.next = next;
  }

  function SnekList() {
    this.head = null;
    this.tail = null;

    this.addFrist = function (index) {
      this.head = new Node(index, this.head);
      if (this.tail === null) {
        this.tail = this.head;
      }
    };
    this.traverseDraw = function () {
      var start = this.head;
      while (start !== null) {
        squares[start.position].classList.add("snek-body");
        //console.log(start.position);
        start = start.next;
      }
    };
    this.traverseUnDraw = function () {
      var start = this.head;
      while (start != null) {
        squares[start.position].classList.remove("snek-body");
        start = start.next;
      }
    };
    this.searchNode = function (index) {
      var start = this.head;

      while (start != null) {
        if (start.next.position === index) {
          return start;
        } else {
          start = start.next;
        }
      }
      return null;
    };
    this.popTail = function () {
      var start = this.head;
      while (start != null) {
        //console.log(start.position);
        if (start.next === this.tail) {
          start.next = null;
          this.tail = start;
          //console.log("delete");
        } else {
          start = start.next;
        }
      }
    };
    this.deleteNode = function (node) {
      var start = this.head;
      while (start != null) {
        //console.log(start.position);
        if (start.next === node) {
          start.next = node.next;
          // console.log("delete");
        } else {
          start = start.next;
        }
      }

      if (start === null) {
        return;
      } else if (start.next === null) {
        this.tail = start;
      }
    };
  }

  var snekList = new SnekList();
  snekList.addFrist(currentHead);
  currentHead++;
  snekList.addFrist(currentHead);
  currentHead++;
  snekList.addFrist(currentHead);
  currentHead++;
  // snekList.addFrist(currentHead);
  // currentHead++;
  // snekList.addFrist(currentHead);
  // currentHead++;
  // snekList.addFrist(currentHead);
  // currentHead++;
  // snekList.addFrist(currentHead);
  // currentHead++;
  // snekList.addFrist(currentHead);
  // currentHead++;
  snekList.popTail(snekList.tail);
  snekList.addFrist(currentHead);
  snekList.traverseDraw();
  document.addEventListener("keyup", control);
  let overflag = true;
  move();

  function relocateCherry() {
    let random = Math.floor(Math.random() * squares.length);
    while (true) {
      if (squares[random].classList.contains("snek-body"))
        random = Math.floor(Math.random() * squares.length);
      else break;
    }
    cherryPosition = random;
    squares[cherryPosition].classList.add("cherry");
  }

  async function move() {
    while (overflag) {
      //document.addEventListener("keyup", control);
      snekList.traverseUnDraw();
      currentHead += moveBy;
      snekList.addFrist(currentHead);
      if (!eatCherry()) snekList.popTail();
      else relocateCherry();
      snekList.traverseDraw();

      await new Promise((resolve, reject) => setTimeout(resolve, speed));
      //document.removeEventListener("keyup", control);
      checkAtEdge(currentDirection);
      gameOver();
    }
  }
  squares[17].classList.add("cherry");
  function eatCherry() {
    if (squares[currentHead].classList.contains("cherry")) {
      squares[currentHead].classList.remove("cherry");
      return true;
    }
    return false;
  }

  function gameOver() {
    let nextPosition = currentHead + moveBy;
    if (squares[nextPosition].classList.contains("snek-body")) {
      console.log("Over");
      overflag = false;
    }
  }

  function checkAtEdge(currentDirection) {
    if (currentDirection === isMovingLeft) {
      const atLeftEdge = currentHead % width === 0;
      if (atLeftEdge) {
        currentHead += width;
      }
    } else if (currentDirection === isMovingRight) {
      const atRightEdge = currentHead % width === width - 1;
      if (atRightEdge) {
        //console.log(currentHead);
        currentHead = currentHead - width;
      }
    } else if (currentDirection === isMovingDown) {
      const atLastRow = currentHead >= width * width - width;
      if (atLastRow) {
        currentHead = width - ((width * width) % currentHead) - moveBy;
        console.log(currentHead);
      }
    } else if (currentDirection === isMovingUp) {
      const atUpperEdge = currentHead < width;
      if (atUpperEdge) {
        currentHead = width * width - width + currentHead - moveBy;
      }
    } else if (currentDirection === 32) {
    }
  }

  let keyPressed = 0;
  document.addEventListener("keydown", (event) => {
    keyPressed++;
    console.log(keyPressed);
  });
  function control(e) {
    if (keyPressed > 5) keyPressed = 0;
    if (keyPressed <=2) {
      console.log("keyUp");
      if (e.keyCode === 37 && currentDirection !== 39) {
        moveBy = -1;
        currentDirection = e.keyCode;
      } else if (
        e.keyCode === isMovingUp &&
        currentDirection !== isMovingDown
      ) {
        moveBy = -width;
        currentDirection = e.keyCode;
      } else if (
        e.keyCode === isMovingRight &&
        currentDirection !== isMovingLeft
      ) {
        moveBy = 1;
        currentDirection = e.keyCode;
      } else if (
        e.keyCode === isMovingDown &&
        currentDirection !== isMovingUp
      ) {
        moveBy = width;
        currentDirection = e.keyCode;
      } else if (e.keyCode === 32) {
      }
    }

    keyPressed--;
  }

  //approach 2
  //moving  = setInterval(moveRight,speed);
  function draw() {
    squares[currentHead].classList.add("snek-head");
  }
  function unDraw() {
    squares[currentHead].classList.remove("snek-head");
  }
  function moveRight() {
    unDraw();
    const atRightEdge = currentHead % width === width - 1;
    if (atRightEdge) {
      currentHead = currentHead - width + 2;
    }
    currentHead += moveBy;
    draw();
  }
  function moveDown() {
    unDraw();
    console.log(currentHead + "=" + Math.floor(width * width - currentHead));
    const atLastRow = width * width - currentHead < width;
    if (atLastRow) {
      currentHead = 18 - ((width * width) % currentHead) - width;
      console.log("hit");
    }
    currentHead += moveBy;

    draw();
  }
});
