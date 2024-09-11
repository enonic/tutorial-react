import React from 'react'

import styles from './FactBox.module.css';
import {RichText} from '@enonic/react-components';
import {RestProps} from '../index';

interface FactBoxProps extends RestProps {
    config: Record<string, any>
}

export const FactBox = ({config, guillotineUrl, personId}: FactBoxProps) => (<>
    <ins className={styles.factbox}>
        <i className={styles.icon}/>
        <strong className={styles.header}>{config.header?.length ? config.header : 'Fact Box'}</strong>
        <RichText<RestProps> className={styles.body}
                             data={config.body}
                             guillotineUrl={guillotineUrl}
                             personId={personId}
        />
    </ins>
</>)
