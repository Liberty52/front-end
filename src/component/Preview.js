import React from "react"
import { Modal, ModalBody, SIZE, ROLE, ModalHeader, ModalButton } from "baseui/modal"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { ModalFooter } from "react-bootstrap"
import Frame from "../image/icon/frame.png"
import { toaster } from "baseui/toast"
import axios from "axios"
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
      console.log(image)
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])


  const handleSave = () => {
    // TODO separate each situations that occur success case or fail case
    let msg = "successfully saved image";
    let toastKey;
    axios.post('/upload-image', {
      image: state
    }).then(response => {
      toastKey = toaster.info(
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
    }).catch(error => {
      msg = "failed uploading the image"
      toastKey = toaster.info(
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
    })


    toaster.update(toastKey, {
      children: (
        <>
          {msg}
        </>
      )
      })
    
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
                    {!loading && <img width="350px" height="183px" src={state.image} style={{position: "relative", zIndex: 11, top: "-65px", left: "7px", opacity: "50%"}} />}
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
