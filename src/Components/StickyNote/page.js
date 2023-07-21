import { useState } from "react";
import { LOCAL_API_PROXY, GLOBAL_API_PROXY } from "../../config.js";
import "./style.css";

export default function StickyNote(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [color, setColor] = useState(props.color);

  function onEditPush(type, value) {
    fetch(`${GLOBAL_API_PROXY}/updateNote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        title: type === "title" ? value : title,
        content: type === "content" ? value : content,
        color: type === "color" ? value : color,
        userId: props.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="note p-4" style={{ backgroundColor: `${color}` }}>
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
              fetch(`${GLOBAL_API_PROXY}/deleteNote`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  noteId: props.id,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            ❌
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
        <div className="w-full flex justify-end">
          <input
            type="color"
            defaultValue={color}
            onChange={(e) => {
              setColor(e.target.value);
              onEditPush("color", e.target.value);
            }}
            className="w-8 h-8 colorInput outline-none cursor-pointer bg-transparent"
          />
        </div>
      </div>
    </>
  );
}
