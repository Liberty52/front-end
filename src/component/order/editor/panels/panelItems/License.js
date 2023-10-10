import { Block } from "baseui/block";
import useSidebarOpen from "../../../../../hooks/useSidebarOpen";
import AngleDoubleLeft from "../../icons/AngleDoubleLeft";

const License = () => {
  const { setIsSidebarOpen } = useSidebarOpen();
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>라이센스</Block>

        <Block
          onClick={() => setIsSidebarOpen(false)}
          $style={{ cursor: "pointer", display: "flex" }}
        >
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
    </Block>
  );
};

export default License;
