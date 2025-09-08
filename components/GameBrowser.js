"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import PlatformSort from "./PlatformSort";
import GameList from "./GameList";
import SkeletonLoader from "./SkeletonLoader";

export default function GameBrowser() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    // fetch the data from the API
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // map the incoming API fields to lowercase keys
        const normalized = data.map((item) => ({
          // coalesce uppercase vs lowercase keys, default to ''
          title: (item.Title ?? item.title ?? "").trim(),
          platform: (item.Platform ?? item.platform ?? "").trim(),
          score: item.Score ?? item.score ?? "",
          genre: item.Genre ?? item.genre ?? "",
          // ensure editors_choice is always 'Y' or 'N'
          editors_choice:
            item.editors_choice === "Y" || item.editors_choice === "y"
              ? "Y"
              : "N",
        }));
        setGames(normalized);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredGames = useMemo(() => {
    let list = games;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      // now safe, since every item has a `title`
      list = list.filter((g) => g.title.toLowerCase().includes(term));
    }

    // showing the games in the order chosen
    if (sortOrder === "asc") {
      list = [...list].sort((a, b) => a.platform.localeCompare(b.platform));
    } else if (sortOrder === "desc") {
      list = [...list].sort((a, b) => b.platform.localeCompare(a.platform));
    }

    return list;
  }, [games, searchTerm, sortOrder]);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Games Listing</h1>
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <SearchBar
            games={games}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
          <PlatformSort sortOrder={sortOrder} onSortChange={setSortOrder} />
        </div>
      </header>

      {// if the data is loading then there will be a loader shown otherwise the data will be sent further
      }
      <main>
        {loading ? (
          <SkeletonLoader count={9} />
        ) : (
          <GameList games={filteredGames} />
        )}
      </main>
    </div>
  );
}
