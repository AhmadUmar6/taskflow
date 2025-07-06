import React from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTasks } from '../../contexts/TaskContext';

const FilterBar = () => {
    const {
        searchQuery, setSearchQuery, categoryFilter, setCategoryFilter,
        tagFilter, setTagFilter, allTags, allCategories
    } = useTasks();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const filterControls = (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
            {/* --- FIX is here: Added id and labelId --- */}
            <FormControl variant="filled" size="small" fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    {allCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
            </FormControl>
            {/* --- FIX is here: Added id and labelId --- */}
            <FormControl variant="filled" size="small" fullWidth>
                <InputLabel id="tag-select-label">Tag</InputLabel>
                <Select
                    labelId="tag-select-label"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                >
                    {allTags.map(tag => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
                </Select>
            </FormControl>
        </Stack>
    );

    if (isMobile) {
        return (
            <Box sx={{ p: 1 }}>
                <Accordion defaultExpanded={false} sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 0, '.MuiAccordionSummary-content': { m: 0 } }}>
                        <TextField
                            label="Search or Filter Tasks..."
                            variant="filled"
                            size="small"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                '.MuiFilledInput-root': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '12px' },
                                '.MuiFilledInput-underline:before, .MuiFilledInput-underline:after': { borderBottom: 'none' },
                            }}
                        />
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: { xs: 0, sm: 1 }, pt: 2 }}>
                        {filterControls}
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }

    // Desktop view also gets the fix applied
    return (
        <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: 'transparent' }}>
            <TextField
                label="Search Tasks"
                variant="filled"
                size="small"
                sx={{
                    minWidth: '300px',
                    '.MuiFilledInput-root': { borderRadius: '12px' },
                    '.MuiFilledInput-underline:before, .MuiFilledInput-underline:after': { borderBottom: 'none' },
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filterControls}
        </Box>
    );
};

export default FilterBar;