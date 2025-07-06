import React from 'react';
import { Popover, Typography, Box, Divider, Chip } from '@mui/material';
import { format } from 'date-fns';

const TaskPopover = ({ task, anchorEl, handleClose }) => {
    const open = Boolean(anchorEl);

    if (!task) return null;

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{ sx: { p: 2, maxWidth: 300, borderRadius: 3 } }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Due: {task.deadline ? format(new Date(task.deadline), 'MMM dd, yyyy') : 'No Date'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ mb: 2 }}>{task.description || 'No description.'}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={task.category} size="small" />
                <Chip label={task.tag} size="small" variant="outlined" />
            </Box>
        </Popover>
    );
};

export default TaskPopover;