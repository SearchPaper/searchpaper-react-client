import { useEffect, useRef, useState } from "react";
import { useSearchStore } from "../search/searchStore";
import { useLocation } from "wouter";

export default function HomePageSearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  const timeOutId = useRef<NodeJS.Timeout>(undefined);

  const { search } = useSearchStore();

  const [, navigate] = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    clearTimeout(timeOutId.current);

    timeOutId.current = setTimeout(() => {
      setIsTyping(false);
      if (searchInput !== "") {
        const [page, query, size] = ["0", searchInput, "7"];
        setIsLoading(true);
        search({ page, query, size }).then(() => {
          setIsLoading(false);
          navigate("/search", { replace: true });
        });
      }
    }, 1000);
  }, [searchInput]);

  return (
    <>
      <label className="input w-full rounded-full">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
          defaultValue={searchInput}
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
    </>
  );
}
