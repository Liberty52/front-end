import { Block } from "baseui/block";
import useSidebarOpen from "../../../../../hooks/useSidebarOpen";
import AngleDoubleLeft from "../../icons/AngleDoubleLeft";
import { useCallback, useEffect, useState } from "react";
import { getLicenseList } from "../../../../../axios/order/editor/License";
import { useEditor } from "@layerhub-io/react";
import Scrollable from "../../common/Scrollable";
import { useStyletron } from "baseui";

const License = () => {
  const { setIsSidebarOpen } = useSidebarOpen();
  const [licenses, setLicenses] = useState([]);
  const editor = useEditor();

  useEffect(() => {
    getLicense();
  }, []);

  const getLicense = () => {
    getLicenseList().then((res) => {
      setLicenses(res.data);
      console.log(res.data);
    });
  };

  const addObject = useCallback(
    async (url) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
        };
        await editor.objects.add(options);
      }
    },
    [editor]
  );

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
      <Scrollable>
        <Block padding="0 1.5rem">
          <div
            style={{
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {licenses.map((license, index) => {
              return (
                <ImageItem
                  key={index}
                  onClick={() => addObject(license.imageUrl)}
                  preview={license.imageUrl}
                />
              );
            })}
          </div>
        </Block>
      </Scrollable>
    </Block>
  );
};

const ImageItem = ({ preview, onClick }) => {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      />
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  );
};

export default License;
