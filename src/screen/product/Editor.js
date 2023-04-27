
import EditorContainer from '../../component/editor/EditorContainer';
import Panels from '../../component/editor/panels/Panels';
import Canvas from '../../component/editor/canvas/Canvas';
import { BaseProvider, LightTheme } from "baseui"
import Toolbox from '../../component/editor/toolbax';
import Footer from '../../component/editor/Footer';
import { ToasterContainer, PLACEMENT } from 'baseui/toast';


const Editor = () => {
    return (
      <BaseProvider theme={LightTheme}>
          <ToasterContainer placement={PLACEMENT.bottomRight}>
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
