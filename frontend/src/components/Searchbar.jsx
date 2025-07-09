import { useEffect, useRef, useState, useCallback } from "react";
import { Search, X, Linkedin, BriefcaseBusiness  } from "lucide-react";

export default function Searchbar({ searchQuery, setSearchQuery }) {
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef(null);

  const search = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed && !searchQuery.includes(trimmed)) {
      setSearchQuery([...searchQuery, trimmed]);
    }
    setInputValue("");
  }, [inputValue, searchQuery, setSearchQuery]);

  useEffect(() => {
    if (!inputValue.trim()) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      search();
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [inputValue, search]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(timeoutRef.current);
      search();
    }
  };

  const removeTag = (tagToRemove) => {
    setSearchQuery(searchQuery.filter((tag) => tag !== tagToRemove));
  };

  return (
    <header className="flex items-center justify-between border-b border-b-gray-400 px-[60px] py-[30px]">
      <div className="flex items-center flex-wrap gap-2 w-auto h-auto box-border p-2 border border-gray-300 rounded-[var(--rounded-standard)] focus-within:border-brand-orange hover:border-brand-orange group">
        <div className="flex items-center">
          <input
            className="w-60 my-1 ml-1 p-1 rounded-[var(--rounded-standard)] focus:outline-none focus:ring-0"
            placeholder="Search for tags..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            onClick={search}
            className="mx-2 text-gray-400 group-hover:text-brand-orange group-focus-within:text-brand-orange cursor-pointer"
          />
        </div>
      </div>

      {searchQuery.map((tag) => (
        <div
          onClick={() => removeTag(tag)}
          key={tag}
          className="flex items-center mx-2 px-2 py-1 
            bg-brand-orange/10 text-brand-orange text-sm rounded-full
            cursor-pointer hover:bg-red-500 hover:text-white gap-1"
        >
          {tag}
          <X className="w-3 h-3" />
        </div>
      ))}

      <div className="flex items-center gap-6">
        <p className="text-sm text-text-color font-medium transition-all hover:text-brand-orange cursor-default">
          Made by <span className="font-semibold not-italic">Maximiliano T. Gomez</span>
        </p>
        
        <div className="flex items-center gap-3">
          <a 
            href="https://www.linkedin.com/in/maximiliano-t-gomez/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-brand-orange/10 text-gray-500 hover:text-[#0A66C2] transition-all"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-7 h-7" />
          </a>
          
          <a 
            href="https://portfolio-maxigomez5431s-projects.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-brand-orange/10 text-gray-500 hover:text-brand-orange transition-all"
            aria-label="Portfolio website"
          >
            <BriefcaseBusiness className="w-7 h-7" />
          </a>
        </div>
      </div>
    </header>
  );
}