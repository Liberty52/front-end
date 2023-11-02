import { useEditor } from '@layerhub-io/react';
import useSidebarOpen from '../../../../../hooks/useSidebarOpen';
import { useCallback } from 'react';
import { Block } from 'baseui/block';
import AngleDoubleLeft from '../../icons/AngleDoubleLeft';
import Scrollable from '../../common/Scrollable';

const Text = () => {
  const { setIsSidebarOpen } = useSidebarOpen();
  const editor = useEditor();
  const addObject = useCallback(
    async (url) => {
      if (editor) {
        const options = {
          type: 'StaticImage',
          src: url,
        };
        await editor.objects.add(options);
      }
    },
    [editor],
  );
  return (
    <Block $style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Block
        $style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}
      >
        <Block>텍스트</Block>
        <Block
          onClick={() => setIsSidebarOpen(false)}
          $style={{ cursor: 'pointer', display: 'flex' }}
        >
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding='0 1.5rem'>
          <div
            style={{
              display: 'grid',
              gap: '8px',
              gridTemplateColumns: '1fr 1fr',
            }}
          ></div>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Text;
