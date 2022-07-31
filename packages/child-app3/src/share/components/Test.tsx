import React from 'react';
import styles from '../styles/test.module.scss'
import '../styles/test.scss'

interface Props{
    children?:React.ReactNode
}
export default function Test(props:Props) {
    return <div>
        <h2>{props.children}</h2>
        <div className={styles.test}>测试test.module.scss</div>
        <div className={'childApp3-test'}>测试test.scss</div>
    </div>
}

