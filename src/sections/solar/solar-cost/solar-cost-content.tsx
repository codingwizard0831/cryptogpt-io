import React, { useState, useEffect } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards, { Focused } from 'react-credit-cards';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, List, alpha, Radio, Input, Button, styled, Slider, Divider, Accordion, TextField, Typography, RadioGroup, IconButton, ListItemIcon, ListItemText, ListItemButton, AccordionSummary, AccordionDetails } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { usePopover } from 'src/components/custom-popover';
import CountrySelect from 'src/components/country-select/country-select';
import { StyledDialog, StyledPopover } from "src/components/styled-component";

// ----------------------------------------------------------------------
const StyledAccordion = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-root': {
        boxShadow: 'none',
        '&.Mui-expanded': {
            margin: '0px', // Adjust this value to your needs
            backgroundColor: 'transparent',
            '& .MuiAccordionSummary-root': {
                margin: '0',
                paddingRight: '0px !improtant',
                minHeight: '48px',
                '& .MuiAccordionSummary-content': {
                    margin: '0',
                },
            },
        },
    },
}));

const coins = [
    {
        name: 'BITCOIN',
        icon: '/assets/icons/project/crypto/bitcoin_btc_logo.svg',
        network: 'BTC',
    },
    {
        name: 'ETH',
        icon: '/assets/icons/project/crypto/ethereum_eth_logo.svg',
        network: 'ERC20',
    },
    {
        name: 'BNB',
        icon: '/assets/icons/project/crypto/bnb_bnb_logo.svg',
        network: 'BEP20',
    },
    {
        name: 'USDT',
        icon: '/assets/icons/project/crypto/tether_usdt_logo.svg',
        network: 'BEP20',
    },
    {
        name: 'USDC',
        icon: '/assets/icons/project/crypto/usd_coin_usdc_logo.svg',
        network: 'ERC20',
    },
];

const paymentOptions = [
    {
        icon: 'mingcute:bank-line',
        title: 'Pay Now',
        subtitle: 'Pay via ACH and Real-Time Payments',
    },
    {
        icon: 'ic:outline-watch-later',
        title: 'Pay Later',
        subtitle: 'Pay your invoice over 2-12 months',
    },
    {
        icon: 'ion:card-outline',
        title: 'Pay by Card',
        subtitle: 'Secure Payment Portal',
    },
    {
        icon: 'bxl:bitcoin',
        title: 'Pay with Crypto',
        subtitle: 'Pay using Crypto',
    },
];

