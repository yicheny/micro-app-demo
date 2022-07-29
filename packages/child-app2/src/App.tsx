import React, {Suspense} from 'react';
import styles from './App.module.scss';

// @ts-ignore
// const RemoteApp2 = React.lazy(() => import("app2/App"));
const RemoteCA3Test = React.lazy(() => import("childApp3/Test"));

console.log(RemoteCA3Test)
function App() {
    return <div className={styles.app}>
        <Suspense fallback={'loading...'}>
            {/*<RemoteApp2/>*/}
            <RemoteCA3Test/>
        </Suspense>
    </div>
}

export default App;
