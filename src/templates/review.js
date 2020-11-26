import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { filterToLimit } from "../utils/filterToLimit"
import dayjs from "dayjs"
import RecentReviews from "../components/RecentReviews"
import RelatedReviews from "../components/RelatedReviews"

export default function Review({ data }) {
  const review = data.thisReview
  var advancedFormat = require("dayjs/plugin/advancedFormat")
  dayjs.extend(advancedFormat)
  review.updatedAt = dayjs(review.updatedAt).format("MMMM Do, YYYY")
  review.releaseDate = dayjs(review.releaseDate).format("MMMM Do, YYYY")

  const recentReviews = data.recentReviews.nodes

  const relatedReviews = filterToLimit(
    recentReviews,
    recentReview => {
      return (
        recentReview.series[0].name === review.series[0].name &&
        review.fields.slug !== recentReview.fields.slug
      )
    },
    2
  )

  // remove the reviews that are already in the related review array
  const highlightedRecentReviews = filterToLimit(
    recentReviews,
    recentReview => {
      return (
        !relatedReviews.includes(recentReview) &&
        review.fields.slug !== recentReview.fields.slug
      )
    },
    2
  )

  return (
    <Layout>
      <div className="md:w-136 md:mx-auto">
        <div className="relative pb-5">
          <div className="relative pb-2/3">
            <img
              className="absolute h-full w-full object-cover"
              src={review.posterImage.file.url}
              alt={`${review.movieTitle} Image`}
            />
          </div>
          <div className="absolute top-0 w-16 h-16 bg-white bg-opacity-75 flex">
            <div className="font-black text-4xl m-auto text-center">
              {review.grade}
            </div>
          </div>
          <div className="absolute bottom-3/20 right-banner px-2 py-1 font-bold shadow bg-themeBlue">
            {review.series[0].name}
          </div>
        </div>

        <h2 className="font-staatliches text-2xl md:text-3xl xl:text-4xl py-1 border border-b-1 border-t-0 border-r-0 border-l-0 border-themeMediumGray pb-2">
          <div>{review.movieTitle}</div>
          <div className="font-montserrat text-base italic text-right">
            Released: {review.releaseDate}
          </div>
        </h2>
        <div
          className="xl:text-lg"
          dangerouslySetInnerHTML={{
            __html: review.summary.childMarkdownRemark.html,
          }}
        ></div>
        <div className="bg-themeLightGray px-6 py-4 mb-8 mt-4">
          <h3 className="font-montserrat font-bold text-lg border border-b-4 border-r-0 border-l-0 border-t-0 border-themeYellow mb-4 pb-1 w-full">
            Notable Grossness
          </h3>
          <div
            dangerouslySetInnerHTML={{
              __html: review.notableGrossness.childMarkdownRemark.html,
            }}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: review.reviewText.childMarkdownRemark.html,
          }}
        />
        <div className="text-sm text-themeDarkGray mb-2 italic text-right xl:text-base pb-8">
          {review.updatedAt}
        </div>
      </div>
      <RelatedReviews reviews={relatedReviews} />
      <RecentReviews reviews={highlightedRecentReviews} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    thisReview: contentfulReview(fields: { slug: { eq: $slug } }) {
      grade
      movieTitle
      updatedAt
      series {
        name
      }
      notableGrossness {
        childMarkdownRemark {
          html
        }
      }
      posterImage {
        file {
          url
        }
      }
      releaseDate
      reviewText {
        childMarkdownRemark {
          html
        }
      }
      summary {
        childMarkdownRemark {
          html
        }
      }
      fields {
        slug
      }
    }
    recentReviews: allContentfulReview {
      nodes {
        movieTitle
        updatedAt
        posterImage {
          file {
            url
          }
        }
        series {
          name
        }
        summary {
          summary
        }
        fields {
          slug
        }
      }
    }
  }
`
