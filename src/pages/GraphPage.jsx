import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, LinearProgress, Skeleton } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';
import { generateStaticLayout, calculateConnectionStrength } from '../utils/graphUtils';
import ObsidianGraph from '../components/graph/ObsidianGraph';
import TaskPopover from '../components/graph/TaskPopover';

const GraphPage = () => {
    const { tasks, loading } = useTasks();

    // State for the popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleNodeClick = (event, task) => {
        setAnchorEl(event.currentTarget);
        setSelectedTask(task);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedTask(null);
    };

    // Memoize graph data calculation to prevent re-calculating on every render
    const graphData = useMemo(() => {
        if (!tasks || tasks.length === 0) {
            return { nodes: [], links: [] };
        }

        const nodes = generateStaticLayout(tasks, window.innerWidth, window.innerHeight);
        const links = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const strength = calculateConnectionStrength(nodes[i], nodes[j]);
                if (strength > 0) {
                    links.push({ source: nodes[i], target: nodes[j], strength });
                }
            }
        }
        return { nodes, links };
    }, [tasks]);

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            {loading && <Skeleton variant="rectangular" width="100%" height="100vh" />}
            
            {!loading && tasks.length === 0 ? (
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <Paper sx={{p: 4, textAlign: 'center'}}>
                        <Typography variant="h5">No Tasks to Visualize</Typography>
                        <Typography color="text.secondary">Create some tasks in the Task Manager to see your graph!</Typography>
                    </Paper>
                </Box>
            ) : (
                <ObsidianGraph
                    nodes={graphData.nodes}
                    links={graphData.links}
                    onNodeClick={handleNodeClick}
                />
            )}

            <TaskPopover
                task={selectedTask}
                anchorEl={anchorEl}
                handleClose={handlePopoverClose}
            />
            {/* We will add filter controls here later if needed */}
        </Box>
    );
};

export default GraphPage;