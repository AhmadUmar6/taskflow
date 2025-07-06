import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Autocomplete, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { useTasks } from '../../contexts/TaskContext';

const modalStyle = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24, p: 4,
    maxHeight: '90vh', overflowY: 'auto'
};

const TaskModal = ({ open, handleClose, taskToEdit }) => {
    const { addTask, updateTask, allTags, allCategories } = useTasks();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const [errors, setErrors] = useState({});

    // Populate form if we are editing a task
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setDeadline(taskToEdit.deadline || null);
            setCategory(taskToEdit.category || '');
            setTag(taskToEdit.tag || '');
        } else {
            // Reset form for new task
            setTitle('');
            setDescription('');
            setDeadline(null);
            setCategory('');
            setTag('');
        }
        setErrors({});
    }, [taskToEdit, open]);

    const validate = () => {
        const tempErrors = {};
        if (!title.trim()) tempErrors.title = "Title is required.";
        if (!deadline) tempErrors.deadline = "Deadline is required.";
        if (!category) tempErrors.category = "Category is required.";
        if (!tag.trim()) tempErrors.tag = "Tag is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        const taskData = { title, description, deadline, category, tag };

        try {
            if (taskToEdit) {
                await updateTask(taskToEdit.id, taskData);
            } else {
                await addTask(taskData);
            }
            handleClose();
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            {taskToEdit ? 'Edit Task' : 'Add New Task'}
                        </Typography>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth margin="normal" label="Task Title" variant="outlined"
                            value={title} onChange={e => setTitle(e.target.value)}
                            error={!!errors.title} helperText={errors.title}
                        />
                        <TextField
                            fullWidth margin="normal" label="Description (Optional)" variant="outlined"
                            multiline rows={4} value={description} onChange={e => setDescription(e.target.value)}
                        />

                        {/* --- THIS IS THE FIX for the Date Picker --- */}
                        <DatePicker
                            label="Deadline"
                            value={deadline}
                            onChange={(newValue) => setDeadline(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                    error: !!errors.deadline,
                                    helperText: errors.deadline,
                                },
                            }}
                        />

                        <Autocomplete
                            freeSolo fullWidth
                            options={allCategories.filter(c => c !== 'All')}
                            value={category}
                            onChange={(e, newValue) => setCategory(newValue || '')}
                            onInputChange={(e, newInputValue) => setCategory(newInputValue)}
                            renderInput={(params) => 
                                <TextField {...params} label="Category" margin="normal"
                                error={!!errors.category} helperText={errors.category} />
                            }
                        />
                        <Autocomplete
                            freeSolo fullWidth
                            options={allTags.filter(t => t !== 'All')}
                            value={tag}
                            onChange={(event, newValue) => setTag(newValue || '')}
                            onInputChange={(event, newInputValue) => setTag(newInputValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Tag (e.g., #urgent)" margin="normal"
                                    error={!!errors.tag} helperText={errors.tag}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" size="large" sx={{ mt: 2, width: '100%' }}>
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};

export default TaskModal;