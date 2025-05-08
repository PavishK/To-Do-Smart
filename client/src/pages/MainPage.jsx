import React, { useState,useEffect } from 'react';

import {
  useQuery,
  gql,
  useMutation
} from '@apollo/client';
import LoadingSpinner from '../LoadingSpinner';
import {getData,storeData} from '../services/StorageService.jsx';
import PopupBox from './PopupBox.jsx';

const RANDOM_PLACEHOLDERS=[
  "Type \"Product name followed by quantity x price(optional)\"",
  "Type \"dove shampoo 12x2\"",
  "Type \"Apple iphone 16 1\"",
  "Type \"Artic fox transparant mouse 1\"",
  "Type \"Apple fruit 12x10\"",
  "Type \"ROG phone 5 2\"",
]

const GET_DATA=gql`
  query{
    data
  }
`;

const POST_DATA=gql`
  mutation PostData($lists:[ToDoListTypes!]!){
    getToDoList(lists:$lists)
  }
`


function MainPage() {
  const [arrayList,setArrayList]=useState([{checked:false,todo:''}]);
  const [serverStatus,setServerStatus]=useState(false);
  const {loading,error,data}=useQuery(GET_DATA);
  const [getToDoList]=useMutation(POST_DATA);
  const [makeLoading,setMakeLoading]=useState(false);

  const [popupOutput,setPopupOutput]=useState({visible:false,data:''});

  useEffect(()=>{
    const archive=getData();
    if(archive!=false){
      setArrayList(archive);
    }
  },[])

  useEffect(() => {
    if (!loading && !error) {
      setServerStatus(true);
      setMakeLoading(true);
      
    } else {
      setServerStatus(false);
      setMakeLoading(false);
    }
    setTimeout(()=> setMakeLoading(false),1300);
  }, [loading, error]);

  const addFiled=()=>{
    setArrayList([...arrayList,{checked:false,todo:''}]);
  }

  const removeFiled=(i)=>{
    const updateList=arrayList.filter((_,index)=>index!==i);
    setArrayList(updateList);
    storeData(updateList);
  }

  const SubmitData=()=>{
    setMakeLoading(true);
    getToDoList({
      variables:{lists:arrayList}
    }).then((res)=>{
      setMakeLoading(false);
      setPopupOutput({visible:true,data:res.data.getToDoList});
    })
    .catch((err)=>{
      setMakeLoading(false);
      setPopupOutput({visible:true,data:"Error in Server 😓!"});
    });
  }

  const calculateData=()=>{

    var flag=false;

    for (let i of arrayList){
      if(i.todo==='')
        flag=true;
    }

    if(flag)
      alert("Empty ToDo List Founded! ❌");
    else
      SubmitData();
  }

  //Input Handlers

  const checkboxHandler=(i,e)=>{
    const updateList=[...arrayList];
    updateList[i].checked=e.target.checked;
    setArrayList(updateList);
    storeData(arrayList);
  }

  const textareaHandler=(i,e)=>{
    const updateList=[...arrayList];
    updateList[i].todo=e.target.value;
    setArrayList(updateList);
    storeData(arrayList);
  }

  return (
    <>
      <div className='h-screen w-full p-10'>
      <p className='p-2' >Server Status : 
      <span className={`p-1 font-semibold ${serverStatus? 'text-green-500':'text-red-500'}`}>{serverStatus?"Online ☺️":"Offline 👋"}</span></p>

      <div className='flex items-start justify-normal gap-x-5'>
        <h1 className='text-3xl sm:text-5xl transition-all delay-150 ease-in hover:line-through '>To Do List</h1>
        <button className='w-fit p-2 hover:bg-red-400 bg-red-500 rounded-lg sm:text-lg text-white' onClick={calculateData}>Predict Price</button>
      </div>

      <div className='w-full mt-10 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10'>
      {arrayList.map((val,index)=>(
      <div className='flex items-center justify-normal gap-x-6 border w-auto h-full p-4 rounded-lg' key={index}>
        <input className='form-checkbox w-7 h-6 '  type='checkbox' name='checked' value={arrayList[index].checked} onChange={(e)=>checkboxHandler(index,e)}  defaultChecked={arrayList[index].checked}/>
        <textarea className={`w-full h-auto resize-none focus:outline-0 caret-green-600 text-lg ${arrayList[index].checked? 'line-through text-gray-400 line-clamp-1':'line-clamp-none'} `} type='text'name='todo' value={arrayList[index].todo} onChange={(e)=>textareaHandler(index,e)} placeholder={RANDOM_PLACEHOLDERS[index%RANDOM_PLACEHOLDERS.length]}/>
        <button className={`text-5xl w-fit p-2 h-full rounded-lg bg-red-600 text-white ${index===0?'hidden':'block'}`} onClick={()=>removeFiled(index)}>-</button>
      </div>
      ))}
      <button className='text-6xl bg-green-600 rounded-lg w-auto h-auto flex items-center justify-center text-white' onClick={addFiled}>+</button>

      </div>
      </div>
      <LoadingSpinner loading={makeLoading}/>
      <PopupBox visible={popupOutput.visible} data={popupOutput.data} close={()=>setPopupOutput(false)}/>
    </>
  )
}

export default MainPage