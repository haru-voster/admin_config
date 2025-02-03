import React, {  useState } from 'react';
import { assets } from '../../assets/assets'
import "./Add.css";
import axios from "axios"
import { toast } from 'react-toastify';

const Add = () => {

  const url = "https://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Monitor"

  })

  const onChangeHandler = (event) =>{
    const name =  event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
//for changing data
  //useEffect(()=>{
   // console.log(data); 

  //},[data])
  //creating api functionR
  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
//calling API
const response = await axios.post(`http://localhost:4000/api/sale/add`, formData);

    if (response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Monitor"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {

      toast.error(response.data.message)
      
    }
  }

  return (
    <div className="add">
      <form className="flex-col"onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_icon} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Enter here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description"  rows='6' placeholder="write content here"></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category-price flex-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value='Apple'>Apple</option>
                    <option value='Hp'>Hp</option>
                    <option value='Lenovo'>Lenovo</option>
                    <option value='charger'>Charger</option>
                    <option value='Dell'>Dell</option>
                    <option value='VGA'>VGA</option>
                    <option value='Ram'>RAM</option>
                    <option value='Monitor'>Monitor</option>
                    <option value='disk'>Disk</option>
                    <option value='stand'>Laptop Stand</option>
                    <option value='USB'>USB</option>
                    <option value='flash'>Flash Disk</option>
                    <option value='Battery'>Battery</option>
                    <option value='mouse'>Mouse</option>
                    <option value='keyboard'>Keyboard</option>
                    <option value="SSD">SSD</option>
                    <option value="Huawei">Ethernet cable</option>
                    <option value="HDD">HDD</option>
                    <option value="stand">Stand</option>
                    <option value="convertor">Convertor</option>
                    <option value="Huawei">Huawei</option>
                </select>
          </div> 
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="kshs.1000"/>
             
          </div>  
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
