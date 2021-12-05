import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form from "./Form";

var but = false;

const Colors = () => {
  const [colors, setColors] = useState([]);

  //fetch the color
  const GetColors = async () => {
    const response = await fetch("https://www.colr.org/json/color/random", {
      cache: "reload",
    });
    const color = await response.json();
    but = true;
    //add into the array
    if (color.new_color === null) {
      alert("error");
      return;
    } else {
      setColors([...colors, color.new_color]);
    }
  };

  //Item reordering for drag and drop
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(colors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColors(items);
  }
  return (
    <>
      <h4>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="colors">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {colors.map((color, index) => {
                  return (
                    <Draggable
                      key={color}
                      draggableId={String(color)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className="item"
                            style={{ background: "#" + color }}
                          >
                            <h4>{color}</h4>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </h4>
      <button
        type="button"
        className="btn"
        style={{
          background: but ? "#" + colors[colors.length - 1] : "black",
        }}
        onClick={GetColors}
      >
        Get Color
      </button>
      <Form setColors={setColors} />
    </>
  );
};

export default Colors;
