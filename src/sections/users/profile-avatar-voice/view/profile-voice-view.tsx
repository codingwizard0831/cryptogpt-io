'use client';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from 'react';
import {
    Pie, Line, Cell, XAxis, YAxis, Tooltip, PieChart,
    LineChart, CartesianGrid, ResponsiveContainer
} from 'recharts';

import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import MixIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import AvatarIcon from '@mui/icons-material/Face';
import UploadIcon from '@mui/icons-material/Upload';
import StatsIcon from '@mui/icons-material/BarChart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Tab,
    Card,
    Tabs,
    Chip,
    Stack,
    Input,
    Alert,
    Button,
    Select,
    MenuItem,
    TextField,
    Typography,
    IconButton,
    ButtonBase
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

import AIChatBox from '../AIChat';
import SliderComponent from '../Slider';

interface Avatar {
    gender: 'male' | 'female';
    imageUrl: string;
    isDefault: boolean;
}
const lineChartData = [
    { name: 'Jan', value1: 2500, value2: 4000, value3: 2400 },
    { name: 'Feb', value1: 1500, value2: 3000, value3: 2210 },
    { name: 'Mar', value1: 10000, value2: 2000, value3: 2290 },
    { name: 'Apr', value1: 5000, value2: 2780, value3: 2000 },
    { name: 'May', value1: 4800, value2: 1890, value3: 2181 },
    { name: 'Jun', value1: 3800, value2: 2390, value3: 2500 }
];

// Sample data for the pie chart
const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const voices = [
    { name: 'CRYPTO GPT GOLD 1.2 (MALE)', version: 'GOLD 1.2', rating: 35 },
    { name: 'CRYPTO GPT GOLD 1.1 (MALE)', version: 'GOLD 1.1 (MALE)', rating: 28 },
    { name: 'GOLD 1.0', version: 'GOLD 1.0', rating: 22 },
];

const genres = [
    'House', 'Deep House', 'Techno', 'Trance', 'EDM', 'Drum and Bass', 'Dubstep',
    'Ambient', 'Chill', 'Lo-Fi', 'Hip Hop', 'R&B', 'Pop', 'Rock', 'Jazz', 'Classical'
];

interface AvatarItem {
    gender: 'male' | 'female';
    onSelect: (gender: 'male' | 'female', imageUrl: string) => void;
    selectedAvatar: string;
}

