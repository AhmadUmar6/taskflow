import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonKanban = () => {
    return (
         <Box
            sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                overflowX: 'auto',
                flexGrow: 1,
            }}
        >
            {[...Array(3)].map((_, colIndex) => (
                <Box key={colIndex} sx={{ flex: 1, minWidth: 300 }}>
                    <Skeleton variant="text" width="60%" height={40} sx={{ margin: 'auto', mb: 2 }} />
                    <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 3, height: '100%' }}>
                        {[...Array(3)].map((_, cardIndex) => (
                            <Box key={cardIndex} sx={{ mb: 2 }}>
                                <Skeleton variant="rectangular" height={120} sx={{borderRadius: 2}} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default SkeletonKanban;