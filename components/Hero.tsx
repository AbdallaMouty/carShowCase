"use client";
import Image from "next/image";
import CustomButton from "./CustomButton";

export default function Hero() {
  const handleClick = () => {};

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car -- quikly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process
        </p>
        <CustomButton
          disabled={false}
          styles="bg-primary-blue text-white rounded-full mt-10"
          onClick={handleClick}>
          Explore Cars
        </CustomButton>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src={"/hero.png"} alt="car" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay">
          <Image
            src={"/hero-bg.png"}
            alt="car"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