const AvatarCarousel: React.FC<AvatarItem> = ({ gender, onSelect, selectedAvatar }) => {
    const standardAvatars = [
        `/assets/images/project/tree.png`,
        `/assets/images/creator1.png`,
        `/assets/images/ethereum-to-dollar-swap.png`,
        `/assets/images/bitcoin.png`,
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Box sx={{ mb: 2, width: '80%', margin: 'auto' }}>
            <Slider {...settings}>
                {standardAvatars.map((avatar, index) => (
                    <Box key={index} sx={{ p: 1 }}>
                        <ButtonBase
                            onClick={() => onSelect(gender, avatar)}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                src={avatar}
                                alt={`${gender} avatar ${index + 1}`}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    border: selectedAvatar === avatar ? '2px solid yellow' : 'none'
                                }}
                            />
                        </ButtonBase>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};


export default function ProfileVoiceView() {
    const smUp = useResponsive('up', 'sm');
    const { user } = useAuthContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('Sonic English');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [uploadedAudioFile, setUploadedAudioFile] = useState<File | null>(null);
    const [audioUploadError, setAudioUploadError] = useState<string | null>(null);
    const [mixValue, setMixValue] = useState<number>(50);
    const [speedValue, setSpeedValue] = useState<number>(50);
    const [confidenceValue, setConfidenceValue] = useState<number>(50);
    const [precisionValue, setPrecisionValue] = useState<number>(50);
    const [technicalityValue, setTechnicalityValue] = useState<number>(50);
    const [creativityValue, setCreativityValue] = useState<number>(50);
    const [efficiencyValue, setEfficiencyValue] = useState<number>(50);

    const [avatars, setAvatars] = useState<{ male: Avatar; female: Avatar }>({
        male: { gender: 'male', imageUrl: '/assets/images/project/01.png', isDefault: true },
        female: { gender: 'female', imageUrl: '/assets/images/project/02.png', isDefault: true },
    });


    const [selectedAvatar, setSelectedAvatar] = useState<'male' | 'female' | null>(null);
    const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);

    const handleAvatarSelect = (gender: 'male' | 'female') => {
        setSelectedAvatar(gender);
    };

    const handleGenerateAvatar = async () => {
        setIsGeneratingAvatar(true);
        // Simulate AI generation - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Assume these URLs are returned from your AI generation API
        const generatedMaleAvatarUrl = 'https://example.com/generated-male-avatar.jpg';
        const generatedFemaleAvatarUrl = 'https://example.com/generated-female-avatar.jpg';
        setAvatars({
            male: { gender: 'male', imageUrl: generatedMaleAvatarUrl, isDefault: false },
            female: { gender: 'female', imageUrl: generatedFemaleAvatarUrl, isDefault: false },
        });
        setIsGeneratingAvatar(false);
    };

    const handleAvatarUpload = (gender: 'male' | 'female') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatars(prev => ({
                    ...prev,
                    [gender]: { gender, imageUrl: e.target?.result as string, isDefault: false },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStandardAvatarSelect = (gender: 'male' | 'female', imageUrl: string) => {
        setAvatars(prev => ({
            ...prev,
            [gender]: { ...prev[gender], imageUrl, isDefault: false }
        }));
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const isValidAudioFile = (file: File) => {
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/m4a'];
        return validTypes.includes(file.type);
    };

    const handleAudioFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setAudioUploadError(null);

        if (file) {
            if (isValidAudioFile(file)) {
                setUploadedAudioFile(file);
                // Here you would typically send the file to your server
                console.log('File uploaded:', file.name);
                // You can add your API call to upload the file here
            } else {
                setAudioUploadError('Please upload a valid audio file (MP3, WAV, OGG, M4A).');
                setUploadedAudioFile(null);
            }
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
            <Card sx={{ color: 'white', p: 2, borderRadius: 2, bgcolor: '#121212', width: '100%', overflowY: 'auto' }}>
                <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as string)}
                    sx={{ width: '100%', mb: 2, color: theme => theme.palette.primary.main, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}
                >
                    <MenuItem value="Sonic English">Sonic English</MenuItem>
                </Select>

                <Card sx={{ mb: 2, p: 2, bgcolor: '#1E1E1E' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write something to say..."
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: theme => theme.palette.primary.main, '& fieldset': { borderColor: 'gray' } } }}
                    />
                    <Button
                        variant="contained"
                        sx={{ bgcolor: theme => theme.palette.primary.main, color: 'text.primary' }}
                        onClick={() => console.log('Click Speak Button')}
                    >
                        Speak
                    </Button>
                </Card>

                <Tabs value={selectedTab} onChange={handleTabChange} sx={{
                    mb: 2, '& .MuiTab-root': {
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: theme => theme.palette.primary.main,
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme => theme.palette.primary.main,
                        height: 2,
                    },
                }}>
                    <Tab label="VOICES" icon={<MicIcon />} sx={{ color: theme => theme.palette.primary.main }} />
                    <Tab label="MIX" icon={<MixIcon />} sx={{ color: theme => theme.palette.primary.main }} />
                    <Tab label="SPEED & EMOTION" icon={<SpeedIcon />} sx={{ color: theme => theme.palette.primary.main }} />
                    <Tab label="STATS" icon={<StatsIcon />} sx={{ color: theme => theme.palette.primary.main }} />
                    <Tab label="AI CHAT MIX" icon={<AvatarIcon />} sx={{ color: theme => theme.palette.primary.main }} />
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
                                        <IconButton
                                            sx={{
                                                bgcolor: theme => theme.palette.primary.main,
                                                color: 'black',
                                                '&:hover': { bgcolor: theme => theme.palette.primary.main },
                                                width: 32,
                                                height: 32,
                                                mx: 1,
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <PlayArrowIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                bgcolor: '#1E1E1E',
                                                color: 'text.primary',
                                                '&:hover': { bgcolor: '#1E1E1E' },
                                                width: 32,
                                                height: 32,
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <MoreVertIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
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

                {selectedTab === 1 && (
                    <Card sx={{ mb: 2, p: 2, bgcolor: '#1e1e1e' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Mix Voices</Typography>
                        <SliderComponent startText='GOLD 1.2' endText='GOLD 1.1' value={mixValue} setValue={setMixValue} />
                    </Card>
                )}

                {selectedTab === 2 && (
                    <Card sx={{ mb: 2, p: 2, bgcolor: '#1e1e1e' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Speed & Emotion</Typography>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Speed</Typography>
                            <SliderComponent startText='Low' endText='High' value={speedValue} setValue={setSpeedValue} />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Confidence</Typography>
                            <SliderComponent startText='Low' endText='High' value={confidenceValue} setValue={setConfidenceValue} />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Precision</Typography>
                            <SliderComponent startText='Low' endText='High' value={precisionValue} setValue={setPrecisionValue} />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Technicality</Typography>
                            <SliderComponent startText='Low' endText='High' value={technicalityValue} setValue={setTechnicalityValue} />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Creativity</Typography>
                            <SliderComponent startText='Low' endText='High' value={creativityValue} setValue={setCreativityValue} />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body" sx={{ mb: 2, color: 'text.primary' }}>Efficiency</Typography>
                            <SliderComponent startText='Low' endText='High' value={efficiencyValue} setValue={setEfficiencyValue} />
                        </Box>
                    </Card >
                )}

                {selectedTab === 3 && (
                    <Card sx={{ bgcolor: '#1E1E1E', color: 'white', p: 2 }}>
                        <Typography variant="h6" sx={{ color: theme => theme.palette.primary.main, mb: 2 }}>Usage Statistics</Typography>
                        {/* Pie Chart */}
                        <Box sx={{ height: 300, mb: 4 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={0}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Line Chart */}
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={lineChartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffd70055" strokeWidth={4} />
                                    <XAxis dataKey="name" stroke="#FFFFFF" />
                                    <YAxis stroke="#FFFFFF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                                        itemStyle={{ color: '#FFF' }}
                                    />
                                    <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="value3" stroke="#ffc658" strokeWidth={2} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                )}

                {selectedTab === 4 && (
                    <Card sx={{ bgcolor: "#1e1e1e", color: 'white', p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: theme => theme.palette.primary.main }}>Voice Avatar</Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                            <AIChatBox />
                            <Box sx={{ flex: 1, width: '50%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2, width: '100%' }}>
                                    {['male', 'female'].map((gender) => (
                                        <Card key={gender} sx={{ width: '45%', bgcolor: '#1E1E1E', p: 2 }}>
                                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                                {gender === 'male' ? 'Male' : 'Female'} Avatar
                                            </Typography>
                                            <Box
                                                component="img"
                                                src={avatars[gender as 'male' | 'female'].imageUrl}
                                                alt={`${gender} Avatar`}
                                                sx={{
                                                    width: '100%',
                                                    height: 200,
                                                    objectFit: 'cover',
                                                    mb: 2,
                                                    border: `2px solid ${theme => theme.palette.primary.main}`
                                                }}
                                            />
                                            <AvatarCarousel
                                                gender={gender as 'male' | 'female'}
                                                onSelect={handleStandardAvatarSelect}
                                                selectedAvatar={avatars[gender as 'male' | 'female'].imageUrl}
                                            />
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ bgcolor: theme => theme.palette.primary.main, color: 'black', mb: 1 }}
                                                onClick={() => handleAvatarSelect(gender as 'male' | 'female')}
                                            >
                                                Select {gender === 'male' ? 'Male' : 'Female'} Avatar
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                component="label"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{
                                                    color: theme => theme.palette.primary.main,
                                                    borderColor: theme => theme.palette.primary.main,
                                                }}
                                            >
                                                Upload Custom Avatar
                                                <Input
                                                    type="file"
                                                    sx={{ display: 'none' }}
                                                    onChange={handleAvatarUpload(gender as 'male' | 'female')}
                                                    inputProps={{ accept: 'image/*' }}
                                                />
                                            </Button>
                                        </Card>
                                    ))}
                                </Box>
                                {selectedAvatar && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Selected Avatar:</Typography>
                                        <Box
                                            component="img"
                                            src={avatars[selectedAvatar].imageUrl}
                                            alt="Selected Avatar"
                                            sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Card>
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
                        accept="audio/mpeg,audio/wav,audio/ogg,audio/mp3,audio/m4a"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleAudioFileUpload}
                    />
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        sx={{ color: theme => theme.palette.primary.main, borderColor: theme => theme.palette.primary.main }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {uploadedAudioFile ? uploadedAudioFile.name : 'Upload Voice File'}
                    </Button>
                    {uploadedAudioFile && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
                            File uploaded successfully!
                        </Typography>
                    )}
                    {audioUploadError && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {audioUploadError}
                        </Alert>
                    )}
                </Box>
            </Card >
        </Box >
    );
}