// First Version: Compare Initial Hands to Determine Winner
// Aim for a playable game. The essence of blackjack requires:
// Two players - a player and a dealer (computer).
// A deck of cards.
// A starting hand of 2 cards for each player.
// Comparing both hands and determining a winner. The possible scenarios are:
// A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// A Blackjack win. When either player or dealer draw Blackjack.
// A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// Second Version: Add Player Hit or Stand
// The player hitting or standing is different from the dealer hitting or standing. The rules state that the dealer hits or stands after all players are done, so let's work on the players hitting or standing first.
// The player hitting or standing is a new mode in the game that allows the player to enter their choice. Add the logic for when the player busts (has a total score of >21).
// Refactor your logic to wait until the player is done to evaluate the game-winning condition.
// The player should not immediately lose if he busts - there is a possibility he will tie with the dealer if the dealer also busts.
// Test your code.

// Third Version: Add Dealer Hit or Stand
// The rules state that the dealer hits after the player is done. After the player confirms they are done, add the logic for the dealer adding cards to their hand. This should happen before the winning condition.
// Test your code.

// Fourth Version: Add Variable Ace Values
// Add logic to determine whether Aces should have value of 1 or 11 for a given hand.
// For example, if a player draws cards in the following order:
// "Ace" and "2"  (total 13)
// "4"                   (total 17)
// "Ace".              (total 18)
// The total hand value should be 18, as only ONE of the aces will be counted as 11.
// Test your code.

// Rules of the game:
// bust if the total pts is more than 21
// if total pts is 21, you can then exit the game...
// jack, queen, king = 10
// ace can be 1 or 11
// say hit if you want more cards
// say stay if you dont want any more cards
// if dealer has 16 or under pts, they need to hit (draw more cards)
// if they are 17 or above, they stay; if they are more than 21, dealer bust
// then compare between players, if anyone more than dealer, they wins;

// Game logic:
// First press submit, and then both player and dealer will draw cards (dealer will draw 2 cards, but one will be hidden first)

// Player's turn either to hit or stand
// if player got ace + jack, queen, king or 10 (total: 21) will automatically win and game restarts
// if hit, a random card is chosen and score is added
// if the score is more than 21, the game ends
// Once player press stand, then computer will start playing
// If computer gets 16 or below, it can continue to hit until it hits 17 and or above
// If computer gets 17 and or above, it has to stand
// score comparison between player and computer and decides to win

var PLAYER = "PLAYER";
var DEALER = "DEALER";
var gameState = PLAYER;
var gameStart = false;

//scoring of cards
var player_cards = [];
var dealer_cards = [];

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// all the deck cards
var cardDeck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// shuffled deck
var shuffledDeck = shuffleCards(cardDeck);

// function to extract cards depending on player type
var getCard = function (cardNum, gameMode) {
  counter = 0;
  while (counter < cardNum) {
    // if the player type is player
    if (gameMode == PLAYER) {
      player_cards.push(shuffledDeck.pop());
      var output = player_cards;

      // if the player type is dealer
    } else if (gameMode == DEALER) {
      dealer_cards.push(shuffledDeck.pop());
      output = dealer_cards;
    }
    counter += 1;
  }
  return output;
};

// calculate the score based on their rank
var getScore = function (cardArray) {
  var sum = 0;
  for (var i = 0; i < cardArray.length; i++) {
    // if the array rank is jack, queen or king (more than 10), score them as 10
    if (cardArray[i].rank > 10) {
      cardArray[i].rank = 10;
    }
    sum += cardArray[i].rank;
  }
  return sum;
};

// print out the content of cards it currently has
var getCardMsg = function (cardArray) {
  counter = 0;
  output = "";
  for (i = 0; i < cardArray.length; i++) {
    output =
      output +
      `Card No. ${counter + 1} : ${cardArray[i].name} of ${
        cardArray[i].suit
      } <br>`;
    counter += 1;
  }
  return output;
};

// main function
var main = function (input) {
  console.log(shuffledDeck.length);

  var dealerCard = getCard(2, DEALER);
  var playerCard = getCard(2, PLAYER);

  console.log(dealerCard);
  console.log(playerCard);
  console.log(shuffledDeck.length);

  dealer_sum = getScore(dealerCard);
  player_sum = getScore(playerCard);
  output = getCardMsg(dealerCard);

  console.log("dealer's sum: " + dealer_sum);
  console.log("player's sum: " + player_sum);

  return output;
};
