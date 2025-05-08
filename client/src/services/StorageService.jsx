

export const storeData=(data)=>{
    localStorage.setItem('OdOt¬_¬',JSON.stringify(data));
}

export const getData=()=>{
    const data=JSON.parse(localStorage.getItem('OdOt¬_¬'));
    return data!=null?data:false;
}