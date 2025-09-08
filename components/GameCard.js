export default function GameCard({ game }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition p-4 flex flex-col">
      <h2 className="text-lg font-medium">{game.title}</h2>
      <div className="mt-2 text-sm text-gray-600">
        Platform: <span className="font-semibold">{game.platform}</span>
      </div>
      <div className="mt-1 text-sm text-gray-600">
        Genre: <span className="font-semibold">{game.genre || 'N/A'}</span>
      </div>
      <div className="mt-1 text-sm text-gray-600">
        Score: <span className="font-semibold">{game.score}</span>
      </div>
      {game.editors_choice === 'Y' && (
        <span className="mt-3 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full self-start">
          Editor’s Choice
        </span>
      )}
    </div>
  )
}
