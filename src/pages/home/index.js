import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import s from './index.module.less';
import car from '@/assets/images/fireCar.png';

const App = ()=> {
   
    const [count, setCounts ] = useState(1)
    const onChange = () => {
      const dd = count+1;
      setCounts(dd)
    }
    console.log('render---33445555');
    console.info('render---2')
    // 删除注释了吗
    return (<>
      <img src={car} />
      <div className={s.bg} onClick={onChange}>999</div>
      <div className={s.div}>{count}</div>
      {/* <input type="text" value={count} onChange={onChange} />
      <br/>
      <input type="text" /> */}
    </>)
}
const root = document.getElementById('root');

if(root) {
  createRoot(root).render(<App />)
}

