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
