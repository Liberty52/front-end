
import EditorContainer from '../../component/editor/EditorContainer';
import Panels from '../../component/editor/panels/Panels';
import Canvas from '../../component/editor/canvas/Canvas';
import { BaseProvider, LightTheme } from "baseui"
import Toolbox from '../../component/editor/toolbax';
import Footer from '../../component/editor/Footer';


const Editor = () => {
    return (
      <BaseProvider theme={LightTheme}>
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
