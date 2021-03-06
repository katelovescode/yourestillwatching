import React from "react"
import dayjs from "dayjs"
import { Link } from "gatsby"

export default function ReviewRankingTable({ reviews, thisReviewTitle }) {
  return (
    reviews.length > 0 && (
      <table className="text-left w-full">
        <thead>
          <tr className="font-semibold border border-black border-b-1 border-r-0 border-l-0 border-t-0 text-sm">
            <th className="table-cell pb-2.5">Rank</th>
            <th className="table-cell pb-2.5">Title</th>
            <th className="hidden md:table-cell pb-2.5">Year</th>
            <th className="table-cell pb-2.5">Grade</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr
              key={review.fields.slug}
              className={`${
                thisReviewTitle === review.movieTitle
                  ? "font-bold text-themePink"
                  : ""
              } border border-themeMediumGray border-b-1 border-r-0 border-l-0 border-t-0 text-sm group cursor-pointer`}
            >
              <td className="table-cell group-hover:bg-themeLightGray">
                <Link
                  className="block py-2.5 px-2 focus:outline-none"
                  to={`/${review.fields.slug}`}
                  tabIndex="-1"
                >
                  {review.rank}
                </Link>
              </td>
              <td className="table-cell group-hover:bg-themeLightGray">
                <Link
                  className="block py-2.5 px-2 focus:outline-none"
                  to={`/${review.fields.slug}`}
                >
                  {review.movieTitle}
                </Link>
              </td>
              <td className="hidden md:table-cell group-hover:bg-themeLightGray">
                <Link
                  className="block py-2.5 px-2 focus:outline-none"
                  to={`/${review.fields.slug}`}
                  tabIndex="-1"
                >
                  {dayjs(review.releaseDate).format("YYYY")}
                </Link>
              </td>
              <td className="table-cell group-hover:bg-themeLightGray">
                <Link
                  className="block py-2.5 px-2 focus:outline-none"
                  to={`/${review.fields.slug}`}
                  tabIndex="-1"
                >
                  {review.grade}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )
}
