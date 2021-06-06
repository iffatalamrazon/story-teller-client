import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Event.css';
import { Link } from "react-router-dom";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const Event = (props) => {
  const {name,authorName,imageURL,_id,price} = props.event
    const classes = useStyles();
  const deleteEvent = (id) => {};
  const handelBuyBook = props.handleBook;

  return (
    <div className="container booksgrid col-md-4 mt-5">
      {/* <img style={{ height: "300px" }} src={event.imageURL}></img>
      <h3>{event.name}</h3>
      <h3>{event.authorName}</h3>
      <h3>{event.price}</h3>

      <button onClick={() => deleteEvent(event._id)}> Buy Now</button> */}

      <Card className={classes.root} >
        <CardActionArea>
          <CardMedia
           
          />
           <img style={{ height: "300px" }} src={imageURL}></img>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
            <h3>{name}</h3>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <h4>{authorName}</h4>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <h4 size="small" color="primary"> $ 
            {price}
              </h4>
          <Link to={`/checkout/${_id}`} > <button onClick={()=>handelBuyBook(props.event)} className="btn btn-primary  ml-auto">Buy</button> </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default Event;
