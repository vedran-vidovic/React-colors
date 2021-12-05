import React, { useEffect, useRef } from "react";
import isValidHex from "../color-validation";

const Form = ({ setColors }) => {
  const colorRef = useRef();

  //adding a new color to the array + validation of the color
  function addColor() {
    var color = colorRef.current.value;
    console.log(color);
    if (color === "" || !isValidHex(color)) {
      return alert("This color does not exist! Type a color hex that exists.");
    } else {
      setColors((prevcolors) => [...prevcolors, color]);
    }
    colorRef.current.value = null;
  }

  //useEffect hook for adding a new color on pressing enter
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        addColor();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <>
      <article>
        <form className="form">
          <div className="form-control">
            <h4>
              <label htmlFor="ColorHex">Enter hex:</label>
            </h4>
            <input ref={colorRef} type="text" id="hex" name="hex" />
          </div>
        </form>
      </article>
    </>
  );
};

export default Form;
