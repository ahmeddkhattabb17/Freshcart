"use client";

import { Rating } from "next-flex-rating";

type RatingStarsProps = {
  value?: number | string;
  size?: number;
  showValue?: boolean;
  valueClassName?: string;
};

function toRatingNumber(value: RatingStarsProps["value"]) {
  const rating = Number(value);
  return Number.isFinite(rating) ? rating : 0;
}

export default function RatingStars({
  value,
  size = 14,
  showValue = true,
  valueClassName = "ml-1 text-[9px] text-slate-400",
}: RatingStarsProps) {
  const rating = toRatingNumber(value);

  return (
    <div className="flex items-center gap-1">
      <Rating
        value={rating}
        readOnly
        size={size}
        spacing={1}
        color="#f59e0b"
        emptyColor="#e2e8f0"
      />
      {showValue && <span className={valueClassName}>({rating})</span>}
    </div>
  );
}
