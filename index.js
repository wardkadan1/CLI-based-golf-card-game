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
