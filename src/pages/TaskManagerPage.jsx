import React, { useState } from 'react';
import { Box, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanBoard from '../components/tasks/KanBanBoard';
import TaskModal from '../components/tasks/TaskModal';
import FilterBar from '../components/tasks/FilterBar';
import SkeletonKanban from '../components/tasks/SkeletonKanban';
import { useTasks } from '../contexts/TaskContext';

const TaskManagerPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const { loading } = useTasks();

    const handleOpenModal = (task = null) => {
        setTaskToEdit(task);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setTaskToEdit(null);
        setModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <FilterBar />
            
            {loading ? (
                <SkeletonKanban />
            ) : (
                <KanbanBoard onEditTask={handleOpenModal} />
            )}

            <TaskModal
                open={modalOpen}
                handleClose={handleCloseModal}
                taskToEdit={taskToEdit}
            />

            {/* Floating Action Button for adding tasks on mobile */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleOpenModal()}
                sx={{
                    position: 'absolute',
                    bottom: 80, // Above the bottom nav
                    right: 24,
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default TaskManagerPage;