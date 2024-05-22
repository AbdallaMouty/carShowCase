"use client";
import React from "react";
import { SearchCombo } from "./";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ className }: { className: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${className}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt="mag"
      width={40}
      height={40}
      className=" object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (make === "" && model === "") {
      alert("please fill in the searchbar");
    }

    updateSearchParams(model.toLowerCase(), make.toLowerCase());
  };

  const updateSearchParams = (model: string, make: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPath, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchCombo type="make" make={make} setMake={setMake} />
        <SearchButton className="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src={"/model-icon.png"}
          alt="model"
          width={25}
          height={25}
          className="w-[20px] h-[20px] absolute ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Golf"
          className="searchbar__input"
        />
        <SearchButton className="sm:hidden" />
      </div>
      <SearchButton className="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
