import { useEffect, useState } from "react";
import { useSearchStore } from "./searchStore";
import { useDocumentStore } from "../documents/documentsStore";

interface Props {
  pages: number;
}

export default function SearchPagePagination({ pages = 0 }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { search, searchParams } = useSearchStore((state) => state);

  const pagesArray = Array.from(Array(pages));

  const { size, query } = searchParams;

  const onClick = async (index: string) => {
    setIsLoading(true);

    const page = index;

    await search({ page, size, query });
    setIsLoading(false);
  };

  const inputs = pagesArray.map((_, index) => {
    const isButtonSelected = searchParams.page === index.toString();

    return (
      <button
        key={index}
        className={`join-item btn btn-xs btn-circle ${
          isButtonSelected && "btn-primary"
        }`}
        name="options"
        onClick={onClick.bind(onClick, index.toString())}
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs">
            {(index + 1).toString()}
          </span>
        )}
        {!isLoading && (index + 1).toString()}
      </button>
    );
  });

  return <div className="join justify-center gap-3 mt-auto">{inputs}</div>;
}
