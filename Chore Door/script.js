const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');

const gameOverMessage = "Game over! Play again?";
const startButtonMessage = "Good luck!";
const gameWonMessage = "You win! Play again?"

const normalDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';

const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";

const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

function doorFactory(id) {
    return {
        id: id,
        doorContent: '',
        hasBot: false
    }
}

const myDoor1 = doorFactory(doorImage1);
const myDoor2 = doorFactory(doorImage2);
const myDoor3 = doorFactory(doorImage3);
const myDoors = [myDoor1, myDoor2, myDoor3];

function setRandomDoorImages() {
    const array = [];

    while (true) {
        if (array.length >= 3) {
            break;
        } else {
            const num = Math.floor(Math.random()*3);
            if (!array.includes(num)) {
                array.push(num);
            }
        }
    }

    console.log(array);

    for (i = 0; i < 3 ; i++) {
        switch (array[i]) {
            case 0:
                myDoors[i].doorContent = botDoorPath;
                myDoors[1].hasBot = true;
                break;
            case 1:
                myDoors[i].doorContent = beachDoorPath;
                myDoors[1].hasBot = false;
                break;
            case 2:
                myDoors[i].doorContent = spaceDoorPath;
                myDoors[1].hasBot = false;
                break;
        }
    }
    
} 

setRandomDoorImages();

let isGameOver = false;
let openedDoors = 0;

let currentStreak = 0;
let bestStreak = 0;

myDoor1.id.onclick = () => {
    if (!isGameOver && openedDoors < 3) {
        myDoor1.id.src = myDoor1.doorContent;
        openedDoors++;
        checkDoorContent(myDoor1);
    }
};

myDoor2.id.onclick = () => {
    if (!isGameOver && openedDoors < 3) {
        myDoor2.id.src = myDoor2.doorContent;
        openedDoors++;
        checkDoorContent(myDoor2);
    }
   
};

myDoor3.id.onclick = () => {
    if (!isGameOver && openedDoors < 3) {
        myDoor3.id.src = myDoor3.doorContent;
        openedDoors++;
        checkDoorContent(myDoor3);
    } 
};

const start_button = document.getElementById('start');
start_button.onclick = () => {
    myDoors.forEach(door => {
        door.id.src = normalDoorPath;
    })
    setRandomDoorImages();
    isGameOver = false;
    openedDoors = 0;
    start_button.innerHTML = startButtonMessage;
    checkStreaks();
}

function checkDoorContent(door) {
    if (door.id.src === botDoorPath) {
        if (openedDoors == 3){
            start_button.innerHTML = gameWonMessage;
            currentStreak++;
            checkStreaks();
        } else {
            isGameOver = true;
            start_button.innerHTML = gameOverMessage;
            currentStreak = 0;
        }
    }
}

function checkStreaks() {
    document.getElementById('current-streak').innerHTML = currentStreak;

    if (currentStreak > bestStreak) {
        console.log(`Best Streak is being changed. current: ${currentStreak} Best: ${bestStreak}`);
        bestStreak = currentStreak
        document.getElementById('best-streak').innerHTML = currentStreak;
    }
}
