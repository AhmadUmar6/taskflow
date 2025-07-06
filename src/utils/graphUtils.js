import { differenceInDays } from 'date-fns';

/**
 * Calculates the connection strength between two tasks based on shared properties.
 * @param {object} task1 - The first task object.
 * @param {object} task2 - The second task object.
 * @returns {number} - A strength value from 0 to 3.
 */
export function calculateConnectionStrength(task1, task2) {
    let matches = 0;
    // Tag match
    if (task1.tag && task1.tag === task2.tag) {
        matches++;
    }
    // Category match
    if (task1.category && task1.category === task2.category) {
        matches++;
    }
    // Deadline proximity (within 3 days)
    if (task1.deadline && task2.deadline) {
        if (Math.abs(differenceInDays(new Date(task1.deadline), new Date(task2.deadline))) <= 3) {
            matches++;
        }
    }
    return matches;
}


/**
 * Generates a static, deterministic layout for the graph nodes.
 * It arranges tasks in clusters based on their category.
 * @param {Array} tasks - The array of task objects to display.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @returns {Array} - An array of node objects with x and y coordinates.
 */
export function generateStaticLayout(tasks, width, height) {
    const categoryGroups = {};
    tasks.forEach(task => {
        if (!categoryGroups[task.category]) {
            categoryGroups[task.category] = [];
        }
        categoryGroups[task.category].push(task);
    });

    const categories = Object.keys(categoryGroups);
    const numCategories = categories.length;
    const mainRadius = Math.min(width, height) / 3; // Radius for positioning category clusters
    const center = { x: width / 2, y: height / 2 };

    const nodes = [];

    categories.forEach((category, i) => {
        const angle = (i / numCategories) * 2 * Math.PI;
        const clusterCenterX = center.x + mainRadius * Math.cos(angle);
        const clusterCenterY = center.y + mainRadius * Math.sin(angle);
        
        const tasksInCategory = categoryGroups[category];
        const numTasks = tasksInCategory.length;
        const clusterRadius = 50 + numTasks * 5; // Radius of the category cluster itself

        tasksInCategory.forEach((task, j) => {
            const taskAngle = (j / numTasks) * 2 * Math.PI;
            const x = clusterCenterX + clusterRadius * Math.cos(taskAngle);
            const y = clusterCenterY + clusterRadius * Math.sin(taskAngle);
            nodes.push({ ...task, x, y });
        });
    });

    return nodes;
}