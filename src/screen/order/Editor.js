
import EditorContainer from '../../component/order/editor/EditorContainer';
import Panels from '../../component/order/editor/panels/Panels';
import Canvas from '../../component/order/editor/canvas/Canvas';
import { BaseProvider, LightTheme } from "baseui"
import Toolbox from '../../component/order/editor/toolbax';
import Footer from '../../component/order/editor/Footer';
import useDesignEditorContext from '../../hooks/useDesignEditorContext';
import Preview from '../../component/order/editor/Preview';
import { useEditor } from '@layerhub-io/react';
import React from 'react';
import { detectMobByWindowWidth } from '../../utils';
import { useNavigate } from 'react-router';
import { toaster } from "baseui/toast"


const Editor = () => {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()
  const editor = useEditor();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if(detectMobByWindowWidth()) {
      const msg = "You cannot access the editor page with your current device. Please switch to a wider device for better compatibility.";
    
      const toastKey = toaster.warning(
        <>
          {msg}
        </>,
        {
          onClose: () => toaster.clear(toastKey),
          overrides: {
            InnerContainer: {
              style: { width: "100%" }
            }
          }
        }
      );
      toaster.update(toastKey, {
        children: (
          <>
            {msg}
          </>
        )
        })
      navigate(-1)
    }
  }, [])

  React.useEffect(() => {
    editor?.frame.resize({
      width: 3840,
      height: 2160,
    })
  }, [editor])


  return (
    <BaseProvider theme={LightTheme}>
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
      </BaseProvider>
    );
}

export default Editor
