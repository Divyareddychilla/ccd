import React from 'react';
import Loader from "./Loader";
import { CircularProgressProps } from '@mui/material/CircularProgress';

const Loaderindex: React.FC = () => {
    const loaderDetailsCircular: { color: CircularProgressProps['color'], showProgress: true, progress:number } = {
        color: 'success', 
        showProgress: true,
        progress: 10,
    };

    const loaderDetailsLinear: { color: CircularProgressProps['color'], showProgress: true, progress:number } = {
        color: 'primary', 
        showProgress: true,
        progress: 50,
    };

    return (
        <div>
            <div className='circular_loaders'>
                <Loader type="circular" color={loaderDetailsCircular.color} showProgress={loaderDetailsCircular.showProgress} progress={loaderDetailsCircular.progress}/>
                <Loader type="circular" showProgress={loaderDetailsCircular.showProgress} color={loaderDetailsCircular.color}/>
                <Loader type="circular" />
            </div>

            <div className='linear_loaders'>
                <Loader type="linear" color={loaderDetailsLinear.color} showProgress={loaderDetailsLinear.showProgress} progress={loaderDetailsLinear.progress}/>
                <Loader type="linear" showProgress={loaderDetailsLinear.showProgress} color={loaderDetailsLinear.color}/>
                <Loader type="linear" />
            </div>
            
            <Loader  />

        </div>
    );
};

export default Loaderindex;
