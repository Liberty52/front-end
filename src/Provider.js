import React from "react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as ScenifyProvider } from "@layerhub-io/react"
import { Provider as StyletronProvider } from "styletron-react"
import { AppProvider } from "./contexts/AppContext"
import {DesignEditorProvider} from "./contexts/DesignEditor.js"
import { ToasterContainer, PLACEMENT } from "baseui/toast"

const engine = new Styletron()

const Provider = ({ children }) => {
  return (
    <React.Fragment>
        <DesignEditorProvider>
            <AppProvider>
              <ScenifyProvider>
                <StyletronProvider value={engine}>
                  <ToasterContainer placement={PLACEMENT.bottomRight}>
                  {children}
                  </ToasterContainer>
                </StyletronProvider>
              </ScenifyProvider>
            </AppProvider>
        </DesignEditorProvider>
      </React.Fragment>
  )
}

export default Provider
