import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { noctisLilacInit } from '@uiw/codemirror-theme-noctis-lilac';

import { Box, Card, alpha, useTheme } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

const CodeEdditor: React.FC = () => {
    const upMd = useResponsive('up', 'md');
    const theme = useTheme();
    const [value, setValue] = React.useState(`
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    console.log('hello world!');\n
    `);
    const onChange = React.useCallback((val: string, viewUpdate: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);

    console.log('Code Editor');
    return <Card sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: upMd ? 2 : 1,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: () => alpha(theme.palette.background.default, 0.7),
        }}>
            <Box sx={{
                width: upMd ? "10px" : "6px",
                height: upMd ? "10px" : "6px",
                borderRadius: "50%",
                backgroundColor: () => theme.palette.error.main,
                mr: 1,
            }} />
            <Box sx={{
                width: upMd ? "10px" : "6px",
                height: upMd ? "10px" : "6px",
                borderRadius: "50%",
                backgroundColor: () => theme.palette.warning.main,
                mr: 1,
            }} />
            <Box sx={{
                width: upMd ? "10px" : "6px",
                height: upMd ? "10px" : "6px",
                borderRadius: "50%",
                backgroundColor: () => theme.palette.success.main,
                mr: 1,
            }} />
        </Box>
        <Box sx={{
            flex: 1,
            '& .cm-scroller': {
                scrollbarWidth: 'thin',
                scrollbarColor: `${alpha(theme.palette.divider, 0.4)} transparent`,
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `${alpha(theme.palette.divider, 0.4)}`,
                    borderRadius: '20px',
                },
            },
        }}>
            <CodeMirror
                value={value} height="140px"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                theme={theme.palette.mode === 'dark' ? vscodeDarkInit({
                    settings: {
                        caret: '#c6c6c6',
                        fontFamily: 'monospace',
                    }
                }) : noctisLilacInit({
                    settings: {
                        caret: '#c6c6c6',
                        fontFamily: 'monospace',
                    }
                })}
            />
        </Box>
    </Card>
}

export default CodeEdditor;