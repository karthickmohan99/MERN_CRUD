import React, { useState ,useEffect} from 'react'
import Spinner from '../../Components/Spinner';
const LazyLoader = (importComp,fallBack) => {
   const LazyComponent =(props)=>{
    
    const [component, setComponent] = useState(null);
    const C = component ? component.default : null;
    useEffect(() => {
      importComp().then((comp) => {
        setComponent(comp);
      });
    }, []);

    return C ? <C {...props} /> : fallBack || <Spinner />;

   }

   return LazyComponent;
}

export default LazyLoader