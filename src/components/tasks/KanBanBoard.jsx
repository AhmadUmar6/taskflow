import React, { useState } from 'react';
import { Box, useMediaQuery, Tabs, Tab, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import { useTasks } from '../../contexts/TaskContext';
import { TASK_STATUSES, getStatusColor } from '../../constants/tasks'; // Import helper

// Icons for tabs
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const KanbanBoard = ({ onEditTask }) => {
    const { filteredTasks } = useTasks();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState(0);

    const todoTasks = filteredTasks.filter(t => t.status === TASK_STATUSES.TODO);
    const inProgressTasks = filteredTasks.filter(t => t.status === TASK_STATUSES.IN_PROGRESS);
    const completedTasks = filteredTasks.filter(t => t.status === TASK_STATUSES.COMPLETED);

    const columns = [
        { title: TASK_STATUSES.TODO, tasks: todoTasks, icon: <ListAltIcon /> },
        { title: TASK_STATUSES.IN_PROGRESS, tasks: inProgressTasks, icon: <TrendingUpIcon /> },
        { title: TASK_STATUSES.COMPLETED, tasks: completedTasks, icon: <CheckCircleOutlineIcon /> },
    ];

    // Mobile View: A clean, tabbed interface
    if (isMobile) {
        const currentTasks = columns[activeTab].tasks;
        return (
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} variant="fullWidth">
                        {columns.map(col => (
                            <Tab
                                key={col.title}
                                iconPosition="start"
                                // Use the helper for the badge color
                                icon={
                                    <Badge
                                        badgeContent={col.tasks.length}
                                        color={getStatusColor(col.title)}
                                        sx={{ mr: 2 }}
                                    >
                                        {col.icon}
                                    </Badge>
                                }
                                label={col.title}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                    <AnimatePresence>
                        {currentTasks.map(task => (
                            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                        ))}
                    </AnimatePresence>
                </Box>
            </Box>
        );
    }

    // Desktop View: The traditional 3-column layout
    return (
        <Box sx={{ display: 'flex', gap: 2, p: 2, overflowX: 'auto', flexGrow: 1 }}>
            <AnimatePresence>
                {columns.map(col => (
                    <KanbanColumn
                        key={col.title}
                        title={col.title}
                        tasks={col.tasks}
                        icon={col.icon}
                        onEditTask={onEditTask}
                    />
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default KanbanBoard;