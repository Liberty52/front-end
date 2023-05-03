import React from "react"
import { Modal, ModalBody, ModalHeader, ModalButton } from "baseui/modal"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { ModalFooter } from "react-bootstrap"
import Frame from "../image/icon/frame.png"
const Preview = ({ isOpen, setIsOpen }) => {
  
  const editor = useEditor()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    image: "",
  })

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template))
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])


  const handleSave = () => {
    const a = document.createElement("a")
    a.href = state.image
    a.download = "liberty_frame_image.png"
    a.click()
    a.remove()
    setIsOpen(false)
  }

  return (
        <Modal
        onClose={() => setIsOpen(false)}
        closeable
        animate
        autoFocus
        isOpen={isOpen}
        overrides={{
          Dialog: {
            style: {
              width: '80vw',
              height: '80vh',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <ModalHeader>Preview</ModalHeader>
        <ModalBody
            $style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            height: "100%",
            position: "relative",
            }}
        >
            <Block
            $style={{
                position: "absolute",
                flex: 1,
                height: "100%",
                width: "100%",
                display: "flex",
            }}
            >
            <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem"}}>
                    <img width="500px" height="400px" src={Frame} style={{position: "fixed", zIndex: 10}}/>
                    {!loading && <img width="350px" height="183px" src={state.image} style={{position: "relative", zIndex: 11, top: "-65px", left: "7px"}} />}
            </Block>
            </Block>
        </ModalBody>
        <ModalFooter style={{padding: '12px 0', margin: '24px 20px 0'}}>
          <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
            Cancel
          </ModalButton>
          <ModalButton onClick={() => handleSave()}>Save</ModalButton>
        </ModalFooter>
      </Modal>
  )
}

export default Preview
