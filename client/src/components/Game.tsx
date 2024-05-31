import { useState } from "react";
import Board from "./Board";
import { MessageInput, MessageList, Window } from "stream-chat-react";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  const [results, setResults] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for the other player to join...</div>;
  }

  return (
    <div className="gameContainer">
      <Board results={results} setResults={setResults} />
      <Window>
        <MessageList
          hideDeletedMessages
          closeReactionSelectorOnClick
          disableDateSeparator
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        Leave Game{" "}
      </button>
      {results.state === "won" && <div>{results.winner} Won the game</div>}
      {results.state === "tie" && <div>Game tied</div>}
    </div>
  );
}

export default Game;
