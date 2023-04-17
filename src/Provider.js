import React from "react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { AppProvider } from "./contexts/AppContext"
import {DesignEditorProvider} from "./contexts/DesignEditor.js"
// import "./translations"

const engine = new Styletron()

const Provider = ({ children }) => {
  return (
    <React.Fragment>
        <DesignEditorProvider>
            <AppProvider>
                <StyletronProvider value={engine}>
                  {children}
                </StyletronProvider>
            </AppProvider>
        </DesignEditorProvider>
      </React.Fragment>
  )
}

export default Provider
