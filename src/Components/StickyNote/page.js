import { useState } from "react";
import "./style.css";

export default function StickyNote(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [color, setColor] = useState(props.color);
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
            }}
          />
          <div className="cursor-pointer">❌</div>
        </div>
        <textarea
          className="bg-transparent outline-none w-full overflow-hidden resize-none"
          placeholder="Note Content"
          rows={9}
          maxLength={250}
          defaultValue={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <div className="w-full flex justify-end">
          <input
            type="color"
            defaultValue={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="w-8 h-8 colorInput outline-none cursor-pointer bg-transparent"
          />
        </div>
      </div>
    </>
  );
}
