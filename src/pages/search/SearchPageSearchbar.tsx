import { useEffect, useRef, useState } from "react";
import { useSearchStore } from "./searchStore";

export default function SearchPageSearchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const timeOutId = useRef<NodeJS.Timeout>(undefined);

  const { search, searchParams } = useSearchStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    clearTimeout(timeOutId.current);

    timeOutId.current = setTimeout(async () => {
      setIsTyping(false);
      if (searchInput !== "") {
        const [page, query, size] = ["0", searchInput, "7"];
        setIsLoading(true);
        await search({ page, query, size });
        setIsLoading(false);
      }
    }, 1000);
  }, [searchInput]);

  return (
    <label className="input w-full rounded-full">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
        defaultValue={searchParams.query}
      />
      {!isLoading && isTyping === false && (
        <i className="fa-solid fa-magnifying-glass" />
      )}
      {!isLoading && isTyping === true && (
        <span className="loading loading-dots loading-xs"></span>
      )}
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </label>
  );
}
