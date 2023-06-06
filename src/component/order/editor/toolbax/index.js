import React from 'react'
import { useActiveObject, useEditor } from '@layerhub-io/react'
import { getSelectionType } from '../../../../utils'
import { styled } from 'baseui'
import Items from './items'
import useAppContext from '../../../../hooks/useAppContext'
import { useNavigate } from 'react-router'

const DEFAULT_TOOLBOX = 'Canvas'

const Container = styled('div', (props) => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  height: '50px',
  display: 'flex',
}))

const Toolbox = () => {
  const [state, setState] = React.useState({ toolbox: 'Text' })
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject()
  const editor = useEditor()
  const navagate = useNavigate()

  React.useEffect(() => {
    const selectionType = getSelectionType(activeObject)
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ toolbox: 'Multiple' })
      } else {
        setState({ toolbox: selectionType[0] })
      }
    } else {
      setState({ toolbox: DEFAULT_TOOLBOX })
      setActiveSubMenu('')
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        const selectionType = getSelectionType(activeObject)

        if (selectionType.length > 1) {
          setState({ toolbox: 'Multiple' })
        } else {
          setState({ toolbox: selectionType[0] })
        }
      }
    }
    if (editor) {
      editor.on('history:changed', watcher)
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher)
      }
    }
  }, [editor, activeObject])

  const Component = Items[state.toolbox]

  return (
    <Container>
      <button onClick={() => navagate('/order')}>뒤로가기</button>
      {Component ? <Component /> : ''}
    </Container>
  )
}

export default Toolbox
