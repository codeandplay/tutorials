import React, { useState } from "react"
import '@styles/main.scss'
import CustomAccordion from '@components/accordion'

const accordionData = [
  {
    title: (
      <>Accordion 1</>
    ),
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </>
    )
  },
  {
    title: (
      <>Accordion 2</>
    ),
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </>
    )
  },
  {
    title: (
      <>Accordion 3</>
    ),
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </>
    )
  },
]

const IndexPage = () => {

  return (
    <main>
      <header>
        <h1>Gatsby Custom Accordion</h1>
        <h3>By: Code And Play</h3>
      </header>

      <section>
        {accordionData && accordionData.map((data, i) => (
          <CustomAccordion
            key={i}
            title={data.title}
            content={data.content}
          />
        ))}
      </section>
    </main>
  )
}


export default IndexPage

export const Head = () => <title>Gatsby Custom Accordion</title>