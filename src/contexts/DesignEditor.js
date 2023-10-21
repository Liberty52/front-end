import React from 'react';

export const DesignEditorContext = React.createContext({
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  currentDesign: {
    id: '',
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: '',
    preview: '',
    scenes: [],
    type: '',
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  editorType: 'NONE',
  setEditorType: () => {},
  displayPlayback: false,
  setDisplayPlayback: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: '',
  setCurrentPreview: () => {},
  maxTime: 0,
  setMaxTime: () => {},
  contextMenuTimelineRequest: {
    id: '',
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuTimelineRequest: () => {},
  contextMenuSceneRequest: {
    id: '',
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuSceneRequest: () => {},
});

export const DesignEditorProvider = ({ children }) => {
  const [scenes, setScenes] = React.useState([]);
  const [currentScene, setCurrentScene] = React.useState(null);
  const [currentDesign, setCurrentDesign] = React.useState({
    id: '',
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: '',
    preview: '',
    scenes: [],
    type: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [editorType, setEditorType] = React.useState('NONE');
  const [displayPlayback, setDisplayPlayback] = React.useState(false);
  const [displayPreview, setDisplayPreview] = React.useState(false);
  const [currentPreview, setCurrentPreview] = React.useState('');
  const [maxTime, setMaxTime] = React.useState(5000);
  const [contextMenuTimelineRequest, setContextMenuTimelineRequest] = React.useState({
    id: '',
    left: 0,
    top: 0,
    visible: false,
  });
  const [contextMenuSceneRequest, setContextMenuSceneRequest] = React.useState({
    id: '',
    left: 0,
    top: 0,
    visible: false,
  });
  const context = {
    scenes,
    setScenes,
    currentScene,
    setCurrentScene,
    currentDesign,
    setCurrentDesign,
    isSidebarOpen,
    setIsSidebarOpen,
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
  };

  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>;
};
