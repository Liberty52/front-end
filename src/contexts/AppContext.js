import React, { createContext, useState } from "react"


export const AppContext = createContext({
  isMobile: false,
  setIsMobile: () => {},
  templates: [],
  setTemplates: () => {},
  uploads: [],
  setUploads: () => {},
  shapes: [],
  setShapes: () => {},
  activePanel: "Images",
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: (value) => {},
  currentTemplate: {},
  setCurrentTemplate: {},
})

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(undefined)
  const [templates, setTemplates] = useState([])
  const [uploads, setUploads] = useState([])
  const [shapes, setShapes] = useState([])
  const [activePanel, setActivePanel] = useState("Images")
  const [activeSubMenu, setActiveSubMenu] = useState(null)
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const context = {
    isMobile,
    setIsMobile,
    templates,
    setTemplates,
    activePanel,
    setActivePanel,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu,
    uploads,
    setUploads,
    currentTemplate,
    setCurrentTemplate,
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
