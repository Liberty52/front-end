import { useContext } from 'react';
import { DesignEditorContext } from '../contexts/DesignEditor';

const useSidebarOpen = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useContext(DesignEditorContext);
  return { setIsSidebarOpen, isSidebarOpen };
};

export default useSidebarOpen;
