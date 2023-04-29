import './PaymentInfo.css';
import * as React from 'react';
import { Box, Radio, RadioGroup, Sheet, Input } from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '../../../component/Checkbox';
import { useEffect, useState } from 'react';
import { getVBankInfos } from '../../../axios/shopping/Payment';

function PaymentMethod(props) {
  const onPMChanged = e => {
    props.setPaymentMethod(e.target.value);
  };

  return (
    <RadioGroup
      defaultValue="card"
      size="sm"
      sx={{ justifyContent: 'space-around' }}
      orientation="horizontal"
    >
      {[
        { value: 'card', label: '신용카드' },
        { value: 'vbank', label: '가상계좌' },
      ].map(element => (
        <Sheet
          key={element.value}
          sx={{
            width: 130,
            textAlign: 'center',
            fontSize: 11,
            p: 0.5,
            borderRadius: 'sm',
            boxShadow: 'sm',
            bgcolor: 'background.body',
          }}
        >
          <Radio
            label={element.label}
            overlay
            disableIcon
            value={element.value}
            onChange={onPMChanged}
            slotProps={{
              label: ({ checked }) => ({
                sx: {
                  fontWeight: 'md',
                  fontSize: 'sm',
                  color: checked ? 'text.primary' : 'text.secondary',
                },
              }),
              action: ({ checked }) => ({
                sx: theme => ({
                  ...(checked && {
                    '--variant-borderWidth': '2px',
                    '&&': {
                      // && to increase the specificity to win the base :hover styles
                      borderColor: theme.vars.palette.primary[500],
                    },
                  }),
                }),
              }),
            }}
          />
        </Sheet>
      ))}
    </RadioGroup>
  );
}

function VBankContent(props) {
  const [vbankInfos, setVbankInfos] = useState({
    vbankInfos: [{ account: '' }],
  });

  useEffect(() => {
    const fetchVBankInfo = async () => {
      try {
        const vbankList = await getVBankInfos();
        setVbankInfos(vbankList.data);
      } catch (e) {
        console.log(e);
        alert('가상계좌 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchVBankInfo();
  }, []);

  const [isCashReceiptChecked, setIsCashReceiptChecked] = useState(false);
  const handleCheckBoxChange = event => {
    setIsCashReceiptChecked(event.target.checked);
    props.setIsCashReceipt(event.target.checked);
  };

  const onAccountChange = (e, value) => {
    props.setVBankAccount(value);
  };

  const onDepositorChange = e => {
    props.setDepositorName(e.target.value);
  };

  return (
    <div className="bank-content">
      <Select
        indicator={<KeyboardArrowDown />}
        sx={{
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
          fontSize: 13,
          minHeight: '34px',
        }}
        onChange={onAccountChange}
        placeholder={'가상계좌를 선택해주세요.'}
      >
        {vbankInfos.vbankInfos.map(vBank => (
          <Option
            key={vBank.account}
            value={vBank.account}
            sx={{
              fontSize: 13,
            }}
          >
            {vBank.account}
          </Option>
        ))}
      </Select>

      <Box
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Input
          sx={{
            fontSize: 13,
            minHeight: '34px',
            '--Input-focusedThickness': '1px',
          }}
          onChange={onDepositorChange}
          placeholder="입금자명 (미입력시 주문자명)"
          variant="outlined"
          color="neutral"
        />
      </Box>
      <Checkbox
        text="현금영수증 신청"
        onChange={handleCheckBoxChange}
        checked={isCashReceiptChecked}
      />
    </div>
  );
}

export default function PaymentInfo(props) {
  const { PM_CARD, PM_VBANK, defaultVBankAccount, defaultDepositorName } =
    props.constants;

  const [pm, setPm] = useState({ pm: PM_CARD });

  const setPaymentMethod = newPaymentMethod => {
    props.setPayment(prevState => {
      return { ...prevState, paymentMethod: newPaymentMethod };
    });
    setPm(newPaymentMethod);

    if (newPaymentMethod === PM_CARD) {
      setVBankAccount(defaultVBankAccount);
      setDepositorName(defaultDepositorName);
    }
  };

  const setVBankAccount = newAccount => {
    props.setPayment(prevState => {
      return { ...prevState, vBankAccount: newAccount };
    });
  };

  const setDepositorName = newDepositor => {
    props.setPayment(prevState => {
      return { ...prevState, depositorName: newDepositor };
    });
  };

  const setIsCashReceipt = newValue => {
    props.setPayment(prevState => {
      return { ...prevState, isCashReceipt: newValue };
    });
  };

  return (
    <div className="confirm-info">
      <div className="title">결제 수단</div>
      <div className="content">
        <div className="payment-info">
          <PaymentMethod setPaymentMethod={setPaymentMethod} />
          {pm === PM_VBANK && (
            <VBankContent
              setVBankAccount={setVBankAccount}
              setDepositorName={setDepositorName}
              setIsCashReceipt={setIsCashReceipt}
            />
          )}
        </div>
      </div>
    </div>
  );
}
