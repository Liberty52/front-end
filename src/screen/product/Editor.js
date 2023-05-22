
import EditorContainer from '../../component/editor/EditorContainer';
import Panels from '../../component/editor/panels/Panels';
import Canvas from '../../component/editor/canvas/Canvas';
import { BaseProvider, LightTheme } from "baseui"
import Toolbox from '../../component/editor/toolbax';
import Footer from '../../component/editor/Footer';
import { ToasterContainer, PLACEMENT } from 'baseui/toast';
import useDesignEditorContext from '../../hooks/useDesignEditorContext';
import Preview from '../../component/Preview';
import { useEditor } from '@layerhub-io/react';
import React from 'react';
import useAppContext from '../../hooks/useAppContext';


const Editor = () => {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()
  const editor = useEditor();
  const {frameOption} = useAppContext();
  
  React.useEffect(() => {
    editor?.frame.resize({
      width: 3840,
      height: 2160,
    })

    frameOption.additionalMaterial.includes("실버") ? editor?.frame.setBackgroundColor("#9B9B9B") : editor?.frame.setBackgroundColor("#ffffff")
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
