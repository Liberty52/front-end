/* eslint-disable import/no-anonymous-default-export */
import React from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "../../icons/AngleDoubleLeft"
import Scrollable from "../../common/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "../DropZone"
import { useEditor } from "@layerhub-io/react"
import useSidebarOpen from "../../../../hooks/useSidebarOpen"
import {generateSlug, toBase64} from "../../../../utils"
import { toaster } from "baseui/toast"

const Uploads = () => {
  const inputFileRef = React.useRef(null)
  const [uploads, setUploads] = React.useState([])
  const editor = useEditor()
  const {setIsSidebarOpen} = useSidebarOpen()

  const handleDropFiles = async (files) => {
    const file = files[0]

    if(file.size < 4147000) {
      const msg = "This Image has bad resolution, Recommend to change the image(At least required 1920 x 1080 Resoultion)";
    
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
    }

    const base64 = (await toBase64(file))
    let preview = base64

    const upload = {
      id: generateSlug(),
      src: base64,
      preview: preview,
      type: "StaticImage",
    }

    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current.click()
  }

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files)
  }
  
  const addImageToCanvas = async (props) => {
    await editor.objects.add(props)
    editor.frame.background.fill === "#ffffff" ? editor.objects.update({opacity: 0.9}) : editor.objects.update({opacity: 0.65}) 
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
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
          <Block>Uploads</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Computer
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}

export default Uploads