"use client";
import React, { useState } from "react";
import Image from "next/image";
import { calcRent, generateCarImageUrl } from "@/utils";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

type Props = {
  car: {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    transmission: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    year: number;
    image: string;
    drive: string;
  };
};

function CarCard({ car }: Props) {
  const [open, setOpen] = useState(false);

  const { city_mpg, year, make, model, transmission, drive } = car;

  const rent = calcRent(city_mpg, year);

  return (
    <div className="car-card group transition duration-300">
      <div className="car-card__content">
        <h2 className="car-card__contet-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {rent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car, "")}
          alt={car.model}
          fill
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/steering-wheel.svg"}
              alt="wheel"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-[14px]">
              {transmission.toLowerCase() === "a" ? "Auto" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/tire.svg"}
              alt="tire"
              width={20}
              height={20}
              className="object-contain"
            />
            {drive && <p className="text-[14px]">{drive.toUpperCase()}</p>}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/gas.svg"}
              alt="gas"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            disabled={false}
            styles="w-full py-[16px] rounded-full bg-primary-blue text-white"
            rightIcon="/right-arrow.svg"
            onClick={() => setOpen(true)}>
            View More
          </CustomButton>
        </div>
      </div>

      {open && <CarDetails car={car} open={open} setOpen={setOpen} />}
    </div>
  );
}

export default CarCard;
