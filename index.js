const readline = require("readline");
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = [
  { rank: "Ace", value: 1 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 0 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "Jack", value: -1 },
  { rank: "Queen", value: 12 },
  { rank: "King", value: 13 },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const players = [
  {
    name: "",
    hand: [],
    face: [false, false, false, false],
  },
  {
    name: "",
    hand: [],
    face: [false, false, false, false],
  },
];

let deck = createDeck();
shuffleDeck(deck);
let discardPile = [];

function createDeck() {
  const deck = [];
  for (let i = 0; i < suits.length; i++)
    for (let j = 0; j < ranks.length; j++)
      deck.push({ suit: suits[i], rank: ranks[j].rank, value: ranks[j].value });
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function deal4cards() {
  for (let i = 0; i < players.length; i++)
    for (let j = 0; j < 4; j++) players[i].hand.push(deck.pop());
  discardPile.push(deck.pop());
}

function board() {
  console.log("\n--- Board ---");
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let handDisplay = `${player.name} Hand: `;
    for (let j = 0; j < player.hand.length; j++) {
      let card = player.hand[j];
      if (player.face[j]) {
        handDisplay += `[${card.rank} of ${card.suit}] | `;
      } else {
        handDisplay += `[Face Down] | `;
      }
    }
    console.log(handDisplay.slice(0, -3));
  }
  let topDiscard = discardPile[0];
  console.log(
    `Discard Pile Top Card: ${topDiscard.rank} of ${topDiscard.suit}`
  );
}

function turn(playernum, flag = 0) {
  const player = players[playernum];
  board();
  console.log(`${player.name}'s turn!`);
  if (flag === 0) {
    rl.question(
      "Choose action: 1) Draw from Deck 2) Take from discard pile: ",
      function (answer1) {
        if (answer1 === "1") {
          draw_card = [deck.pop()];
          handleCardChoice(draw_card, player, playernum);
        } else if (answer1 === "2") {
          console.log(
            `You took: ${discardPile[0].rank} of ${discardPile[0].suit}`
          );
          replace(player, discardPile, playernum);
        } else {
          console.log("\nInvalid choice. Again!!\n");
          turn(playernum);
        }
      }
    );
  } else if (flag === 1) {
    console.log(
      "Choose action: 1) Draw from Deck 2) Take from discard pile: 1"
    );
    handleCardChoice(draw_card, player, playernum);
  }
}

function handleCardChoice(draw_card, player, playernum) {
  console.log(`You drew: ${draw_card[0].rank} of ${draw_card[0].suit}`);
  rl.question(
    "1) Replace a face-down card  2) Discard the drawn card : ",
    function (answer2) {
      if (answer2 === "1") {
        replace(player, draw_card, playernum);
      } else if (answer2 === "2") {
        discardPile.pop();
        discardPile.push(draw_card[0]);
        if (deck.length === 0) {
          return endGame(playernum);
        } else if (deck.length === 1) {
          console.log("\nWarning: Only one card left in the deck!");
        }
        nextTurn(playernum);
      } else {
        console.log("\nInvalid choice. Again!!\n");
        turn(playernum, 1);
      }
    }
  );
}

function replace(player, card, playernum) {
  rl.question("Choose which card (1-4) to replace: ", function (answer) {
    answer = parseInt(answer);
    if (Number.isInteger(answer) && answer < 5 && answer > 0) {
      if (player.face[answer - 1] === true) {
        console.log("\nYou can choose just a face-down card!!\n");
        replace(player, card, playernum);
      }
      if (player.face[answer - 1] === false) {
        console.log(
          `Replacing [${player.hand[answer - 1].rank} of ${
            player.hand[answer - 1].suit
          }] with [${card[0].rank} of ${card[0].suit}] `
        );
        let temp = card[0];
        discardPile.pop();
        discardPile.push(player.hand[answer - 1]);
        player.hand[answer - 1] = temp;
        player.face[answer - 1] = true;
        nextTurn(playernum);
      }
    } else {
      console.log("Invalid choice!!");
      replace(player, card, playernum);
    }
  });
}

function nextTurn(playernum) {
  const nextplayer = (playernum + 1) % 2;
  let flag = 0;
  for (i = 0; i < players[playernum].face.length; i++)
    if (players[playernum].face[i] === false) {
      flag = 1;
      break;
    }
  if (flag === 1) {
    turn(nextplayer);
    flag = 0;
  } else endGame(nextplayer);
}

function endGame(playernum) {
  console.log("\nGame over!\n");
  for (let i = 0; i < players.length; i++)
    for (let j = 0; j < players[i].face.length; j++) players[i].face[j] = true;
  board();
  playersScore = score();
  console.log("\nFinal Scores:");
  for (let i = 0; i < players.length; i++) {
    console.log(`${players[i].name}: ${playersScore[i]}`);
  }
  if (playersScore[0] < playersScore[1])
    console.log(`\n${players[0].name} Wins!`);
  else if (playersScore[0] > playersScore[1])
    console.log(`\n${players[1].name} Wins!`);
  else if (playersScore[0] === playersScore[1]) console.log("\nDraw!");
  restartAsk();
}

function restartAsk() {
  rl.question("Play again (Y/N)? ", function (answer) {
    if (answer.toUpperCase() === "Y") {
      console.clear();
      restartGame();
      askPlayerNames();
    } else if (answer.toUpperCase() === "N") {
      rl.close();
    } else {
      console.log("Invalid choice!!");
      restartAsk();
    }
  });
}

function restartGame() {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = [];
    players[i].face = [false, false, false, false];
  }
  discardPile.pop();
  deck = createDeck();
  shuffleDeck(deck);
}
