import React, {Suspense} from 'react';
import styles from './App.module.scss';

// @ts-ignore
const RemoteCA3Test = React.lazy(() => import("childApp3/Test"));
// @ts-ignore
const RemoteCA3Button = React.lazy(() => import('childApp3/Button'));

// console.log(RemoteCA3Test)
function App() {
    return <div className={styles.app}>
        <Suspense fallback={'loading...'}>
            {/*<RemoteApp2/>*/}
            <RemoteCA3Test/>
            <RemoteCA3Button/>
        </Suspense>
    </div>
}

export default App;
