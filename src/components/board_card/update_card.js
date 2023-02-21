import { useState } from "react";

function UpdateCard(props) {
    // const[title,setTitle] = useState(props.title);
    // const[subtitle,setSubtitle] = useState(props.subtitle);
    // const[description,setDescription] = useState(props.description);
    // const[columnname,setColumn] = useState(props.dataid);

    function updateData(){
        console.log('update')
    }
    console.log(props.title)
    return (
        <>
            <form onSubmit={updateData}>
                <label>Title:
                    <input type="text" value={props.title}  />
                </label>
                <label>Sub Title:
                    <input type="text" value={props.subtitle} />
                </label>
                <label>Description:
                    <input type="text" value={props.description} />
                </label>
                <label>Column ID:
                    <input type="text" value={props.columnname}  />
                </label>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Update Changes</button>
                </div>
            </form>
        </>
    );
}

export default UpdateCard;