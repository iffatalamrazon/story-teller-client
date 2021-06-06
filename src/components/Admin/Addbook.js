
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Addbook.css';
import {MdDelete } from 'react-icons/md';
import {FaEdit } from 'react-icons/fa';
import { Nav, Navbar} from 'react-bootstrap';

const Addbook = () => {

 
    const { register, handleSubmit, watch, errors } = useForm();

     const [imageURL ,setIMageURL] = useState(null);

     const [books, setBooks]=useState([]);
 
     useEffect(()=>{
      fetch('https://desolate-garden-05488.herokuapp.com/event')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])

    //////////////delete function by admin
     
 const deleteProduct=(id)=>{
    fetch(`https://desolate-garden-05488.herokuapp.com/delete/${id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      console.log('this is delete');
      
      
    })
  }

    const onSubmit = data => {

        const eventData ={
            name: data.name,
            imageURL: imageURL,
            authorName : data.authorName,
            price : data.price,
        };

        const url = `https://desolate-garden-05488.herokuapp.com/addEvent`;
        
        
        fetch(url , {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(eventData)
            
        })
        .then( res  => console.log('server site res'))
    
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key','f933e3ba3326dfea1b0b88af1c7bcc8c');
        imageData.append('image',event.target.files[0]);
        

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setIMageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
       
      <div className="container d-flex">
      
      <div className="w-25 border border-primary mr-5 h-100">
          <Navbar>
              <Nav className="d-block">

                  <Nav.Link> Manage Admin</Nav.Link>
                  <Nav.Link>Add Book</Nav.Link>
                  <Nav.Link>Edit Book</Nav.Link>
               
              </Nav>
          </Navbar>

      </div>
      <div className="w-75 border border-secondary">
      <div className="container mr-auto">
           <form onSubmit={handleSubmit(onSubmit)} >
      <input name="name" placeholder="Enter Book name" ref={register} /><br/>
     
      <input name="author" placeholder="Enter Book author" ref={register} /><br/>
      <input name="price" placeholder="Enter Book price"  ref={register} /><br/>
      <input name="exampleRequired" type="file" onChange={handleImageUpload} /><br/>
      <input type="submit" />
    </form>
        </div>
      </div>
      <div className="w-75 border border-secondary">
      <table class="table">
<thead>
<tr>

<th scope="col">Book Name</th>
<th scope="col">Author Name</th>
<th scope="col">Price</th>
<th scope="col">Action</th>
</tr>
</thead>
<tbody>
{
 books.map(book=> <tr>
     
  <td>{book.name}</td>
  <td>{book.authorName}</td>
  <td>{book.price}</td>
  <td> <FaEdit/> <MdDelete onClick={()=>deleteProduct(book._id)}></MdDelete> </td>

</tr>)
}



</tbody>
</table>

      </div>

      {/* <FontAwesomeIcon icon={faBorderAll} color="green" />  */}
  </div>
);

};
export default Addbook;