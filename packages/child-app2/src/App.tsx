import React, {Suspense, useEffect} from 'react';
import styles from './App.module.scss';
// @ts-ignore
import add from 'childApp3/utils/add'

// @ts-ignore
const RemoteCA3Test = React.lazy(() => import("childApp3/components/Test"));
// @ts-ignore
const RemoteCA3Counter = React.lazy(() => import('childApp3/components/Counter'));

export default function App() {
    useEffect(()=>{
        console.log('add(1,2)',add(1, 2));
        console.log('add(2,4)',add(2, 4));
    },[])

    return <div className={styles.app}>
        <Suspense fallback={'loading...'}>
            <RemoteCA3Test>ChildApp2 引入组件测试</RemoteCA3Test>
            <RemoteCA3Counter/>
        </Suspense>
    </div>
}
