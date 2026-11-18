import styles from './FactBox.module.css';
import type {ReactNode} from 'react';

type FactBoxProps = {
    header?: string[];
    children: ReactNode
};

export const FactBox = ({header, children}: FactBoxProps) => (<>
    <ins className={styles.factbox}>
        <strong className={styles.header}>{header?.length ? header.join(' ') : 'Fact Box'}</strong>
        <br/>
        <div className={styles.body}>{children}</div>
    </ins>
</>)
