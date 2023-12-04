import axios from "axios";
import React, {  useRef, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./table.css";
const Table = ({data,setData,}) => {
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [imgs, setImgs] = useState(false);
  

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(null);
  const itemId = useRef();

  

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // delete start
  const handleDelete = (id) => {
    setIsOpen(true);
    itemId.current = id;
  };

  const notify = () => toast.success("Successfully Deleted");

  const deleteLogic = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${itemId.current}`)
      .then((res) => {
        console.log("delete", res.data);
        setData(data.filter((item) => item.id !== itemId.current));
      });
    setIsOpen(false);
    notify();
  };
  // delete end
  const EditHandle = (item) => {
    setEditIsOpen(true);
    setImg(item.image);
    setUserId(item.id);
    setCategory(item.category);
    setPrice(item.price);
    setTitle(item.title);
  };
  const UpdateData = () => {
    const item = { img, price, title, category };
    axios
      .put(`https://fakestoreapi.com/products/${userId}`, item)
      .then((res) => {
        console.log("update", res.data);
        setData((prevData) => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex((item) => item.id === userId);
          updatedData[index] = res.data;
          return updatedData;
        });
        setEditIsOpen(false);
      });
    setEditIsOpen(false);
  };
  const openmodal=(item)=>{
    setImgs(true);
    setImg(item)
  }

 
  return (
    <>
    
      <ToastContainer />
      <table border={2} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        {data.map((item, i) => {
          return (
            <tbody key={i}>
              <td>{item.id}</td>
              <td>
                <img src={item.image} alt="" width={70} onClick={()=> openmodal(item.image)}/>
              </td>
              <td className="ctd">{item.category}</td>
              <td className="description">{item.title}</td>
              <td>{item.price}</td>
              {/* <td>{item.rating.rate}</td> */}
              <td className="btn2">
                <button className="btn2" onClick={() => EditHandle(item)}>
                  <BiEditAlt className="btn2" />
                </button>
              </td>
              {/* Delete */}
              <td className="btn1">
                <button className="btn1" onClick={() => handleDelete(item.id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tbody>
          );
        })}
      </table>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <span className="spn">Are you sure you want to delete</span>
          <div className="btn_contier">
            <button className="btn3" onClick={deleteLogic}>
              Yes
            </button>
            <button className="btn4" onClick={() => setIsOpen(false)}>
              No
            </button>
          </div>
        </Modal>
      )}

      {EditIsOpen && (
        <Modal isOpen={EditIsOpen} style={customStyles}>
          <lable>Image</lable>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <br />
          <br />
          <lable>Title</lable>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
          <br />
          <br />
          <lable>Category</lable>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
          />
          <br />
          <br />
          <lable>Price</lable>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
          <br />
          <br />
          <div className="btn_contier">
            
            <button className="btn2" onClick={UpdateData}>
              Update
            </button>
            <button className="btn1" onClick={() => setEditIsOpen(false)}>
              Cancle
            </button>
          </div>
        </Modal>
      )}

      {imgs && <Modal isOpen={setImgs} style={customStyles}>

        <img src={img} alt="" width={250}/> 
        <button className="btn2" onClick={()=> setImgs(false)}>Cancle</button>
      </Modal>}
    </>
  );
};

export default Table;






