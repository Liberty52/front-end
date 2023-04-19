
import * as React from 'react';
import {Box, Radio, RadioGroup, Sheet, Input, Checkbox} from "@mui/joy";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {useState} from "react";

function PaymentMethod(props) {

    const handleChange = (e) => {
        props.setPayment(e.target.value);
    };

    return (
        <Box sx={{ width: 500, marginBottom: 3 }}>
            <RadioGroup
                defaultValue="card"
                size="sm"
                sx={{ justifyContent: 'space-around'}}
                orientation="horizontal"
            >
                {[{value:'card', label:'신용카드'}, {value:'vbank', label:'가상계좌'}].map((element) => (
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
                            onChange={handleChange}
                            slotProps={{
                                label: ({ checked }) => ({
                                    sx: {
                                        fontWeight: 'md',
                                        fontSize: 'sm',
                                        color: checked ? 'text.primary' : 'text.secondary',
                                    },
                                }),
                                action: ({ checked }) => ({
                                    sx: (theme) => ({
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
        </Box>
    );
}

function VBankContent() {
    return(
        <div>
            <Select
                indicator={<KeyboardArrowDown />}
                sx={{
                    width: 400,
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                    fontSize: 13,
                    minHeight: '34px',
                }}
                defaultValue="vbank_account">
                <Option
                    value="vbank_account"
                    sx={{
                        fontSize: 12,
                    }}
                >(예시) 하나은행 25691006208604 블룸즈베리랩</Option>
            </Select>

            <Box
                sx={{
                    width: 400,
                    py: 2,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                <Input
                    sx={{
                        fontSize: 12,
                        minHeight: '34px',
                        "--Input-focusedThickness": "1px",
                    }}
                    placeholder="입금자명 (미입력시 주문자명)" variant="outlined" color="neutral" />
            </Box>

            <Box>
                <Checkbox
                    sx={{
                        fontSize: 11,
                    }}
                    label="현금영수증 신청" size="sm" variant="soft" />
            </Box>
        </div>
    );
}

export default function PaymentInfo(props) {
    const [selectedPayment, setSelectedPayment] = useState("card");

    const setPayment = (payment) => {
        setSelectedPayment(payment);
        props.setPayment(payment);
    }

    return (
        <div className="confirm-info">
            <div className="title">결제 수단</div>
            <div className="content">
                <div className="payment-info">
                    <PaymentMethod setPayment={setPayment} />
                    {selectedPayment === 'vbank' && <VBankContent/> }
                </div>
            </div>
        </div>
    );
}