"use client";
import { useRouter } from "next/navigation";
import React from "react";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

type Props = { page: number; isNext: boolean };

function ShowMore({ page, isNext }: Props) {
  const router = useRouter();

  const handleMore = () => {
    router.push(updateSearchParams("limit", ((page + 1) * 10).toString()), {
      scroll: false,
    });
  };

  const handleLess = () => {
    router.push(updateSearchParams("limit", "10"), {
      scroll: false,
    });
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext ? (
        <CustomButton
          onClick={handleMore}
          disabled={isNext}
          styles={"bg-primary-blue text-white rounded-full "}>
          show more
        </CustomButton>
      ) : (
        <CustomButton
          onClick={handleLess}
          disabled={false}
          styles={"bg-primary-black text-white rounded-full "}>
          show less
        </CustomButton>
      )}
    </div>
  );
}

export default ShowMore;
