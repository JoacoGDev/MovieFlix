function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      <input
        type="text"
        placeholder="What are you watching today?"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-11 pr-5 py-3 rounded-full
                   bg-gray-100 border border-purple-300
                   text-gray-900 placeholder-gray-400 text-sm tracking-wide
                   caret-purple-500
                   outline-none ring-0
                   transition-all duration-300
                   hover:border-purple-400 hover:bg-gray-50
                   focus:border-purple-500 focus:bg-white focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
      />
    </div>
  );
}

export default SearchBar;