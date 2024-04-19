/* eslint-disable react/prop-types */
import cn from "classnames";
import head from "../assets/head.svg";
export default function Card({ item, disabled, handleClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        `relative flex flex-col items-center justify-center rounded-md border-2 transition hover:outline  hover:outline-offset-2 focus:outline-4 focus:outline-offset-4`,
        {
          "border-black bg-gray-400 hover:outline-black focus:outline-black":
            disabled,
          "border-gray-400 bg-white hover:outline-blue-500 focus:outline-blue-500":
            !disabled,
          "pointer-events-none bg-gray-400 opacity-30": item.matchFound,
        },
      )}
      onClick={(e) => handleClick(e)}
      data-key={item.key}
      data-id={item.id}
    >
      <div
        className={cn(`w-14 sm:w-16`, {
          "opacity-0": item.matchFound || item.flipped,
        })}
      >
        <img src={head} alt="head" className="w-full" />
      </div>
      <div
        className={cn(`absolute text-4xl transition`, {
          "opacity-100": item.matchFound || item.flipped,
          "opacity-0": !item.matchFound && !item.flipped,
        })}
      >
        {item.emoji}
      </div>
    </button>
  );
}
