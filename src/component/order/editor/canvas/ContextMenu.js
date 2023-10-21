import { useActiveObject, useContextMenuRequest, useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import BringToFront from '../icons/BringToFront';
import Delete from '../icons/Delete';
import Duplicate from '../icons/Duplicate';
import Elements from '../icons/Elements';
import Locked from '../icons/Locked';
import Paste from '../icons/Paste';
import SendToBack from '../icons/SendToBack';
import Unlocked from '../icons/Unlocked';

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest();
  const editor = useEditor();
  const activeObject = useActiveObject();
  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>;
  }

  if (contextMenuRequest.target.type === 'Background') {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        style={{
          position: 'absolute',
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
          zIndex: 129,
          width: '240px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
          padding: '0.5rem 0',
        }}
      >
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.copy();
            editor.cancelContextMenuRequest();
          }}
          icon='Duplicate'
          label='copy'
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste();
            editor.cancelContextMenuRequest();
          }}
          icon='Paste'
          label='paste'
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.remove();
            editor.cancelContextMenuRequest();
          }}
          icon='Delete'
          label='delete'
        >
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    );
  }
  return (
    <>
      {!contextMenuRequest.target.locked ? (
        <div
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.copy();
              editor.cancelContextMenuRequest();
            }}
            icon='Duplicate'
            label='copy'
          >
            <Duplicate size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.paste();
              editor.cancelContextMenuRequest();
            }}
            icon='Paste'
            label='paste'
          >
            <Paste size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.remove();
              editor.cancelContextMenuRequest();
            }}
            icon='Delete'
            label='delete'
          >
            <Delete size={24} />
          </ContextMenuItem>
          <div style={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.bringForward();
              editor.cancelContextMenuRequest();
            }}
            icon='Forward'
            label='bring forward'
          >
            <BringToFront size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.sendBackwards();
              editor.cancelContextMenuRequest();
            }}
            icon='Backward'
            label='send backward'
          >
            <SendToBack size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.cancelContextMenuRequest();
            }}
            icon='Elements'
            label='Save as component'
          >
            <Elements size={24} />
          </ContextMenuItem>
          <div style={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock();
              editor.cancelContextMenuRequest();
            }}
            icon='Locked'
            label='lock'
          >
            <Locked size={24} />
          </ContextMenuItem>
          {activeObject?.type === 'StaticImage' && (
            <ContextMenuItem
              onClick={() => {
                editor.objects.setAsBackgroundImage();
                editor.cancelContextMenuRequest();
              }}
              icon='Images'
              label='Set as background image'
            >
              <Elements size={24} />
            </ContextMenuItem>
          )}
        </div>
      ) : (
        <div
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock();
              editor.cancelContextMenuRequest();
            }}
            icon='Unlocked'
            label='unlock'
          >
            <Unlocked size={24} />
          </ContextMenuItem>
        </div>
      )}
    </>
  );
};

const ContextMenuItem = ({ label, onClick, children, disabled = false }) => {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        display: 'flex',
        height: '32px',
        fontSize: '14px',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem',
        cursor: 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.4 : 1,
        ':hover': {
          backgroundColor: 'rgba(0,0,0,0.075)',
        },
      })}
    >
      {children} {label}
    </div>
  );
};

export default ContextMenu;
