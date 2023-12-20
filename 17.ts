type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type GameRules = {
  "👊🏻": "🖐🏾";
  "✌🏽": "👊🏻";
  "🖐🏾": "✌🏽";
};

type WhoWins<
  Player1 extends RockPaperScissors,
  Player2 extends RockPaperScissors,
> = GameRules[Player1] extends Player2
  ? "win"
  : Player1 extends Player2
  ? "draw"
  : "lose";
