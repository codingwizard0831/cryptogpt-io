import React, { useState } from "react";

import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type Props = {

};

const Conversation: React.FC<Props> = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [text, setText] = useState('test');

    const editHandle = () => {
        console.log('editHandle');
        setIsEdit(true);
    }

    const deleteHandle = () => {
        console.log('deleteHandle');
        setIsEdit(true);
    }

    const updateHandle = () => {
        console.log('updateHandle');
        setIsEdit(false);
    }

    const cancelHandle = () => {
        console.log('cancelHandle');
        setIsEdit(false);
    }

    return <ListItem
        secondaryAction={
            <Stack direction="row">
                {
                    !isEdit && !isDelete ? <>
                        <IconButton edge="end" aria-label="edit" size="small" onClick={() => editHandle()}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" size="small" onClick={() => deleteHandle()}>
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </> : <>
                        <IconButton edge="end" aria-label="edit" size="small" onClick={() => updateHandle()}>
                            <CheckIcon fontSize='small' />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" size="small" onClick={() => cancelHandle()}>
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    </>
                }
            </Stack>
        }
        sx={{
            backgroundColor: "#0004",
            p: 1,
            pl: 1.5,
            mb: 1,
            borderRadius: 1
        }}
    >
        <AccessTimeIcon sx={{
            fontSize: '18px',
            marginRight: '5px'
        }} />
        <Input value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }} disableUnderline readOnly={!isEdit} />
    </ListItem>
}

export default Conversation;