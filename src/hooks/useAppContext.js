import { useContext, createContext } from "react"

const AppContext = createContext({
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

const useAppContext = () => {
  const {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu,
    uploads,
    setUploads,
    currentTemplate,
    setCurrentTemplate,
  } = useContext(AppContext)
  return {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu,
    uploads,
    setUploads,
    currentTemplate,
    setCurrentTemplate,
  }
}

export default useAppContext
