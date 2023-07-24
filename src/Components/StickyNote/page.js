import { useState } from "react";
import { LOCAL_API_PROXY, GLOBAL_API_PROXY } from "../../config.js";
import "./style.css";
import axios from "axios";

export default function StickyNote(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [color, setColor] = useState(props.color);

  function onEditPush(type, value) {
    axios.put(`${GLOBAL_API_PROXY}/updateNote`, {
      id: props.id,
      title: type === "title" ? value : title,
      content: type === "content" ? value : content,
      color: type === "color" ? value : color,
      userId: props.username,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        // console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleColorChange(e) {
    setColor(e.target.value);
    onEditPush("color", e.target.value);
  }

  return (
    <>
      <div className="note p-4 rounded-md" style={{ backgroundColor: `${color}` }}>
        <div className="w-100 flex flex-row justify-between mb-4">
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Note Title"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
              onEditPush("title", e.target.value);
            }}
          />
          <div
            className="cursor-pointer"
            onClick={(e) => {
              axios.delete(`${GLOBAL_API_PROXY}/deleteNote`, {
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  noteId: props.id,
                },
              })
                .then((response) => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <i class="fa-solid fa-trash" style={{ color: "#ff0000" }}></i>
          </div>
        </div>
        <textarea
          className="bg-transparent outline-none w-full overflow-hidden resize-none"
          placeholder="Note Content"
          rows={9}
          maxLength={250}
          defaultValue={content}
          onChange={(e) => {
            setContent(e.target.value);
            onEditPush("content", e.target.value);
          }}
        />
        <div className="mt-4 rounded-md">
          <select id="colorSelect" value={color} onChange={handleColorChange} className="rounded-xl">
            <option value="#ffcccc" style={{ background: "#ffcccc" }}></option>
            <option value="#ccffcc" style={{ background: "#ccffcc" }}></option>
            <option value="#ccccff" style={{ background: "#ccccff" }}></option>
          </select>
        </div>
      </div>
    </>
  );
}
