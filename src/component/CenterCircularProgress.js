import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CenterCircularProgress(props) {
    if (!props.isConfirmProgressing) {
        return null;
    }

    return (
        <Box sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: '9999',
        }}>
            <CircularProgress variant="soft" />
        </Box>
    );
}
