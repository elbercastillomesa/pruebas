import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Pages & Components Import
import Service from './Service'
import Client from './Client'
import { ClientContextProvider } from '../context/ClientContext';
import { ServiceContextProvider } from '../context/ServiceContext';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`celsia-tabpanel-${index}`}
            aria-labelledby={`celsia-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography component={'section'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `celsia-tab-${index}`,
        'aria-controls': `celsia-tabpanel-${index}`,
    };
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const Home = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="celsia-universe-tabs">
                    <Tab label="Clientes" {...a11yProps(0)} />
                    <Tab label="Servicios" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ClientContextProvider>
                    <Client />
                </ClientContextProvider>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ServiceContextProvider>
                    <Service />
                </ServiceContextProvider>
            </CustomTabPanel>
        </Box>
    );
}

export default Home