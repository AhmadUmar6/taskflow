import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';
// --- 1. IMPORT the correct list from your constants file ---
import { PREDEFINED_CATEGORIES } from '../constants/tasks';

const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskProvider({ children }) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [tagFilter, setTagFilter] = useState('All');

    // Fetch tasks in real-time (this part is correct)
    useEffect(() => {
        if (!currentUser) {
            setTasks([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const tasksCollectionRef = collection(db, 'tasks');
        const q = query(tasksCollectionRef, where("userId", "==", currentUser.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                deadline: doc.data().deadline?.toDate(),
                createdDate: doc.data().createdDate?.toDate(),
            }));
            setTasks(tasksData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tasks: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    // Derived state: unique tags for the filter dropdown
    const allTags = useMemo(() => {
        const tags = new Set(tasks.map(task => task.tag).filter(Boolean));
        return ['All', ...Array.from(tags)];
    }, [tasks]);

    // --- 2. FIX the logic to use the imported list ---
    // This now correctly combines your predefined categories with any custom
    // categories users have created in their tasks.
    const allCategories = useMemo(() => {
        const categoriesFromTasks = new Set(tasks.map(task => task.category).filter(Boolean));
        const combined = new Set([...PREDEFINED_CATEGORIES, ...categoriesFromTasks]);
        return ['All', ...Array.from(combined)];
    }, [tasks]);

    // Memoized filtering logic (this part is correct)
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                task.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const categoryMatch = categoryFilter === 'All' || task.category === categoryFilter;
            const tagMatch = tagFilter === 'All' || task.tag === tagFilter;
            return searchMatch && categoryMatch && tagMatch;
        });
    }, [tasks, searchQuery, categoryFilter, tagFilter]);

    // --- CRUD Operations (this part is correct) ---
    const addTask = (taskData) => {
        return addDoc(collection(db, 'tasks'), {
            ...taskData,
            userId: currentUser.uid,
            createdDate: serverTimestamp(),
            status: 'To Do',
        });
    };

    const updateTask = (taskId, updatedData) => {
        const taskDocRef = doc(db, 'tasks', taskId);
        return updateDoc(taskDocRef, updatedData);
    };

    const deleteTask = (taskId) => {
        const taskDocRef = doc(db, 'tasks', taskId);
        return deleteDoc(taskDocRef);
    };
    
    const value = {
        tasks,
        filteredTasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        tagFilter,
        setTagFilter,
        allTags,
        allCategories,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}