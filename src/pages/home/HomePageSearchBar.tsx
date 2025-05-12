import { useEffect, useRef, useState } from "react";

export default function HomePageSearchBar() {
  const [searchInput, setSearchInput] = useState<string>();
  const [isTyping, setIsTyping] = useState(false);

  const timeOutId = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    setIsTyping(true);
    clearTimeout(timeOutId.current);

    timeOutId.current = setTimeout(() => {
      setIsTyping(false);
      if (searchInput !== "") {
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
        {isTyping === false && <i className="fa-solid fa-magnifying-glass" />}
        {isTyping === true && (
          <span className="loading loading-dots loading-xs"></span>
        )}
      </label>
    </>
  );
}
