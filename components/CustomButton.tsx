"use client";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface Props {
  disabled: boolean;
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  styles?: string;
  rightIcon?: string;
}

const CustomButton = ({
  disabled,
  children,
  type = "button",
  styles,
  onClick,
  rightIcon,
}: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`custom-btn ${styles}`}
      onClick={onClick}>
      <span className={`flex-1`}>{children}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image src={rightIcon} alt="icon" fill className="object-contain" />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
