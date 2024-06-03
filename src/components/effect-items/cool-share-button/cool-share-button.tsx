// Import necessary parts from MUI and React
import React from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/material';

import { CoolShareButtonProps } from './types';

interface CustomIconButtonProps {
    translateEffect: string;
    background: string;
    index?: number;
}

const CoolShareButton: React.FC<CoolShareButtonProps> = ({ size = "md", sx }) => {
    const theme = useTheme();

    const sizeToUnitMap = {
        lg: 8,
        md: 6,
        sm: 4,
    };

    const unit = sizeToUnitMap[size] || 8;

    const ButtonsContainer = styled('div')({
        display: "grid",
        placeItems: "center",
        height: "fit-content",
        width: "fit-content",
        transition: "0.3s",
        borderRadius: "50%",
        position: "relative",
        "&:hover": {
            ".custom-icon-btn": {
                transform: "translate(var(--destination))",
                background: "var(--background)",
            },
        },
        ...{ sx },
    });

    // Styled main button
    const MainButton = styled('button')`
      position: relative;
      display: grid;
      place-items: center;
      padding: ${unit}px;
      border: none;
      background: #e8e8e8;
      box-shadow: ${theme.shadows[3]};
      border-radius: 50%;
      transition: 0.2s;
      z-index: 100;
      cursor: pointer;
    `;

    // Generic styled button for icons, with dynamic hover effect
    const CustomIconButton = styled('button')<CustomIconButtonProps>(
        ({ translateEffect, background, index = 0 }) => ({
            position: 'absolute',
            display: 'grid',
            placeItems: 'center',
            padding: `${unit}px`,
            border: 'none',
            // background: '#e8e8e8',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: `box-shadow 0.3s ease, transform ${0.2 * index}s ease`,
            "--destination": translateEffect,
            "--background": background,
            backgroundColor: background,
            '&:hover': {
                boxShadow: `${theme.shadows[3]}`,
            },
        })
    );


    return <ButtonsContainer>
        <MainButton>
            {/* Main Button Icon */}
            <svg width={3 * unit} height={3 * unit} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11.7C2 6.126 6.366 2 12 2s10 4.126 10 9.7c0 5.574-4.366 9.7-10 9.7-1.012 0-1.982-.134-2.895-.384a.799.799 0 0 0-.534.038l-1.985.877a.8.8 0 0 1-1.122-.707l-.055-1.779a.799.799 0 0 0-.269-.57C3.195 17.135 2 14.615 2 11.7Zm6.932-1.824-2.937 4.66c-.281.448.268.952.689.633l3.156-2.395a.6.6 0 0 1 .723-.003l2.336 1.753a1.501 1.501 0 0 0 2.169-.4l2.937-4.66c.283-.448-.267-.952-.689-.633l-3.156 2.395a.6.6 0 0 1-.723.003l-2.336-1.754a1.5 1.5 0 0 0-2.169.4v.001Z" />
            </svg>
        </MainButton>
        <CustomIconButton className="custom-icon-btn" index={0} translateEffect={`-${6 * unit}px, 0px`} background="#5865F2">
            {/* Discord Icon */}
            <svg width={3 * unit} height={3 * unit} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11.7C2 6.126 6.366 2 12 2s10 4.126 10 9.7c0 5.574-4.366 9.7-10 9.7-1.012 0-1.982-.134-2.895-.384a.799.799 0 0 0-.534.038l-1.985.877a.8.8 0 0 1-1.122-.707l-.055-1.779a.799.799 0 0 0-.269-.57C3.195 17.135 2 14.615 2 11.7Zm6.932-1.824-2.937 4.66c-.281.448.268.952.689.633l3.156-2.395a.6.6 0 0 1 .723-.003l2.336 1.753a1.501 1.501 0 0 0 2.169-.4l2.937-4.66c.283-.448-.267-.952-.689-.633l-3.156 2.395a.6.6 0 0 1-.723.003l-2.336-1.754a1.5 1.5 0 0 0-2.169.4v.001Z" />
            </svg>
        </CustomIconButton>
        <CustomIconButton className="custom-icon-btn" index={1} translateEffect={`-${3 * unit}px, ${5.19 * unit}px`} background="#1CA1F1">
            {/* Twitter Icon */}
            <svg width={3 * unit} height={3 * unit} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11.7C2 6.126 6.366 2 12 2s10 4.126 10 9.7c0 5.574-4.366 9.7-10 9.7-1.012 0-1.982-.134-2.895-.384a.799.799 0 0 0-.534.038l-1.985.877a.8.8 0 0 1-1.122-.707l-.055-1.779a.799.799 0 0 0-.269-.57C3.195 17.135 2 14.615 2 11.7Zm6.932-1.824-2.937 4.66c-.281.448.268.952.689.633l3.156-2.395a.6.6 0 0 1 .723-.003l2.336 1.753a1.501 1.501 0 0 0 2.169-.4l2.937-4.66c.283-.448-.267-.952-.689-.633l-3.156 2.395a.6.6 0 0 1-.723.003l-2.336-1.754a1.5 1.5 0 0 0-2.169.4v.001Z" />
            </svg>
        </CustomIconButton>
        <CustomIconButton className="custom-icon-btn" index={2} translateEffect={`${3 * unit}px, ${5.19 * unit}px`} background="#0093FF">
            {/* Messenger Icon */}
            <svg width={3 * unit} height={3 * unit} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11.7C2 6.126 6.366 2 12 2s10 4.126 10 9.7c0 5.574-4.366 9.7-10 9.7-1.012 0-1.982-.134-2.895-.384a.799.799 0 0 0-.534.038l-1.985.877a.8.8 0 0 1-1.122-.707l-.055-1.779a.799.799 0 0 0-.269-.57C3.195 17.135 2 14.615 2 11.7Zm6.932-1.824-2.937 4.66c-.281.448.268.952.689.633l3.156-2.395a.6.6 0 0 1 .723-.003l2.336 1.753a1.501 1.501 0 0 0 2.169-.4l2.937-4.66c.283-.448-.267-.952-.689-.633l-3.156 2.395a.6.6 0 0 1-.723.003l-2.336-1.754a1.5 1.5 0 0 0-2.169.4v.001Z" />
            </svg>
        </CustomIconButton>
        <CustomIconButton className="custom-icon-btn" index={3} translateEffect={`${6 * unit}px, 0px`} background="#FF4500">
            {/* Reddit Icon */}
            <svg width={3 * unit} height={3 * unit} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11.7C2 6.126 6.366 2 12 2s10 4.126 10 9.7c0 5.574-4.366 9.7-10 9.7-1.012 0-1.982-.134-2.895-.384a.799.799 0 0 0-.534.038l-1.985.877a.8.8 0 0 1-1.122-.707l-.055-1.779a.799.799 0 0 0-.269-.57C3.195 17.135 2 14.615 2 11.7Zm6.932-1.824-2.937 4.66c-.281.448.268.952.689.633l3.156-2.395a.6.6 0 0 1 .723-.003l2.336 1.753a1.501 1.501 0 0 0 2.169-.4l2.937-4.66c.283-.448-.267-.952-.689-.633l-3.156 2.395a.6.6 0 0 1-.723.003l-2.336-1.754a1.5 1.5 0 0 0-2.169.4v.001Z" />
            </svg>
        </CustomIconButton>
        {/* Add more CustomIconButton components as needed for other platforms */}
    </ButtonsContainer>
};

export default CoolShareButton;
