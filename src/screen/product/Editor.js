
import EditorContainer from '../../component/editor/EditorContainer';
import Panels from '../../component/editor/panels/Panels';



const Editor = () => {
    return (
        <EditorContainer>
          <div style={{ display: "flex", flex: 1 }}>
            <Panels/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            </div>
          </div>
        </EditorContainer>
      );
}

export default Editor
