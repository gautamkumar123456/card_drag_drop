import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateCard(props) {

    const [id, setID] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [columnname, setColumn] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('id'));
        setTitle(localStorage.getItem('title'));
        setSubtitle(localStorage.getItem('subtitle'));
        setDescription(localStorage.getItem('description'));
        setColumn(localStorage.getItem('columnname'));
    }, []);

    const updateAPIData = async (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/card_data_rud/${id}/`, {
            title,
            subtitle,
            description,
            columnname
        })
            .then((response) => console.log('update', response.data))
            .catch((error) => console.log(error, 'error'))
    }
    return (
        <>
            <form className="row g-2">
                <div className="col-auto">
                    <label for="staticEmail2" >Title:</label>
                    <input type="text" className="form-control" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                </div>
                <div className="col-auto">
                    <label for="inputPassword2">SubTitle</label>
                    <input type="text" className="form-control" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                </div>
                <div className="col-auto">
                    <label for="inputPassword2">Description</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="col-auto">
                    <label for="inputPassword2">ColumnID</label>
                    <input type="text" className="form-control" value={columnname} onChange={(e) => setColumn(e.target.value)} />
                </div>
                <div className="col-auto">
                    <Link to="/">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Back</button><br/>
                    </Link>
                    <button type="submit" className="btn btn-primary" onClick={updateAPIData}>Update changes</button>
                </div>
            </form>
        </>
    );
}

export default UpdateCard;