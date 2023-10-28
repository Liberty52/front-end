import React from 'react';
import { Block } from 'baseui/block';
import AngleDoubleLeft from '../../icons/AngleDoubleLeft';
import useSidebarOpen from '../../../../../hooks/useSidebarOpen';
import { Button, SIZE } from 'baseui/button';
import Scrollable from '../../common/Scrollable';
import { Modal, ROLE } from 'baseui/modal';
import { useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import { postImageGeneration } from '../../../../../axios/order/editor/AI';
import CenterCircularProgress from '../../../../common/CenterCircularProgress';
import { ACCESS_TOKEN } from '../../../../../constants/token';
import { CircularProgress } from '@mui/joy';
import { postTranslation } from '../../../../../axios/order/editor/Translation';

export default function AI() {
  const editor = useEditor();
  const [images, setImages] = React.useState([]);
  const [generationIsLoading, setGenerationIsLoading] = React.useState(false);
  const { setIsSidebarOpen } = useSidebarOpen();
  const addObject = React.useCallback(
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
  const addImages = (newImages) => {
    setImages((data) => [...data, ...newImages]);
  };
  return (
    <Block $style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CenterCircularProgress isConfirmProgressing={generationIsLoading} />

      <Block
        $style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}
      >
        <Block>AI</Block>

        <Block
          onClick={() => setIsSidebarOpen(false)}
          $style={{ cursor: 'pointer', display: 'flex' }}
        >
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      {sessionStorage.getItem(ACCESS_TOKEN) ? (
        <Scrollable>
          <Block padding='0 1.5rem'>
            <AITemplate addImages={addImages} setIsLoading={setGenerationIsLoading} />
          </Block>
          <Block padding='0 1.5rem'>
            <div
              style={{
                display: 'grid',
                gap: '8px',
                gridTemplateColumns: '1fr 1fr',
                marginTop: '10px',
              }}
            >
              {images.map((image, index) => {
                return <ImageItem key={index} onClick={() => addObject(image)} preview={image} />;
              })}
            </div>
          </Block>
        </Scrollable>
      ) : (
        <Block style={{ alignSelf: 'center' }}>로그인 후 사용 가능합니다.</Block>
      )}
    </Block>
  );
}
let translationTimeout = 1234;
const AITemplate = ({ addImages, setIsLoading: setGenerationIsLoading }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');
  const [isTranslationLoading, setTranslationIsLoading] = React.useState(false);
  const [translated, setTranslated] = React.useState('');
  const [isGenerationButtonDisabled, setIsGenerationButtonDisabled] = React.useState(true);
  const [generationDisabledCause, setGenerationDisabledCause] = React.useState('');
  const [sourceLang, setSourceLang] = React.useState('감지');

  React.useEffect(() => {
    const doTranslate = async () => {
      setTranslationIsLoading(true);
      const [{ source, translatedText }, err] = await postTranslation(prompt);
      if (err) {
        setTranslated('');
        setIsGenerationButtonDisabled(true);
        setGenerationDisabledCause('서버와의 연결이 원활하지 않습니다.');
      } else {
        setSourceLang(source);
        setTranslated(translatedText);
        setIsGenerationButtonDisabled(false);
      }
      setTranslationIsLoading(false);
    };
    window.clearTimeout(translationTimeout);
    setIsGenerationButtonDisabled(true);
    if (prompt.length < 10 || prompt.length > 5000) {
      if (prompt.length < 10) {
        setGenerationDisabledCause('10 자 이상 입력해주세요.');
      } else {
        setGenerationDisabledCause('5000 자 이하로 입력해주세요.');
      }
    } else {
      setGenerationDisabledCause('');
      const newt = window.setTimeout(doTranslate, 700);
      translationTimeout = newt;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  React.useEffect(() => {
    if (translated.length < 10 || translated.length > 1000) {
      setIsGenerationButtonDisabled(true);
    } else {
      setIsGenerationButtonDisabled(false);
    }
  }, [translated]);

  const onGenerationButtonClicked = async () => {
    try {
      setGenerationIsLoading(true);
      const urls = await postImageGeneration(translated);
      addImages(urls);
    } finally {
      setGenerationIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={SIZE.compact}
        overrides={{
          Root: {
            style: {
              width: '100%',
            },
          },
        }}
      >
        Generate Image
      </Button>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable={true}
        isOpen={isOpen}
        animate
        autoFocus
        size='auto'
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              borderTopRightRadius: '8px',
              borderEndStartRadius: '8px',
              borderEndEndRadius: '8px',
              borderStartEndRadius: '8px',
              borderStartStartRadius: '8px',
              padding: '20px',
              paddingTop: '50px',
              width: '80vw',
            },
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <h1 style={{ alignSelf: 'center' }}>AI 이미지 생성</h1>
          <p>나만의 이미지를 텍스트로 표현해보세요. AI가 이미지를 생성해줍니다. ({sourceLang})</p>
          <input type='text' onChange={(e) => setPrompt(e.target.value)} value={prompt} />
          <br />
          <p>다음과 같이 번역되어 이미지가 생성됩니다.</p>
          <p>번역: {translated}</p>
          <div
            style={{
              alignSelf: 'end',
              marginTop: '20px',
            }}
          >
            {isTranslationLoading ? (
              <CircularProgress style={{ alignSelf: 'flex-end' }} />
            ) : (
              <>
                <span
                  hidden={!isGenerationButtonDisabled}
                  style={{
                    marginRight: '10px',
                    color: 'red',
                  }}
                >
                  {generationDisabledCause}
                </span>
                <button
                  disabled={isGenerationButtonDisabled}
                  style={{
                    padding: '10px',
                    borderRadius: '10px ',
                    color: 'white',
                    backgroundColor: isGenerationButtonDisabled ? 'lightgray' : 'black',
                  }}
                  onClick={onGenerationButtonClicked}
                >
                  생성하기
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

const ImageItem = ({ preview, onClick }) => {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: 'relative',
        background: '#f8f8fb',
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
        '::before:hover': {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          height: '100%',
          width: '100%',
          ':hover': {
            opacity: 1,
          },
        })}
      />
      <img
        src={preview}
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          verticalAlign: 'middle',
        })}
        alt='x'
      />
    </div>
  );
};
