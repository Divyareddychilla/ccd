import React from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel'; 
import LinearProgressWithLabel from './LinearProgressWithLabel';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


type ProgressType = 'circular' | 'linear';

interface LoaderProps {
    type?: ProgressType;
    color?: CircularProgressProps['color'] | LinearProgressProps['color']; 
    showProgress?: boolean;
    progress?: number;
}

const Loader: React.FC<LoaderProps> = ({ type='circular', color = 'primary', progress = 0, showProgress = false }) => {
    switch (type) {
        case 'circular':
            return (
                showProgress ?
                <CircularProgressWithLabel color={color as CircularProgressProps['color']} value={progress} /> :
                <CircularProgress color={color as CircularProgressProps['color']} />
            );
        case 'linear':
            return (
                showProgress ?
                <LinearProgressWithLabel color={color as LinearProgressProps['color']} value={progress} /> :
                <LinearProgress color={color as LinearProgressProps['color']} />
            );
        default:
            return  <CircularProgress color={color as CircularProgressProps['color']} />; 
    }
};

export default Loader;
