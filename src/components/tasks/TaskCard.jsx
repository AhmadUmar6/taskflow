import React from 'react';
import { Paper, Typography, Box, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { useTasks } from '../../contexts/TaskContext';
import { TASK_STATUSES } from '../../constants/tasks';
import { motion } from 'framer-motion';

// Icons
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

const TaskCard = ({ task, onEdit }) => {
    const { deleteTask, updateTask } = useTasks();

    const getBorderColor = () => {
        const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== TASK_STATUSES.COMPLETED;
        if (isOverdue) return 'error.main';

        switch (task.status) {
            case TASK_STATUSES.TODO:
                return 'secondary.main'; // Blue
            case TASK_STATUSES.IN_PROGRESS:
                return 'warning.main'; // Yellow
            case TASK_STATUSES.COMPLETED:
                return '#1E8449'; // Earthy Dark Green
            default:
                return 'grey.500';
        }
    };

    const handleMoveTask = (e, newStatus) => {
        e.stopPropagation();
        updateTask(task.id, { status: newStatus });
    };

    // Other handlers (handleDragStart, handleDelete) remain the same...
    const handleDragStart = (e) => e.dataTransfer.setData("taskId", task.id);
    const handleDelete = (e) => { e.stopPropagation(); if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) { deleteTask(task.id); }};

    return (
        <motion.div layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}>
            <Paper
                elevation={2}
                sx={{ p: 2, mb: 2, cursor: 'grab', '&:hover': { boxShadow: 6 }, borderLeft: 5, borderColor: getBorderColor(), transition: 'border-color 0.3s', backgroundColor: task.status === TASK_STATUSES.COMPLETED ? '#fafafa' : 'background.paper' }}
                draggable="true" onDragStart={handleDragStart} onClick={() => onEdit(task)}
            >
                {/* ... Card content remains the same ... */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, flexGrow: 1, textDecoration: task.status === TASK_STATUSES.COMPLETED ? 'line-through' : 'none', color: task.status === TASK_STATUSES.COMPLETED ? 'text.disabled' : 'text.primary' }}>
                        {task.title}
                    </Typography>
                     <Tooltip title="Delete Task"><IconButton size="small" onClick={handleDelete} sx={{ color: 'grey.500' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                </Stack>
                <Typography variant="body2" color={task.status === TASK_STATUSES.COMPLETED ? 'text.disabled' : 'text.secondary'} sx={{ mb: 2 }}>
                    Due: {task.deadline ? format(new Date(task.deadline), 'MMM dd, yyyy') : 'No date'}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', gap: 1 }}><Chip label={task.category} size="small" /><Chip label={task.tag} size="small" variant="outlined" /></Box>
                    <Box>
                        {task.status === TASK_STATUSES.TODO && (<Tooltip title="Start Task"><IconButton size="small" onClick={(e) => handleMoveTask(e, TASK_STATUSES.IN_PROGRESS)}><PlayArrowIcon color="warning" /></IconButton></Tooltip>)}
                        {task.status === TASK_STATUSES.IN_PROGRESS && (<Tooltip title="Complete Task"><IconButton size="small" onClick={(e) => handleMoveTask(e, TASK_STATUSES.COMPLETED)}><CheckCircleIcon sx={{ color: '#1E8449' }} /></IconButton></Tooltip>)}
                        {task.status === TASK_STATUSES.COMPLETED && (<Tooltip title="Re-open Task"><IconButton size="small" onClick={(e) => handleMoveTask(e, TASK_STATUSES.TODO)}><ReplayIcon color="action" /></IconButton></Tooltip>)}
                    </Box>
                </Stack>
            </Paper>
        </motion.div>
    );
};

export default TaskCard;