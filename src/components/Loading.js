import React from 'react';
import ReactLoading from 'react-loading';
import Colors from '../constants/Colors'
import './Loading.css'
 
const Loading = ({ type, color }) => (
 
        <div className='container-loading'>
            <ReactLoading type="spinningBubbles" color={Colors.SecondaryColor} height={80} width={80} />
        </div>

    
);
 
export default Loading;