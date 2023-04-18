
import EditorContainer from '../../component/editor/EditorContainer';
import Panels from '../../component/editor/panels/Panels';
import { BaseProvider, LightTheme } from "baseui"


const Editor = () => {
    return (
      <BaseProvider theme={LightTheme}>
          <EditorContainer>
            <div style={{ display: "flex", flex: 1 }}>
              <Panels/>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
              </div>
            </div>
          </EditorContainer>
        </BaseProvider>
      );
}

export default Editor
