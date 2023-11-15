import React from 'react';
import { styled } from 'baseui';
import RemoveCircleOutline from './icons/RemoveCircleOutline';
import AddCircleOutline from './icons/AddCircleOutline';
import { Button, KIND, SIZE } from 'baseui/button';
import { Slider } from 'baseui/slider';
import { useEditor, useZoomRatio } from '@layerhub-io/react';
import { StatefulTooltip } from 'baseui/tooltip';
import { Block } from 'baseui/block';
import { PLACEMENT } from 'baseui/toast';

const Container = styled('div', ({ $theme }) => ({
  height: '50px',
  background: $theme.colors.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Common = () => {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = React.useState({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  });
  const editor = useEditor();
  const zoomRatio = useZoomRatio();

  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) });
  }, [zoomRatio]);

  // const handleChange = (type, value) => {
  //   if (editor) {
  //     if (type.includes('emp')) {
  //       setOptions({ ...options, zoomRatioTemp: value });
  //     }
  //   }
  // };

  const applyZoomRatio = (type, e) => {
    const value = e.target.value;
    if (editor) {
      if (value === '') {
        setOptions({ ...options, zoomRatio: options.zoomRatio, zoomRatioTemp: options.zoomRatio });
      } else {
        let parsedValue = parseFloat(value);

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100);
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100);
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100);
        }
      }
    }
  };

  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={'tooltip'}
          content='Zoom Out'
        >
          <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomOut()}>
            <RemoveCircleOutline size={24} />
          </Button>
        </StatefulTooltip>
      </Block>
      <Slider
        overrides={{
          InnerThumb: () => null,
          ThumbValue: () => null,
          TickBar: () => null,
          Root: {
            style: { width: '140px' },
          },
          Thumb: {
            style: {
              height: '12px',
              width: '12px',
              paddingLeft: 0,
            },
          },
          Track: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        }}
        value={[options.zoomRatio]}
        onChange={({ value }) => applyZoomRatio('zoomRatio', { target: { value: value[0] } })}
        min={zoomMin}
        max={zoomMax}
      />
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={'tooltip'}
          content='Zoom Out'
        >
          <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomIn()}>
            <AddCircleOutline size={24} />
          </Button>
        </StatefulTooltip>
      </Block>
    </Container>
  );
};

export default Common;
