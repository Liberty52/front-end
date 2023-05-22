
import EditorContainer from '../../component/order/editor/EditorContainer';
import Panels from '../../component/order/editor/panels/Panels';
import Canvas from '../../component/order/editor/canvas/Canvas';
import { BaseProvider, LightTheme } from "baseui"
import Toolbox from '../../component/order/editor/toolbax';
import Footer from '../../component/order/editor/Footer';
import { ToasterContainer, PLACEMENT } from 'baseui/toast';
import useDesignEditorContext from '../../hooks/useDesignEditorContext';
import Preview from '../../component/order/editor/Preview';
import { useEditor } from '@layerhub-io/react';
import React from 'react';


const Editor = () => {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()
  const editor = useEditor();
  
  React.useEffect(() => {
    editor?.frame.resize({
      width: 3840,
      height: 2160,
    })
  }, [editor])


  return (
    <BaseProvider theme={LightTheme}>
        <ToasterContainer placement={PLACEMENT.bottomRight}>
          {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
          <EditorContainer>
            <div style={{ display: "flex", flex: 1 }}>
              <Panels/>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                <Toolbox />
                <Canvas />
                <Footer />
              </div>
            </div>
          </EditorContainer>
        </ToasterContainer>
      </BaseProvider>
    );
}

export default Editor