const SolarCostContent: React.FC = () => {
    const morePopover = usePopover();
    const coinPopover = usePopover();
    const paymentDialogFlag = useBoolean();
    const [paymentType, setPaymentType] = useState('');
    const [country, setCountry] = useState('');
    const [cvc, setCvc] = useState('');
    const [expiry, setExpiry] = useState('');
    const [name, setName] = useState('');
    const [fucused, setFucused] = useState<Focused>('number');
    const [number, setNumber] = useState('');
    const [payCryptoType, setPayCryptoType] = useState('pay-crypto');
    const upSm = useResponsive('up', 'sm');

    useEffect(() => {
        console.log('upSm', upSm);
    }, [upSm]);

    return <Box sx={{
        borderRadius: "0px 0px 10px 10px",
        backdropFilter: "blur(10px)",
        background: theme => alpha(theme.palette.background.default, 0.005),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
    }}>
        <Typography variant='caption' component='p' sx={{ mb: 1 }}>Checkout Your Solar System Kit</Typography>
        <StyledAccordion>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Iconify icon='game-icons:solar-power' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1" sx={{
                            fontSize: '14px!important',
                        }}>LONGI Solar Panels</Typography>

                        <Typography variant="caption" component='p' sx={{
                            fontSize: "12px",
                            lineHeight: "15px",
                            fontWeight: 300,
                        }}>600 Wp</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                }}>
                    <Typography variant="caption" component='p' sx={{
                        fontSize: "12px",
                        lineHeight: "15px",
                        fontWeight: 300,
                    }}>Price: $100.00 - $104.00</Typography>
                </Box>
            </AccordionDetails>
        </StyledAccordion>

        <StyledAccordion>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Iconify icon='game-icons:solar-power' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1" sx={{
                            fontSize: '14px!important',
                        }}>SMA Inverter</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                }}>
                    <Typography variant="caption" component='p' sx={{
                        fontSize: "12px",
                        lineHeight: "15px",
                        fontWeight: 300,
                    }}>Price: $100.00 - $107.00</Typography>
                </Box>
            </AccordionDetails>
        </StyledAccordion>

        <StyledAccordion>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Iconify icon='game-icons:solar-power' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1" sx={{
                            fontSize: '14px!important',
                        }}>Metal Mounts</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                }}>
                    <Typography variant="caption" component='p' sx={{
                        fontSize: "12px",
                        lineHeight: "15px",
                        fontWeight: 300,
                    }}>Price: $80.00 - $85.00</Typography>
                </Box>
            </AccordionDetails>
        </StyledAccordion>

        <Typography variant='caption' component='p' sx={{ mb: 1 }}><b>Delivery</b>: Estimated at $200.00 - $300.00 (within 30 days)</Typography>
        <Typography variant='caption' component='p' sx={{ mb: 1 }}><b>Includes</b>: All prices are inclusive of a 3.10% tax for insurance.</Typography>
        <Typography variant='caption' component='p' sx={{ cursor: 'pointer', mb: 1 }} onClick={morePopover.onOpen}><b>Payment Options</b>: {paymentType}</Typography>
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
                {
                    paymentOptions.map((option, index) => (
                        <ListItemButton key={index} onClick={() => {
                            paymentDialogFlag.onTrue();
                            morePopover.onClose();
                            setPaymentType(option.title);
                        }}>
                            <ListItemIcon>
                                <Iconify icon={option.icon} sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: theme => theme.palette.primary.main
                            }} secondaryTypographyProps={{
                                color: theme => alpha(theme.palette.text.primary, 0.6)
                            }} primary={option.title} secondary={option.subtitle} />
                        </ListItemButton>
                    ))
                }
            </List>

        </StyledPopover>

        <Button fullWidth variant='outlined' color='primary'>I agree.ai 👍</Button>

        <StyledDialog open={paymentDialogFlag.value} onClose={paymentDialogFlag.onFalse} maxWidth="sm" fullWidth scroll="body">
            {paymentType === 'Pay Now' &&
                <Box sx={{
                    p: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Iconify icon="mingcute:bank-line" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, mr: 1 }} />
                        <Typography variant='subtitle1' sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: theme => theme.palette.primary.main
                        }}>Explore Pay Now</Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: '10px',
                        border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: theme => theme.shadows[10],
                        display: 'flex',
                        p: 1.5,
                        mb: 2,
                    }}>
                        <Radio size="medium" value="nn" checked />
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='subtitle1'>Pay Now</Typography>
                            <Typography variant='caption' component='p'>Pay via ACH and Real-Time Payments</Typography>
                        </Box>
                    </Box>
                    <Typography variant='subtitle1'>01. Select Institution</Typography>
                    <Typography variant='caption' component='p' sx={{ mb: 2 }}>Choose your bank, to then select bank account for this payment</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1,
                        mb: 2
                    }}>
                        <Button color='primary' variant='contained' sx={{ width: '50%' }}>JP Morgan Chase, N.A.</Button>
                        <Button color='primary' variant='outlined' sx={{ width: '50%' }} startIcon={<AddIcon />}>New Bank</Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='subtitle1'>02. Select Bank Account</Typography>
                    <Typography variant='caption' component='p' sx={{ mb: 2 }}>Your one-off payment will be taken from your chosen Bank Account</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant='contained' color='primary'>Pay Now</Button>
                        <Button variant='outlined' color='primary' onClick={paymentDialogFlag.onFalse}>Cancel</Button>
                    </Box>
                </Box>
            }

            {paymentType === "Pay Later" &&
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Iconify icon="ic:outline-watch-later" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, mr: 1 }} />
                        <Typography variant='subtitle1' sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: theme => theme.palette.primary.main
                        }}>Explore Pay Later</Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: '10px',
                        border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: theme => theme.shadows[10],
                        display: 'flex',
                        p: 1.5,
                        mb: 2,
                    }}>
                        <Radio size="medium" value="nn" checked />
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='subtitle1'>Pay Layer</Typography>
                            <Typography variant='caption' component='p'>Pay your invoice over 2~12 months</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Typography variant='caption' component='p'>Expense amount</Typography>
                            <Typography variant='caption' component='p'>€25,000</Typography>
                        </Box>
                        <Slider />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 2,
                    }}>
                        <Box sx={{
                            width: '100%',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Typography variant='caption' component='p'>Paid over</Typography>
                                <Typography variant='caption' component='p'>6 months</Typography>
                            </Box>
                            <Slider />
                        </Box>

                        <Box sx={{
                            border: theme => `3px solid ${theme.palette.text.primary}`,
                            width: '100%',
                            p: 1,
                        }}>
                            <Typography variant='body1' component='p'>€4,417 per month</Typography>
                            <Button sx={{
                                fontWeight: 300,
                                textDecoration: 'underline',
                            }} endIcon={<ChevronRightIcon />}>See full details</Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant='contained' color='primary'>Pay An Invoice</Button>
                        <Button variant='outlined' color='primary'>Offer Pay Later</Button>
                    </Box>
                </Box>
            }
            {paymentType === "Pay by Card" &&
                <Box sx={{
                    p: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Iconify icon="ion:card-outline" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, mr: 1 }} />
                        <Typography variant='subtitle1' sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: theme => theme.palette.primary.main
                        }}>Explore Pay by Card</Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: '10px',
                        border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: theme => theme.shadows[10],
                        display: 'flex',
                        p: 1.5,
                        mb: 2,
                    }}>
                        <RadioGroup value="test">
                            <Radio size="medium" value="test" />
                        </RadioGroup>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='subtitle1'>Pay by Card</Typography>
                            <Typography variant='caption' component='p'>Secure payments portal</Typography>
                        </Box>
                    </Box>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>Payment Details</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: upSm ? 'row' : 'column',
                        gap: 1,
                        mb: 2
                    }}>
                        <TextField fullWidth label="Company Name" placeholder='Services, Inc.' />
                        <CountrySelect
                            label="Billing Country"
                            placeholder="Choose a country"
                            fullWidth
                            value={country}
                            onChange={(event, newValue) => setCountry(newValue as string)}
                            options={countries.map((option) => option.label)}
                            getOptionLabel={(option) => option}
                            sx={{
                                mb: 2,
                            }}
                        />
                    </Box>

                    <Typography variant='caption' component='p' sx={{ mb: 1 }}>Card Information</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: upSm ? 'row' : 'column',
                        gap: 2,
                    }}>
                        <Cards
                            cvc={cvc}
                            expiry={expiry}
                            focused={fucused}
                            name={name}
                            number={number}
                        />
                        <Box>
                            <TextField sx={{ mb: 1 }} fullWidth label='number' value={number} onChange={(e) => setNumber(e.target.value)} />
                            <TextField sx={{ mb: 1 }} fullWidth label='name' value={name} onChange={(e) => setName(e.target.value)} />
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                            }}>
                                <TextField label='cvc' value={cvc} onChange={(e) => setCvc(e.target.value)} />
                                <TextField label='expiry' value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {paymentType === "Pay with Crypto" &&
                <Box sx={{
                    p: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Iconify icon="bxl:bitcoin" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, mr: 1 }} />
                        <Typography variant='subtitle1' sx={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: theme => theme.palette.primary.main
                        }}>Explore Pay with Crypto</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{
                            width: '100%',
                            borderRadius: '10px',
                            border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            boxShadow: theme => theme.shadows[10],
                            display: 'flex',
                            p: 1.5,
                            cursor: 'pointer',
                            mb: 2,
                        }} onClick={() => setPayCryptoType('pay-crypto')}>
                            <RadioGroup value={payCryptoType}>
                                <Radio size="medium" value="pay-crypto" />
                            </RadioGroup>
                            <Box sx={{ ml: 1 }}>
                                <Typography variant='subtitle1'>Pay with Crypto</Typography>
                                <Typography variant='caption' component='p'>Secure payments portal</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            width: '100%',
                            borderRadius: '10px',
                            border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            boxShadow: theme => theme.shadows[10],
                            display: 'flex',
                            p: 1.5,
                            cursor: 'pointer',
                            mb: 2,
                        }} onClick={() => setPayCryptoType('buy-crypto')}>
                            <RadioGroup value={payCryptoType}>
                                <Radio size="medium" value="buy-crypto" />
                            </RadioGroup>
                            <Box sx={{ ml: 1 }}>
                                <Typography variant='subtitle1'>Buy Crypto to Pay</Typography>
                                <Typography variant='caption' component='p'>Buy Coins via Card</Typography>
                            </Box>
                        </Box>
                    </Box>
                    {
                        payCryptoType === "pay-crypto" ?
                            <Box sx={{
                            }}>
                                <Box sx={{
                                    borderRadius: '10px',
                                    background: theme => alpha(theme.palette.background.default, 0.1),
                                    backdropFilter: 'blur(10px)',
                                    p: 1.5,
                                    mb: 1,
                                }}>
                                    <Typography variant='subtitle2' component='p' sx={{ fontSize: "16px", mb: 1, }}>Pay</Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Input fullWidth disableUnderline inputProps={{
                                                style: {
                                                    fontSize: '20px',
                                                }
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            px: 1,
                                            py: 0.5,
                                            background: theme => alpha(theme.palette.background.default, 0.1),
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                        }} onClick={coinPopover.onOpen}>
                                            <Image src="/assets/icons/project/crypto/bitcoin_btc_logo.svg" sx={{
                                                width: '24px',
                                                height: '24px',
                                            }} />
                                            <Typography variant='caption' component='span' sx={{ mx: 1 }}>BITCOIN</Typography>
                                            <Iconify icon="icon-park-outline:down" sx={{ width: '20px', height: '20px' }} />
                                        </Box>
                                    </Box>

                                    <StyledPopover
                                        open={Boolean(coinPopover.open)}
                                        anchorEl={coinPopover.open}
                                        onClose={coinPopover.onClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        sx={{
                                        }}
                                    >
                                        <Box sx={{
                                            width: '100%',
                                            minWidth: '300px',
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 1,
                                            }}>
                                                <Typography variant='subtitle1'>Select Coin</Typography>
                                                <IconButton size='small' onClick={coinPopover.onClose} color="primary">
                                                    <CloseIcon fontSize='small' />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ p: 1, }}>
                                                <TextField fullWidth label="Search Coin" size='small' />
                                            </Box>
                                            <Box sx={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: theme => `${alpha(theme.palette.primary.main, 0.5)} ${alpha(theme.palette.background.paper, 0.24)}`,
                                                scrollbarTrackColor: theme => alpha(theme.palette.background.paper, 0.24),
                                            }}>
                                                <List>
                                                    {
                                                        coins.map((coin, index) => (
                                                            <ListItemButton key={index} onClick={coinPopover.onClose}>
                                                                <ListItemIcon>
                                                                    <Image src={coin.icon} sx={{
                                                                        width: '24px',
                                                                        height: '24px',
                                                                    }} />
                                                                </ListItemIcon>
                                                                <ListItemText primary={coin.name} secondary={coin.network} />
                                                            </ListItemButton>
                                                        ))
                                                    }
                                                </List>
                                            </Box>
                                        </Box>
                                    </StyledPopover>
                                </Box>
                                <Typography variant='caption' component='p' sx={{ alignSelf: 'flex-end' }}>1 BTC = $50,000</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <Button variant='contained' color='primary'>Pay Now</Button>
                                    <Button variant='outlined' color='primary' onClick={paymentDialogFlag.onFalse}>Cancel</Button>
                                </Box>
                            </Box> :
                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: upSm ? 'row' : 'column',
                                    gap: 1,
                                    mb: 2
                                }}>
                                    <TextField fullWidth label="Company Name" placeholder='Services, Inc.' />
                                    <CountrySelect
                                        label="Billing Country"
                                        placeholder="Choose a country"
                                        fullWidth
                                        value={country}
                                        onChange={(event, newValue) => setCountry(newValue as string)}
                                        options={countries.map((option) => option.label)}
                                        getOptionLabel={(option) => option}
                                        sx={{
                                            mb: 2,
                                        }}
                                    />
                                </Box>

                                <Typography variant='caption' component='p' sx={{ mb: 1 }}>Card Information</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: upSm ? 'row' : 'column',
                                    gap: 2,
                                }}>
                                    <Cards
                                        cvc={cvc}
                                        expiry={expiry}
                                        focused={fucused}
                                        name={name}
                                        number={number}
                                    />
                                    <Box>
                                        <TextField sx={{ mb: 1 }} fullWidth label='number' value={number} onChange={(e) => setNumber(e.target.value)} />
                                        <TextField sx={{ mb: 1 }} fullWidth label='name' value={name} onChange={(e) => setName(e.target.value)} />
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2,
                                        }}>
                                            <TextField label='cvc' value={cvc} onChange={(e) => setCvc(e.target.value)} />
                                            <TextField label='expiry' value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                    }
                </Box>
            }
        </StyledDialog>
    </Box>
}

export default SolarCostContent;