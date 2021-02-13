import React from 'react';

import epicLogo from '../../assets/logo.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={epicLogo} alt="EP" />
    </div>
);

export default logo;