import React from 'react';

import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Box, List, Chip, alpha, Avatar, Switch, Dialog, Button, Popover, Checkbox, TextField, IconButton, Typography, DialogTitle, ListItemIcon, ListItemText, Autocomplete, DialogActions, DialogContent, ListItemButton
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Image from 'src/components/image/image';
import { fileThumb } from 'src/components/file-thumbnail';
import { usePopover } from 'src/components/custom-popover';



const StyledPopover = styled(Popover)(({ theme }) => ({
    '&.MuiPopover-root': {
        '& .MuiPaper-root': {
            backdropFilter: "blur(4px)",
            backgroundColor: alpha(theme.palette.background.default, 0.05),
            padding: "0px",
        }
    },
}));

type Props = {
    name?: string,
    url?: string,
    type?: string,
}

const KnowledgebaseItem: React.FC<Props> = ({ name = '', url = '', type = '' }) => {
    const dialog = useBoolean();

    const downloadHandle = () => {
        console.log('download', url);
    }

    const morePopover = usePopover();

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
        borderRadius: 1,
        flex: 1,
        p: 1,
        pr: 0,
        mr: 0.5,
        mb: 1,
    }}><Image src={fileThumb('name.pdf')} alt="name.pdf" sx={{
        width: '24px',
        height: '24px',
    }} />
        <Typography variant='body2' sx={{
            flex: 1,
            ml: 1
        }}>name.pff</Typography>
        <Typography variant='body2' sx={{
            mx: 1
        }}>12 KB</Typography>
        <Avatar alt="person.name" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg" sx={{
            width: '20px',
            height: '20px',
            pr: 0,
        }} />
        <Switch checked size='small' sx={{
            position: 'relative',
            left: '4px'
        }} />
        <IconButton size="small" onClick={morePopover.onOpen}>
            <MoreVertIcon fontSize='small' />
        </IconButton>

        <StyledPopover
            open={Boolean(morePopover.open)}
            anchorEl={morePopover.open}
            onClose={morePopover.onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
            }}
        >
            <List>
                <ListItemButton onClick={dialog.onTrue}>
                    <ListItemIcon>
                        <ShareIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                </ListItemButton>
                <ListItemButton onClick={downloadHandle}>
                    <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Download" />
                </ListItemButton>
                <ListItemButton onClick={downloadHandle}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </ListItemButton>
            </List>

        </StyledPopover>


        <Dialog open={dialog.value}>
            <DialogTitle textAlign="center">Share the file</DialogTitle>
            <DialogContent sx={{
                width: '480px',
            }}>
                <Autocomplete
                    fullWidth
                    multiple
                    limitTags={3}
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    defaultValue={top100Films.slice(0, 1)}
                    renderInput={(params) => (
                        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} key={option.title}>
                            <Checkbox key={option.title} size="small" disableRipple checked={selected} />
                            {option.title}
                        </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                        selected.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option.title}
                                label={option.title}
                                size="small"
                            />
                        ))
                    }
                />
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'center'
            }}>
                <Button onClick={dialog.onFalse} variant="outlined" color="primary" startIcon={<CloseIcon />}>
                    Cancel
                </Button>
                <Button onClick={dialog.onFalse} variant="contained" color="primary" startIcon={<ShareIcon />}>
                    Share
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default KnowledgebaseItem;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];