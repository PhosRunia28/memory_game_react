import cn from "classnames";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Card from "./components/Card";
import { items } from "./items";
function App() {
  const [cards, setCards] = useState(null);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [selectionKey, setSelectionKey] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  function resetCards() {
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: uuid().slice(0, 8) }));
    setCards(shuffled);
  }
  useEffect(() => {
    resetCards();
  }, []);

  useEffect(() => {
    if (!secondSelection) return;
    setDisabled(true);
    if (firstSelection === secondSelection) {
      setCards((prev) => {
        return prev.map((card) => {
          if (card.id === firstSelection) {
            return { ...card, matchFound: true };
          } else {
            return card;
          }
        });
      });
      setScore((prev) => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => {
        const updatedCard = cards.map((card) => {
          if (card.id === firstSelection || card.id === secondSelection) {
            return { ...card, flipped: false };
          } else {
            return card;
          }
        });
        setCards(updatedCard);
        resetTurn();
      }, 700);
    }
  }, [firstSelection, secondSelection]);
  function handleClick(e) {
    const key = e.currentTarget.dataset.key;
    if (firstSelection) {
      if (key === selectionKey) {
        return;
      }
    }
    setSelectionKey(key);
    const id = e.currentTarget.dataset.id;
    !firstSelection ? setFirstSelection(id) : setSecondSelection(id);
    const updatedCard = cards.map((card) => {
      if (card.key === key) {
        return { ...card, flipped: true };
      } else {
        return card;
      }
    });
    setCards(updatedCard);
  }
  function resetTurn() {
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  }
  function handleReset() {
    resetCards();
    setMoves(0);
    setScore(0);
  }
  return (
    <div className="mx-auto mt-5 flex flex-col items-center gap-5">
      <button
        type="button"
        className="rounded-lg border border-blue-200 px-6 py-2 text-3xl font-bold uppercase tracking-wide shadow-lg shadow-blue-200 transition hover:border-blue-600	"
        onClick={handleReset}
      >
        New Game
      </button>
      <div
        className={cn(
          `grid w-full max-w-md grid-cols-4 justify-center gap-4 rounded-3xl border-4 border-blue-500 bg-gray-100 p-8`,
          {
            "bg-gray-400": disabled,
          },
        )}
      >
        {cards &&
          cards.map((card) => {
            return (
              <Card
                key={card.key}
                item={card}
                disabled={disabled}
                handleClick={handleClick}
                selectionKey={selectionKey}
              />
            );
          })}
      </div>
      <div className="flex gap-10">
        <h3 className="text-center text-3xl font-medium">Moves: {moves}</h3>
        <h3 className="text-center text-3xl font-medium">Score: {score}</h3>
      </div>
    </div>
  );
}

export default App;
