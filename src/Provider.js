import React from "react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { BaseProvider, LightTheme } from "baseui"
import { AppProvider } from "./contexts/AppContext"
import {DesignEditorProvider} from "./contexts/DesignEditor.js"
// import "./translations"

const engine = new Styletron()

const Provider = ({ children }) => {
  return (
      <DesignEditorProvider>
          <AppProvider>
              <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                {children}
                </BaseProvider>
              </StyletronProvider>
          </AppProvider>
      </DesignEditorProvider>
  )
}

export default Provider
