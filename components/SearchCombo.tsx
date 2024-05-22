"use client";
import React, { useState, Fragment, useEffect } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { manufacturers } from "@/constants";
import { CheckIcon } from "@heroicons/react/16/solid";

interface Props {
  type: "make" | "model";
  make?: string;
  setMake?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchCombo = ({ type, make, setMake }: Props) => {
  const [query, setQuery] = useState("");

  const [filtered, setFiltered] = useState<string[]>([]);

  useEffect(() => {
    if (query.length === 0) {
      setFiltered(manufacturers);
    } else {
      setFiltered(
        manufacturers.filter((make) =>
          make
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
      );
    }
  }, [query]);

  if (type === "make" && setMake) {
    return (
      <div className="search-manufacturer relative">
        <Combobox
          value={make}
          //@ts-ignore
          onChange={setMake}>
          <div className="relative w-full">
            <ComboboxButton className={"absolute top-[14px]"}>
              <Image
                src={"/car-logo.svg"}
                alt="car"
                width={20}
                height={20}
                className="ml-4"
              />
            </ComboboxButton>
            <ComboboxInput
              className={"search-manufacturer__input"}
              placeholder="Volkwagen"
              displayValue={(make: string) => make}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}>
              <ComboboxOptions
                className={
                  "max-h-44 z-50 bg-neutral-100/30 backdrop-blur-md w-[95%] mx-auto rounded-lg mt-3 overflow-y-scroll combo"
                }>
                {filtered.length === 0 && query != "" ? (
                  <ComboboxOption
                    value={query}
                    className={
                      "search-manufaturer__option bg-gradient-to-r from-transparent via-primary-black/70 to-primary-black text-white w-[95%] float-end flex items-center justify-center p-2 rounded-b-md"
                    }>
                    Nothing Found
                  </ComboboxOption>
                ) : (
                  filtered.map((item) => (
                    <ComboboxOption
                      key={item}
                      className={({ focus }) =>
                        `search-manufacturer__option relative ${
                          focus ? "bg-primary-blue text-white" : "text-gray-900"
                        }`
                      }
                      value={item}>
                      {({ selected, focus }) => {
                        return (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}>
                              {item}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center ${
                                  focus ? "text-white" : "text-gray-200"
                                }`}>
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        );
                      }}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  } else {
    return <span>{type}</span>;
  }
};

export default SearchCombo;
