import React, { createContext, useState } from "react";

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
  frameOption: {},
  setFrameOption: () => {},
});

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(undefined);
  const [templates, setTemplates] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [activePanel, setActivePanel] = useState("Images");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [frameOption, setFrameOption] = useState({});
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
    frameOption,
    setFrameOption,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
