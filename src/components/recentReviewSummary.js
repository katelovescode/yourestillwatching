import React from "react"

export default function RecentReviewSummary({ review, idx }) {
  return (
    <div className={`${idx === 0 ? "mt-6" : "mt-8"} md:mt-4 w-full md:w-23/50`}>
      <div className="relative pb-7/12 mb-4">
        <img
          className="absolute h-full w-full object-cover"
          src={review.posterImage}
          alt={`${review.movieTitle} Image`}
        />
      </div>
      <h4 className="text-xl border border-t-0 border-l-0 border-r-0 border-b-2 border-themeDarkGray pb-1 mb-2 xl:text-2xl">
        {review.movieTitle}
      </h4>
      <div>{review.summary}</div>
      <div className="text-gray-600 text-sm italic text-right pt-4">
        {review.publishDate}
      </div>
    </div>
  )
}
