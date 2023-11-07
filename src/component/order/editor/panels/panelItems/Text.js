import React from 'react';
import { Button, SIZE } from 'baseui/button';
import { useEditor } from '@layerhub-io/react';
import { loadFonts } from '../../../../../utils/font';
import { nanoid } from 'nanoid';
import { Block } from 'baseui/block';
import AngleDoubleLeft from '../../icons/AngleDoubleLeft';
import Scrollable from '../../common/Scrollable';
import useSidebarOpen from '../../../../../hooks/useSidebarOpen';

const Text = () => {
  const editor = useEditor();
  const { setIsSidebarOpen } = useSidebarOpen();
  const addObject = async () => {
    if (editor) {
      const font = {
        name: 'OpenSans-Regular',
        url: 'https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf',
      };
      await loadFonts([font]);
      const options = {
        id: nanoid(),
        type: 'StaticText',
        width: 420,
        text: 'Add some text',
        fontSize: 92,
        fontFamily: font.name,
        textAlign: 'center',
        fontStyle: 'normal',
        fontURL: font.url,
        fill: '#333333',
        metadata: {},
      };
      editor.objects.add(options);
    }
  };

  return React.createElement(
    Block,
    { $style: { flex: 1, display: 'flex', flexDirection: 'column' } },
    React.createElement(
      Block,
      {
        $style: {
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        },
      },
      React.createElement(Block, null, 'Text'),
      React.createElement(
        Block,
        { onClick: () => setIsSidebarOpen(false), $style: { cursor: 'pointer', display: 'flex' } },
        React.createElement(AngleDoubleLeft, { size: 18 }),
      ),
    ),
    React.createElement(
      Scrollable,
      null,
      React.createElement(
        Block,
        { padding: '0 1.5rem' },
        React.createElement(
          Button,
          {
            onClick: addObject,
            size: SIZE.compact,
            overrides: {
              Root: {
                style: {
                  width: '100%',
                },
              },
            },
          },
          'Add text',
        ),
      ),
    ),
  );
};

export default Text;
