import React, { useState } from 'react';
import { Paper, Typography, Box, Stack, Badge } from '@mui/material';
import TaskCard from './TaskCard';
import { useTasks } from '../../contexts/TaskContext';
import { getStatusColor } from '../../constants/tasks';

const KanbanColumn = ({ title, tasks, icon, onEditTask }) => {
    const { updateTask } = useTasks();
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = () => { setIsDragOver(false); };
    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
            updateTask(taskId, { status: title });
        }
        setIsDragOver(false);
    };

    return (
        <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{
                    p: 1.5,
                    borderBottom: '3px solid',
                    borderColor: `${getStatusColor(title)}.main`
                }}
            >
                {icon}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {title}
                </Typography>
                <Badge badgeContent={tasks.length} color={getStatusColor(title)} />
            </Stack>
            <Paper
                elevation={0}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                sx={{
                    flexGrow: 1,
                    p: 2,
                    bgcolor: isDragOver ? `${getStatusColor(title)}.light` : 'grey.100',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    transition: 'background-color 0.2s ease-in-out',
                    overflowY: 'auto'
                }}
            >
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))}
            </Paper>
        </Box>
    );
};

export default KanbanColumn;