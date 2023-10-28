import React from 'react';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND } from 'baseui/button';
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip';
import SaveIcon from '@mui/icons-material/Save';
import useDesignEditorContext from '../../../../../hooks/useDesignEditorContext';
import { StatefulPopover } from 'baseui/popover';
import { useNavigate } from 'react-router';

const Canvas = () => {
  const { setDisplayPreview } = useDesignEditorContext();
  const navigate = useNavigate();

  const showPreview = () => {
    setDisplayPreview(true);
  };

  return (
    <Block
      $style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
      }}
    >
      <Block>
        <StatefulPopover placement={PLACEMENT.bottom}>
          <Block>
            <StatefulTooltip
              placement={PLACEMENT.bottom}
              showArrow={true}
              accessibilityType='tooltip'
            >
              <Button size={SIZE.compact} kind={KIND.tertiary} onClick={() => navigate('/order')}>
                상품 페이지로 돌아가기
              </Button>
            </StatefulTooltip>
          </Block>
        </StatefulPopover>
      </Block>
      <Block $style={{ display: 'flex', alignItems: 'center' }}>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType='tooltip'
          content='Save Canvas'
        >
          <Button onClick={() => showPreview()} size={SIZE.mini} kind={KIND.tertiary}>
            <SaveIcon size={22} />
          </Button>
        </StatefulTooltip>
      </Block>
    </Block>
  );
};

export default Canvas;
