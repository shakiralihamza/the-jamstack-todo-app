import React from "react"
import {ContextProvider} from "./src/context/MyContext";
import type {GatsbyBrowser} from "gatsby"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
                                                                      element,
                                                                  }) => {
    return (
        <ContextProvider>
            {element}
        </ContextProvider>
    )
}
