type BattlePlayerType = {
  players: {
    player1: string;
    player2: string;
  };
};

const BattlePlayer = ({ players }: BattlePlayerType) => {
  return (
    <div>
      {players.player1}
      {players.player2}
    </div>
  );
};

export default BattlePlayer;
