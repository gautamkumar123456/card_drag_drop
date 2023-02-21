import UpdateCard from "./update_card";

function Card(props){
    return(
        <div className="card bg-info" style={{width: "18rem"}} ref={props.provided.innerRef} {...props.provided.draggableProps}{...props.provided.dragHandleProps}>
            <div className="card-body">
            <p>{props.dataid}</p>
            <h5 className="card-title">{props.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
            <p className="card-text">{props.description}</p>
            <button type="button" className="btn btn-primary" onClick={(e)=>UpdateCard(props)}>Update</button>
            
            </div>
        </div>
    );
}
export default Card;