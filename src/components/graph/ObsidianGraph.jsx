import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '@mui/material/styles';

const ObsidianGraph = ({ nodes, links, onNodeClick }) => {
    const svgRef = useRef();
    const theme = useTheme();

    // Helper to get emoji from category string
    const getEmoji = (category) => category.split(' ')[0];

    // Helper to get color based on task status
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'to do':
                return '#2196F3'; // Blue
            case 'in progress':
                return '#FFEB3B'; // Yellow
            case 'completed':
                return '#4CAF50'; // Green
            case 'overdue':
                return '#F44336'; // Red
            default:
                return '#2196F3'; // Default to blue for unknown status
        }
    };

    useEffect(() => {
        if (!nodes || !nodes.length) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .call(d3.zoom().on('zoom', (event) => {
                g.attr('transform', event.transform);
            }));

        // Clear previous render
        svg.selectAll('*').remove();

        // Add a shadow filter for the 3D effect
        const defs = svg.append('defs');
        const filter = defs.append('filter')
            .attr('id', 'drop-shadow')
            .attr('height', '130%');
        filter.append('feGaussianBlur')
            .attr('in', 'SourceAlpha')
            .attr('stdDeviation', 3)
            .attr('result', 'blur');
        filter.append('feOffset')
            .attr('in', 'blur')
            .attr('dx', 2)
            .attr('dy', 2)
            .attr('result', 'offsetBlur');
        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'offsetBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        const g = svg.append('g');

        // Draw Links
        g.selectAll('line')
            .data(links)
            .enter().append('line')
            .style('stroke', '#aaa')
            .style('stroke-opacity', 0.6)
            .style('stroke-width', d => d.strength * 1.5)
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        // Draw Nodes
        const node = g.selectAll('g.node')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('click', (event, d) => onNodeClick(event, d));

        node.append('circle')
            .attr('r', 25)
            .style('fill', d => getStatusColor(d.status))
            .style('stroke', '#fff')
            .style('stroke-width', 3)
            .style('cursor', 'pointer')
            .style('filter', 'url(#drop-shadow)');

        node.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('pointer-events', 'none')
            .text(d => getEmoji(d.category));

    }, [nodes, links, onNodeClick, theme]);

    return <svg ref={svgRef}></svg>;
};

export default ObsidianGraph;