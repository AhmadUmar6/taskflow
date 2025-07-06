export const PREDEFINED_CATEGORIES = [
    '💼 Work', '🏠 Personal', '📅 Meeting', '🎯 Goal', '📚 Learning',
    '🏋️ Fitness', '💰 Finance', '🛒 Shopping', '🧼 Chores',
];

export const TASK_STATUSES = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
};

// --- NEW HELPER FUNCTION ---
// This function will provide the correct color for any given status.
export const getStatusColor = (status) => {
    switch (status) {
        case TASK_STATUSES.TODO:
            return 'secondary'; // Our theme's Blue
        case TASK_STATUSES.IN_PROGRESS:
            return 'warning'; // Our theme's Yellow
        case TASK_STATUSES.COMPLETED:
            return 'success'; // Our theme's Green
        default:
            return 'grey';
    }
};