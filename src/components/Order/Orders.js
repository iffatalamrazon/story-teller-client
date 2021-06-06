
        import React, { useEffect, useState } from 'react';
        import { Table } from 'react-bootstrap';
        
        const Orders = () => {
            const [orderInfo,setOrderInfo]=useState([])
           
            useEffect(()=>{
                fetch('https://desolate-garden-05488.herokuapp.com/orders')
                .then(res=>res.json())
                .then(data=>setOrderInfo(data))
            },[])
            console.log(orderInfo)
            return (
                <div className="jumbotron">
                 
                   <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Price</th>
              <th>Date and Time</th>
              
              
        
              
            </tr>
          </thead>
          <tbody>
           {
               orderInfo.map(order=>
                <tr>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.Book}</td>
                <td>{order.Author}</td>
                <td>{order.price}</td>
                <td>{order.orderTime}</td>
                
                
               
              </tr>
                )
           }
            
          </tbody>
        </Table>
                    
                </div>
                
            );
        };
        
       
export default Orders;


