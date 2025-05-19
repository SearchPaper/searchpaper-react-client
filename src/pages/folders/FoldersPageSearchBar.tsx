import { useEffect, useRef, useState } from "react";
import { useFolderStore } from "./foldersStore";

export default function FoldersPageSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const timeOutId = useRef<NodeJS.Timeout | null>(null);

  const { list } = useFolderStore();

  useEffect(() => {
    setIsTyping(true);
    clearTimeout(timeOutId.current ?? "");

    timeOutId.current = setTimeout(() => {
      setIsTyping(false);
      const [page, size, term] = ["0", "7", searchInput];

      list({ page, size, term });
    }, 1000);
  }, [searchInput]);

  return (
    <>
      <label className="input w-full rounded-none">
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
