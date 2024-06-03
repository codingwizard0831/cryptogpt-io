
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import { Box, Tab, Tabs, Grid, alpha, BoxProps } from '@mui/material';

import DeliverGroupOrderItem from '../deliver-group-order-item';
import DeliverShoppingCartOrdersItem from '../deliver-shopping-cart-orders-item';

interface DeliverOrdersSectionProps extends BoxProps {
    isDrawer?: boolean;
}

export default function DeliverOrdersSection({ isDrawer, sx, ...other }: DeliverOrdersSectionProps) {
    const [currentTab, setCurrentTab] = useState('my-orders');

    const handleChangeCurrentTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    return (<Box sx={{
        mb: 2,
        ...sx,
    }} {...other}>

        <Tabs value={currentTab}
            onChange={handleChangeCurrentTab}
            sx={{
                width: '100%',
                borderBottom: 1,
                borderColor: (theme) => alpha(theme.palette.divider, 0.48),
                mb: 2,
                position: 'sticky',
                top: 0,
                ...(isDrawer && {
                    // backgroundColor: (theme) => alpha(theme.palette.background.default, 0.9),
                    // backdropFilter: 'blur(10px)',
                })
            }}>
            <Tab value="my-orders" label="Shopping carts" />
            <Tab value="order-again" label="Order again" />
            <Tab value="group-orders" label="Group Orders" />
        </Tabs>

        <TabPanel value={currentTab} index="my-orders">
            <Grid container spacing={2}>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem />
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value={currentTab} index="order-again">
            <Grid container spacing={2}>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem type="again" />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem type="again" />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem type="again" />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverShoppingCartOrdersItem type="again" />
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value={currentTab} index="group-orders">
            <Grid container spacing={2}>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverGroupOrderItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverGroupOrderItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverGroupOrderItem />
                </Grid>
                <Grid item xs={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 4}>
                    <DeliverGroupOrderItem />
                </Grid>
            </Grid>
        </TabPanel>
    </Box>
    );
}


function TabPanel(props: { children?: React.ReactNode; value: string; index: string }) {
    const { children, value, index } = props;
    const isVisible = value === index;

    return (
        <div
            role="tabpanel"
            hidden={!isVisible}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            <AnimatePresence>
                {isVisible && (
                    <m.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 3 }}
                    >
                        <Box sx={{}}>
                            {children}
                        </Box>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}