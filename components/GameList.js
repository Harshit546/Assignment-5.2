import GameCard from "./GameCard";

export default function GameList({ games }) {
  // If no game exists
  if (games.length === 0) {
    return <p className="text-center text-gray-500">No games found.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {games
        .filter((game) => game && game.title)
        .map((game, idx) => (
          <GameCard key={`${game.title}-${game.platform}-${idx}`} game={game} />
        ))}
    </div>
  );
}
