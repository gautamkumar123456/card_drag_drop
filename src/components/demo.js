import React, { useState, useEffect } from "react";
import Card from "./board_card/card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

// setUser(response.data))

const reorder = (list, startIndex, endIndex) => {
  const source_list = Array.from(list[startIndex.droppableId]['card_data']);
  const destination_list = Array.from(list[endIndex.droppableId]['card_data']);
  console.log(startIndex, endIndex, 'l')
  if (startIndex.droppableId === endIndex.droppableId && startIndex.index === endIndex.index) {
    return list;
  }
  if (startIndex.droppableId === endIndex.droppableId && startIndex.index !== endIndex.index) {
    const [my_card]=source_list.splice(startIndex.index, 1);
    source_list.splice(endIndex.index, 0, my_card);
    list[startIndex.droppableId]['card_data'] = source_list
    return list;
  }
  destination_list.splice(endIndex.index, 0, list[startIndex.droppableId]['card_data'][startIndex.index]);
  source_list.splice(startIndex.index, 1);
  list[startIndex.droppableId]['card_data'] = source_list
  list[endIndex.droppableId]['card_data'] = destination_list
  return list;
};


function DemoFirst() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnname, setColumn] = useState('');


  const postData = (e) => {
    console.log(e)
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/card_data/", {
      title,
      subtitle,
      description,
      columnname
    })
      .then(res =>
        console.log('Posting Data', res))
      .catch(err => console.log(err))
  }


  const fetchData = () => {

    axios.get("http://127.0.0.1:8000/")
      .then((response) => setItem(response.data));

  }

  const [items, setItem] = useState([])
  useEffect(() => {
    fetchData();
  }, []);
  const onDragEndFunction = (result) => {
    // console.log(result, 'result')
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(items, result.source, result.destination);
    setItem(reorderedItems);
  }


  return (
    <>

      <div className="container text-center">
        <div className="text-start">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Card
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={postData}>
                    <label>Title:
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>Sub Title:
                      <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    </label>
                    <label>Description:
                      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>Column ID:
                      <input type="text" value={columnname} onChange={(e) => setColumn(e.target.value)} />
                    </label>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-success">
          <DragDropContext onDragEnd={onDragEndFunction}>
            {
              Object.values(items).map((values, i) => {
                // console.log(values,i,'jj')
                return (
                  <Droppable droppableId={i.toString()} key={i}>
                    {(provided) => (
                      <div className="col-4" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                          values.card_data.map((data, index) => {
                            // console.log(data,'klkl',index)
                            return (
                              <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                                {(provided) => (
                                  <Card provided={provided} title={data.title} subtitle={data.subtitle} description={data.description} dataid={data.id} />
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )
              })
            }
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
export { DemoFirst };