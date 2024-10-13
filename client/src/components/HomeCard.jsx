import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import {useDispatch} from "react-redux";
import { deletePostAction } from '../redux/actions/post.js';
import { toast } from "react-toastify";

const HomeCard = ({ post }) => {
  const dispatch = useDispatch()

  const deletePost = (id) => {
    dispatch(deletePostAction(id))
    //window.location.reload()
    toast("Silme İşlemi Başarılı", {
      position: "top-right",
      autoClose: 5000,
    });
    

  }
  const updatePost = (id) => {
    dispatch({type: "MODAL", payload: {open: true, updateId:id}})
  }
  return (
    <div className="relative w-1/3 border p-3 rounded bg-gray-50 m-2">
      <div className="font-bold text-xl">{post?.title}</div>
      <div className="text-gray-700 text-sm">{post?.description}</div>
      <div className="flex items-center justify-between mt-5">
        <span className="text-xs text-gray-500">{post?.user}</span>
        <span className="text-xs text-gray-500">
          {(post?.date)?.substring(0, 10)}
        </span>
      </div>
      <div className="absolute -top-3 -right-3 flex items-center space-x-3">
      <MdDeleteOutline onClick={() => deletePost(post._id)} size={22} className="bg-red-500 rounded-full text-white cursor-pointer"/>
      <RxUpdate onClick={() => updatePost(post._id)} size={22} className="bg-blue-500 rounded-full text-white cursor-pointer"/>
      </div>
    </div>
  );
};

export default HomeCard;
