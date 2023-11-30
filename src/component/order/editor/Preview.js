import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalButton } from 'baseui/modal';
import { Block } from 'baseui/block';
import { Radio, RadioGroup, ALIGN } from 'baseui/radio';
import { LabelSmall, HeadingXSmall } from 'baseui/typography';
import { useEditor } from '@layerhub-io/react';
import { ModalFooter } from 'react-bootstrap';
import Frame from '../../../image/icon/frame.png';
import mergeImages from 'merge-images';
import { resizedataURL } from '../../../utils';
import { getAllPreviewEffectImages } from '../../../axios/image-editor/preview-effects/PreviewEffectApi.ts';

const generateMergedImageURL = async ({ customImage, isGlow, effect }) => {
  const images = [{ src: Frame }, { src: await resizeImage(customImage), x: 412, y: 238 }];
  if (effect.src !== '') {
    images.push({
      src: await resizeImage(effect.src + '?timestamp=' + new Date().getTime()), // to avoid cors, add timestamp
      x: 412,
      y: 238,
    });
  }
  return await mergeImages(images);
};

const resizeImage = async (binary) => {
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous'; // to avoid cors
  const canvas = document.createElement('canvas');
  const resizedImageURL = await resizedataURL(img, canvas, binary, 1750, 1010).finally(
    () => img.remove() && canvas.remove(),
  );
  return resizedImageURL;
};

const Preview = ({ isOpen, setIsOpen }) => {
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    image: '',
  });
  const [previewEffects, updatePreviewEffects] = useState([]);
  const [selectedEffect, updateSelectedEffect] = useState(null);

  useEffect(() => {
    (async () => {
      const effects = await getAllPreviewEffectImages();
      updatePreviewEffects(() => [...effects]);
      updateSelectedEffect(effects[0]);
    })();
  }, []);

  const rollbackPreview = React.useCallback(async () => {
    if (!editor) return;

    // rollback frame background to white
    editor.frame.setBackgroundColor('#ffffff');

    // rollback opacity of objects to previous state
    editor.objects.list().map((obj) => (obj.opacity /= selectedEffect.opacity / 100));

    setLoading(false);
  }, [editor, selectedEffect]);

  const makePreview = async () => {
    if (!editor) return;
    // set frame background by options

    selectedEffect.name.includes('실버')
      ? editor.frame.setBackgroundColor('#9B9B9B')
      : editor.frame.setBackgroundColor('#ffffff');
    editor.objects.list().map((obj) => (obj *= selectedEffect.opacity / 100));

    const template = editor.scene.exportToJSON();
    const imageURL = await editor.renderer.render(template);
    const image = await generateMergedImageURL({
      customImage: imageURL,
      isGlow: selectedEffect.name.includes('유광'),
      effect: selectedEffect,
    });

    setState({ image });
    setLoading(false);
  };

  React.useEffect(() => {
    makePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selectedEffect]);

  const handleSave = React.useCallback(async () => {
    await rollbackPreview();

    const template = editor.scene.exportToJSON();
    const image = await editor.renderer.render(template);

    const a = document.createElement('a');
    a.href = image;
    a.download = 'liberty_frame_image.png';
    a.click();
    a.remove();
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleChangeRadio = async (e) => {
    const currentTargetValue = e.currentTarget.value;
    await rollbackPreview();
    updateSelectedEffect(previewEffects[+currentTargetValue]);
  };

  return (
    <Modal
      onClose={() => setIsOpen(false) & rollbackPreview()}
      closeable
      animate
      autoFocus
      isOpen={isOpen}
      overrides={{
        DialogContainer: {
          style: {
            backdropFilter: 'blur(8px)',
          },
        },
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
      <ModalHeader>미리보기</ModalHeader>
      <ModalBody
        $style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          height: '100%',
          position: 'relative',
        }}
      >
        <Block
          $style={{
            position: 'absolute',
            flex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        >
          <Block $style={{ width: '25%', padding: '2rem' }}>
            <Block $style={{ marginBottom: '2rem' }}>
              <HeadingXSmall>기본소재 옵션</HeadingXSmall>
              <LabelSmall>옵션 적용은 주문페이지에서 해주세요</LabelSmall>
            </Block>
            <RadioGroup
              value={previewEffects.indexOf(selectedEffect)}
              onChange={handleChangeRadio}
              align={ALIGN.vertical}
            >
              {previewEffects.map((e, idx) => (
                <Radio key={e.id} value={idx}>
                  {e.name}
                </Radio>
              ))}
            </RadioGroup>
          </Block>
          <Block
            $style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              padding: '2rem',
            }}
          >
            {!loading && <img width='100%' height='100%' src={state.image} alt='alt' />}
          </Block>
        </Block>
      </ModalBody>
      <ModalFooter style={{ padding: '12px 0', margin: '24px 20px 0' }}>
        <ModalButton kind='tertiary' onClick={() => setIsOpen(false)}>
          취소
        </ModalButton>
        <ModalButton onClick={() => handleSave()}>저장하기</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default Preview;
