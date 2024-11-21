import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = () => {

  
const url = "http://localhost:4000"
const [list, setList] = useState([]);
const fetchList = async ()=>{
  const response = await axios.get(`http://localhost:4000/api/sale/list`);
  if (response.data.success){
    setList(response.data.data)

  }
  else{
    toast.error("Error")
  }
}
const removeSale = async(saleId) =>{
  const response = await axios.post(`${url}/api/sale/remove`,{id:saleId});
  await fetchList();
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Failed to remove")
  }

}
useEffect(()=>{
  fetchList();
},[])

  return (
    <div className='list add flex-col'>
      <p>All Sales</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`http://localhost:4000/image/`+item.image} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Kshs.{item.price}</p>
              <p onClick={()=>removeSale(item._id)} className='cursor'>Delete</p>

            </div>
          )

        })}
      </div>
    </div>
  )
}

export default List
