import { useState, useRef } from "react";

function SearchBar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-full border transition-all duration-300 overflow-hidden
        ${isOpen
          ? "w-72 px-4 bg-zinc-800 border-zinc-700 focus-within:border-sky-500"
          : "w-10 h-10 border-transparent justify-center cursor-pointer hover:bg-zinc-800 hover:border-zinc-700"
        }`}
      onClick={!isOpen ? handleOpen : undefined}
    >
      <svg
        className="w-6 h-6 text-zinc-400 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        onBlur={handleBlur}
        className={`bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-300
          ${isOpen ? "w-full py-2" : "w-0 p-0"}`}
      />
    </div>
  );
}

export default SearchBar;