import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTasks } from './TaskContext';
import { isToday, isPast } from 'date-fns';

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    // Defensive: handle undefined from useTasks
    const tasksContext = useTasks();
    const tasks = tasksContext && Array.isArray(tasksContext.tasks) ? tasksContext.tasks : [];

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!Array.isArray(tasks) || tasks.length === 0) return;

        const generatedNotifications = new Set();

        // Check for new notifications every 30 seconds
        const intervalId = setInterval(() => {
            const newNotifs = [];

            // Trigger 1: Task is overdue
            tasks.forEach(task => {
                const notifId = `overdue-${task.id}`;
                if (task.status !== 'Completed' && isPast(task.deadline) && !generatedNotifications.has(notifId)) {
                    newNotifs.push({
                        id: notifId,
                        type: 'error',
                        message: `Task "${task.title}" is overdue!`,
                        date: new Date(),
                    });
                    generatedNotifications.add(notifId);
                }
            });

            // Trigger 2: Task is due today
            tasks.forEach(task => {
                const notifId = `due-today-${task.id}`;
                if (task.status !== 'Completed' && isToday(task.deadline) && !generatedNotifications.has(notifId)) {
                    newNotifs.push({
                        id: notifId,
                        type: 'warning',
                        message: `Task "${task.title}" is due today.`,
                        date: new Date(),
                    });
                    generatedNotifications.add(notifId);
                }
            });

            // Trigger 3: End of day summary (simplified for prototype)
            // This will trigger once per session when the component mounts if it hasn't been triggered today.
            const todayStr = new Date().toLocaleDateString();
            const summaryId = `summary-${todayStr}`;
            if (!generatedNotifications.has(summaryId)) {
                const completedToday = tasks.filter(t => t.status === 'Completed' && isToday(t.createdDate)).length;
                const createdToday = tasks.filter(t => isToday(t.createdDate)).length;
                if (createdToday > 0) {
                     newNotifs.push({
                        id: summaryId,
                        type: 'info',
                        message: `Great job! You completed ${completedToday}/${createdToday} of today's tasks.`,
                        date: new Date(),
                    });
                }
                generatedNotifications.add(summaryId);
            }

            if (newNotifs.length > 0) {
                setNotifications(prev => [...newNotifs, ...prev]);
            }

        }, 30000); // Check every 30 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [tasks]);

    const value = {
        notifications,
        unreadCount: notifications.length, // In a real app, you'd track read status
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}