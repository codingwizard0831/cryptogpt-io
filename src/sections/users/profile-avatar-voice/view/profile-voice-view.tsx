'use client';

import React, { useRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import UploadIcon from '@mui/icons-material/Upload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {
    Box,
    Tab,
    Card,
    Tabs,
    Chip,
    Stack,
    Button,
    Select,
    MenuItem,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

export default function ProfileVoiceView() {
    const smUp = useResponsive('up', 'sm');
    const { user } = useAuthContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('Sonic English');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const voices = [
        { name: 'CRYPTO GPT GOLD 1.2 (MALE)', version: 'GOLD 1.2', rating: 35 },
        { name: 'CRYPTO GPT GOLD 1.1 (MALE)', version: 'GOLD 1.1 (MALE)', rating: 28 },
        { name: 'GOLD 1.0', version: 'GOLD 1.0', rating: 22 },
    ];

    const genres = [
        'House', 'Deep House', 'Techno', 'Trance', 'EDM', 'Drum and Bass', 'Dubstep',
        'Ambient', 'Chill', 'Lo-Fi', 'Hip Hop', 'R&B', 'Pop', 'Rock', 'Jazz', 'Classical'
    ];

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            // Here you would typically send the file to your server
            console.log('File uploaded:', file.name);
            // You can add your API call to upload the file here
        }
    };

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Card sx={{ color: 'white', p: 2, borderRadius: 2, bgcolor: '#121212', width: '100%' }}>
                <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as string)}
                    sx={{ width: '100%', mb: 2, color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}
                >
                    <MenuItem value="Sonic English">Sonic English</MenuItem>
                </Select>

                <Card sx={{ mb: 2, p: 2, bgcolor: '#1E1E1E' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write something to say..."
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'gray' } } }}
                    />
                    <Button
                        variant="contained"
                        sx={{ bgcolor: theme => theme.palette.primary.main, color: 'black' }}
                        onClick={() => console.log('Click Speak Button')}
                    >
                        Speak
                    </Button>
                </Card>

                <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                    <Tab label="VOICES" icon={<MusicNoteIcon />} sx={{ color: theme => theme.palette.primary.main }} />
                    <Tab label="MIX" sx={{ color: 'white' }} />
                    <Tab label="SPEED & EMOTION" sx={{ color: 'white' }} />
                    <Tab label="STATS" sx={{ color: 'white' }} />
                </Tabs>

                {selectedTab === 0 && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Pick a GPT Voice</Typography>
                        <Stack spacing={2}>
                            {voices.map((voice, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="subtitle1">{voice.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{voice.version}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StarIcon sx={{ color: theme => theme.palette.primary.main, mr: 1 }} />
                                        <Typography>{voice.rating}%</Typography>
                                        <IconButton sx={{ color: theme => theme.palette.primary.main }}><PlayArrowIcon /></IconButton>
                                        <IconButton sx={{ color: 'white' }}><MoreVertIcon /></IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mt: 2, color: theme => theme.palette.primary.main, borderColor: theme => theme.palette.primary.main }}
                        >
                            Create New Voice
                        </Button>
                    </>
                )}

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Select Music Genre</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {genres.map((genre, index) => (
                            <Chip
                                key={index}
                                label={genre}
                                onClick={() => handleGenreToggle(genre)}
                                sx={{
                                    bgcolor: selectedGenres.includes(genre) ? theme => theme.palette.primary.main : '#333',
                                    color: selectedGenres.includes(genre) ? 'black' : 'white',
                                    '&:hover': { bgcolor: theme => theme.palette.primary.main, color: 'black' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Upload Custom Voice</Typography>
                    <input
                        type="file"
                        accept="audio/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        sx={{ color: theme => theme.palette.primary.main, borderColor: theme => theme.palette.primary.main }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {uploadedFile ? uploadedFile.name : 'Upload Voice File'}
                    </Button>
                    {uploadedFile && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
                            File uploaded successfully!
                        </Typography>
                    )}
                </Box>
            </Card>
        </Box>
    );
}