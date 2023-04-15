import React from "react"
import { Block } from "baseui/block"
import panelItems from "./panelItems"
import useAppContext from "../../../hooks/useAppContext"
import useSidebarOpen from "../../../hooks/useSidebarOpen"

const PanelsList = () => {
  const [state, setState] = React.useState({ panel: "Images" })
  const {isSidebarOpen} = useSidebarOpen()
  const { activePanel, activeSubMenu } = useAppContext()

  React.useEffect(() => {
    setState({ panel: activePanel })
  }, [activePanel])

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu })
    } else {
      setState({ panel: activePanel })
    }
  }, [activeSubMenu])

  const Component = panelItems[state.panel]
  return (
    <Block
      id="EditorPanelItem"
      $style={{
        background: "#ffffff",
        width: isSidebarOpen ? "306px" : 0,
        flex: "none",
        borderRight: "1px solid #d7d8e3",
        display: "flex",
        transition: "ease width 0.1s",
        overflow: "hidden",
      }}
    >
      {Component && <Component />}
    </Block>
  )
}

export default PanelsList
