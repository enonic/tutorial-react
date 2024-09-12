import React from 'react'

import styles from './FactBox.module.css';
import {RestProps} from '../index';

declare type FactBoxProps = {
    config: Record<string, any>
    children: React.ReactNode
} & RestProps;

export const FactBox = ({config, children, guillotineUrl, personId}: FactBoxProps) => (<>
    <ins className={styles.factbox}>
        <i className={styles.icon}/>
        <strong className={styles.header}>{config.header?.length ? config.header : 'Fact Box'}</strong>
        <br/>
        {children}
    </ins>
</>)
