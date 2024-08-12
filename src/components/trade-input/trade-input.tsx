import { useRef, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Input, alpha, BoxProps, MenuItem, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { fTextNumber } from "src/utils/format-number";

export interface TradeInputProps extends BoxProps {
    label?: string;
    currentType?: string;
    inputValue?: string;
    onInputChange?: (v: string) => void;
    readOnly?: boolean;
    multiOptions?: string[];
    selectedMultiOption?: string;
    onMultiOptionChange?: (v: string) => void;
}

export default function TradeInput({
    label = '',
    currentType = '',
    inputValue = '',
    onInputChange,
    readOnly = false,
    multiOptions = [],
    selectedMultiOption = "",
    onMultiOptionChange,
    sx,
    ...other
}: TradeInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const isFocused = useBoolean(false);
    const [value, setValue] = useState<string>(inputValue);
    const handleTouchElement = () => {
        console.log('Touched');
        if (inputRef.current) {
            inputRef.current?.focus();
        }
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Value changed', event.target.value, fTextNumber(event.target.value));
        if (fTextNumber(event.target.value) === false) return;
        setValue(event.target.value);
        if (onInputChange) {
            onInputChange(event.target.value);
        }
    }

    const handleMultiOptionChange = (event: SelectChangeEvent) => {
        if (onMultiOptionChange) {
            onMultiOptionChange(event.target.value);
        }
    }

    return <Box sx={{
        width: '100%',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        px: 1,
        py: 0.5,
        backgroundColor: theme => alpha(theme.palette.background.opposite, readOnly ? 0.25 : 0.1),
        borderRadius: 0.5,
        border: '1px solid transparent',
        transition: 'border-color 0.25s',
        cursor: readOnly ? 'unset' : 'pointer',
        ...(
            readOnly ? {} : {
                "&:hover": {
                    borderColor: theme => alpha(theme.palette.primary.main, 1),
                }
            }
        ),
        ...(!readOnly && isFocused.value && {
            borderColor: theme => alpha(theme.palette.primary.main, 1),
        }),
    }} {...other} onClick={() => handleTouchElement()}>
        {
            multiOptions.length ? <Select size="small" value={selectedMultiOption} onChange={handleMultiOptionChange} sx={{
                width: '100px',
                borderRadius: 0.5,
                border: '1px solid transparent',
                backgroundColor: 'transparent',
                height: '28px',
                '&:focus': {
                    outline: 'none',
                },
            }}>
                {
                    multiOptions.map((option, index) => <MenuItem key={`trade-menu-${index}`} value={option}>{option}</MenuItem>)
                }
            </Select> :
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{label}</Typography>
        }
        <Input ref={inputRef} disableUnderline sx={{
            flex: 1,
            '& input': {
                textAlign: 'right',
            },
        }}
            value={value}
            onChange={handleValueChange}
            onFocus={() => isFocused.onTrue()}
            onBlur={() => isFocused.onFalse()}
            readOnly={readOnly}
        />
        <Typography variant="body2" sx={{ color: 'text.primary' }}>{currentType}</Typography>
    </Box>
}