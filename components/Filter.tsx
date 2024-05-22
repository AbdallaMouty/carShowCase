"use client";
import React, { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { updateSearchParams } from "@/utils";

type Props = { title: string; options: { title: string; value: string }[] };

export default function Filter({ title, options }: Props) {
  const router = useRouter();

  const [selected, setSelected] = useState(options[0]);

  const handleUpdate = (type: string, value: string) => {
    router.push(updateSearchParams(type, value), { scroll: false });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdate(title, e.value);
        }}>
        <div className="relative w-fit z-10">
          <ListboxButton className={"custom-filter__btn"}>
            <span className="block truncate">{selected.title}</span>
            <Image
              src={"/chevron-up-down.svg"}
              alt="chev"
              width={20}
              height={20}
              className="object-contain ml-4"
            />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <ListboxOptions className={"custom-filter__options"}>
              {options.map((option, index) => (
                <ListboxOption
                  value={option}
                  key={index}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      focus ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }>
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}>
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
