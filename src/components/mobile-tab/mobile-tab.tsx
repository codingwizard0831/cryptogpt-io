import React from 'react';

import { Box, styled, BoxProps, IconButton } from '@mui/material';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from '../iconify/iconify';

interface MenuButton {
    icon: React.ReactNode;
    id: string;
}


const MainWrapper = styled(Box)(({ theme }) => ({
    display: 'table',
}));

const ButtonsWrapper = styled(Box)<{ size?: "small" | "medium" }>(({ theme, size = 'medium' }) => ({
    display: 'table-cell',
    verticalAlign: 'middle',
    height: size === 'medium' ? '59px' : '40px',
    // width: '330px',
    borderRadius: '7px',
    backgroundColor: 'black',
    border: '2px solid black',
    boxShadow: '0 4px 8px rgba(0,0,0,0.55)',
}));

const StyledIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean, size?: "small" | "medium" }>(({ theme, isSelected, size = "medium" }) => ({
    position: 'relative',
    zIndex: isSelected ? 3 : 1,
    float: 'left',
    padding: size === "medium" ? '15px 23px' : '8px 16px',
    backgroundImage: isSelected
        ? 'linear-gradient(#202020, #151515)'
        : 'linear-gradient(#333, #222)',
    textAlign: 'center',
    margin: '0 1px',
    borderRadius: '2px',
    borderTop: isSelected ? 'none' : '1px solid rgba(255,255,255,0.25)',
    borderLeft: isSelected ? '1px solid rgba(0,0,0,0.55)' : '1px solid rgba(255,255,255,0.05)',
    borderRight: isSelected ? '1px solid rgba(0,0,0,0.55)' : '1px solid rgba(255,255,255,0.05)',
    boxShadow: isSelected
        ? 'inset 0 1px 6px rgba(0,0,0,0.5), 0 10px 20px rgba(255,255,255,0.06)'
        : 'inset 0 1px 0 rgba(0,0,0,0.1)',
    cursor: isSelected ? 'default' : 'pointer',
    transition: 'all .175s ease',
    '&:hover': {
        zIndex: 2,
        backgroundImage: 'linear-gradient(#373737, #262626)',
        boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.5)',
    },
    '&:first-of-type': {
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
        marginLeft: 0,
    },
    '&:last-of-type': {
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        marginRight: 0,
    },
    '& .MuiSvgIcon-root': {
        color: isSelected ? 'white' : '#424242',
        textShadow: isSelected ? '0 0 10px rgba(2,165,238,0.75)' : '0 -1px 0 rgba(0,0,0,0.75)',
        fontSize: '28px',
        width: '32px',
    },
    '&::before, &::after': {
        content: '""',
        display: isSelected ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        width: '1px',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.25), rgba(2,165,238,0.4), rgba(0,0,0,0.25))',
    },
    '&::before': {
        left: '-4px',
    },
    '&::after': {
        right: '-4px',
    },
}));


const menuButtons: MenuButton[] = [
    { icon: <Iconify icon="pepicons-pop:coins" />, id: '1.choose-pair' },
    { icon: <Iconify icon="hugeicons:bitcoin-invoice" />, id: '2.detail' },
    { icon: <Iconify icon="tdesign:indicator" />, id: '3.configure-indicators' },
    { icon: <Iconify icon="carbon:chart-multitype" />, id: '4.backtesting' },
    { icon: <Iconify icon="vaadin:chart-3d" />, id: '5' },
    { icon: <Iconify icon="vaadin:chart-3d" />, id: '6' },
];

interface MobileMenuTabProps extends BoxProps {
    data?: MenuButton[],
    value?: string,
    handleChange?: (v: string) => void,
    size?: "small" | "medium",
}

const MobileMenuTab: React.FC<MobileMenuTabProps> = ({
    data = menuButtons,
    value = '1.choose-pair',
    handleChange,
    size = "medium",
    sx,
    ...other
}) => {
    // const [selectedButton, setSelectedButton] = useState<string>(value);
    const setSettingTypeIn1step = useStrategy((state) => state.setSettingTypeIn1step);

    const handleButtonClick = (id: string) => {
        if (handleChange) {
            handleChange(id);
            if (id === "3.detail") {
                handleChange("1.2.choose-pair");
                setSettingTypeIn1step("advanced");
            }
        }
        // setSelectedButton(id);
    };

    return (
        <MainWrapper sx={{
            ...sx,
        }} {...other}>
            <ButtonsWrapper size={size}>
                {data.map((button) => (
                    <StyledIconButton
                        key={button.id}
                        isSelected={value === button.id}
                        onClick={() => handleButtonClick(button.id)}
                        aria-label={`Select ${button.id}`}
                        color="primary"
                        size={size}
                    >
                        {button.icon}
                    </StyledIconButton>
                ))}
            </ButtonsWrapper>
        </MainWrapper>
    );
};

export default MobileMenuTab;