import { Link } from "react-router-dom";
import axios from "axios";

function Card(props) {

    const cardUpdate = (props) => {
        // e.preventDefault();
        console.log(props.dataid, 'jnj')
        // const {} = props;
        localStorage.setItem('id',props.dataid);
        localStorage.setItem('title', props.title);
        localStorage.setItem('subtitle', props.subtitle);
        localStorage.setItem('description', props.description);
        localStorage.setItem('columnname',props.columnname);
        axios.patch()
    }
    return (
        <div className="card bg-info" style={{ width: "18rem" }} ref={props.provided.innerRef} {...props.provided.draggableProps}{...props.provided.dragHandleProps}>
            <div className="card-body">
                <p>{props.dataid}</p>
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p className="card-text">{props.description}</p>
                <Link to='/update'>
                    <button type="button" className="btn btn-primary" onClick={() => cardUpdate(props)}>Update</button>
                </Link>
            </div>
        </div>
    );
}
export default Card;