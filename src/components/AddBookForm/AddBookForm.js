import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faBorderAll, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
// import { faEdit }from '@fortawesome/free-brands-svg-icons'
import { FaBeer, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddBook from "../AddBook/AddBook";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [change,setChange] = useState(false)

  useEffect(() => {
    fetch("https://desolate-garden-05488.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <div className="container d-flex mt-5 jumbotron">
      <div className="w-25 border border-primary mr-5 h-100">
        <Navbar>
          <Nav className="d-block">
            
            <Nav.Link onClick={()=>setChange(!change)}>Manage Admin</Nav.Link>
            <Nav.Link onClick={()=>setChange(!change)}>Add Book</Nav.Link>
            <Nav.Link> Edit</Nav.Link>
          </Nav>
        </Navbar>
      </div>
     {
         change? <div className="w-75 border border-secondary">
         <AddBook></AddBook>
       </div>
       :  <div className="w-75 border border-secondary jumbotron">
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
           {books.map((book) => (
             <tr>
               <td>{book.name}</td>
               <td>{book.author}</td>
               <td>{book.price}</td>
               <td>
                 <FaEdit /> <MdDelete />
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
     }
     

      {/* <FontAwesomeIcon icon={faBorderAll} color="green" />  */}
    </div>
  );
};

export default Admin;
