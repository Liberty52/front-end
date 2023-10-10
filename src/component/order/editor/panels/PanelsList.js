import { useStyletron, styled } from "baseui";
import Icons from "../icons";
import { Block } from "baseui/block";
import useAppContext from "../../../../hooks/useAppContext";
import Scrollable from "../common/Scrollable";
import useSidebarOpen from "../../../../hooks/useSidebarOpen";

const Container = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.primary100,
  display: "flex",
  flex: "none",
}));

const BASE_ITEMS = [
  {
    id: "images",
    name: "Images",
    label: "샘플 이미지",
  },
  {
    id: "uploads",
    name: "Uploads",
    label: "업로드",
  },
  {
    id: "customize",
    name: "Customize",
    label: "프레임 설정",
  },
  {
    id: "layers",
    name: "Layers",
    label: "레이어",
  },
  {
    id: "ai",
    name: "AI",
    label: "AI",
  },
  {
    id: "license",
    name: "License",
    label: "라이센스",
  },
];

const PanelsList = () => {
  const { activePanel } = useAppContext();
  const PANEL_ITEMS = BASE_ITEMS;

  return (
    <Container>
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            label={panelListItem.label}
            name={panelListItem.name}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </Container>
  );
};

const PanelListItem = ({ label, icon, activePanel, name }) => {
  const { setActivePanel } = useAppContext();
  const { setIsSidebarOpen } = useSidebarOpen();
  const [css, theme] = useStyletron();
  const Icon = Icons[icon];

  return (
    <Block
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true);
        setActivePanel(name);
      }}
      $style={{
        width: "80px",
        height: "80px",
        backgroundColor:
          name === activePanel ? theme.colors.white : theme.colors.primary100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transition: "all 1s",
        },
      }}
    >
      <Icon size={24} />
      <div>{label}</div>
    </Block>
  );
};

export default PanelsList;
