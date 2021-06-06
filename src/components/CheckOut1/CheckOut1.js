import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Table from "react-bootstrap/Table";
import { PhoneBluetoothSpeakerSharp } from "@material-ui/icons";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const CheckOut1 = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("https://desolate-garden-05488.herokuapp.com/event")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  const book = events.find((event) => event?._id == id);
  console.log(book);

  //////////
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
 
  
  
  const onSubmit = data => {
    console.log('form submitted', data)
   // const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser,Book: book?.name,Author: book?.authorName, orderTime: new Date()};
    
            
    

    fetch('https://desolate-garden-05488.herokuapp.com/addOrder' , {

      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
  })
  .then(res => res.json())
  .then(data => {
    if(data) {
    
      
      // alert('your order is ready')
    }
  });


  };
  ///////////
  console.log(loggedInUser);
  return (
    <div className="jumbotron">
      <h1>this is order page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
     
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <td>{book?.name}</td>
            <td>1</td>
            <td>${book?.price}</td>
          </tr>
          <tr>
        
            <td>Total </td>
            <td></td>
            <td>${book?.price}</td>
          </tr>
          {/* <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </Table>
      <div className="d-flex"><Link to={`/order`} ><button onClick={onSubmit} className="btn btn-primary  ml-auto">Checkout</button></Link></div>
    </div>
  );
};

export default CheckOut1;
