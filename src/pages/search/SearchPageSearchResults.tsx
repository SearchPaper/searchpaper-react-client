import { SearchResult } from "./searchStore";

interface Props {
  searchResults: SearchResult[];
}

export default function SearchPageSearchResults({ searchResults = [] }: Props) {
  if (searchResults.length <= 0) {
    return (
      <div className="grid text-center">
        <p className="font-bold">0 results found</p>
      </div>
    );
  }

  const searchResultsRow = searchResults.map((result) => (
    <div className="grid gap-3 justify-stretch text-justify" key={result._id}>
      <a
        href={`/api/documents/${result._id}`}
        className="link link-primary text-lg"
        target="_blank"
      >
        {result.untrustedFileName}
      </a>
      {result.highlight.map((quote) => (
        <p dangerouslySetInnerHTML={{ __html: quote }} key={Math.random()} />
      ))}
    </div>
  ));

  return searchResultsRow;
}
