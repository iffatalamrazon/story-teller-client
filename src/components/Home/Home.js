import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { Spinner } from 'react-bootstrap';


 
 const Home = () => {

    const [events , setEvents] = useState([])
    useEffect(() => {
 
        fetch('https://desolate-garden-05488.herokuapp.com/event')
        .then(res => res.json())
        .then(data => setEvents(data))

    },[])
    const [cart,setCart]=useState([])
    const handleBook=(book)=>{
      console.log('Clicked',book)
      const newCard=[...cart,book];
      setCart(newCard)
      console.log(newCard)
    }
     return (
         
         <div className="container mt-5">
         
             <div className="d-flex justify-content-center">
             <p>
      <FormControl  type="text" placeholder="Search book" className="" />
       <Button variant="success">Search</Button>
   </p>
             </div>
             {/* <p><input className placeholder="search " type="text"></input><Button variant="dark">Dark</Button></p> */}
             <div className="row">
             
         
           {
                 events.length === 0 && <Spinner className="justify-content-center "  animation="border" variant="success" ></Spinner>
             }
         
             {
                 events.map(event => <Event handleBook={handleBook} event={event}></Event>)
             }
            
         </div>
         </div>
     );
 };
 
 export default Home;