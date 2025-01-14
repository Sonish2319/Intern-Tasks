import { useRef, useState, useEffect } from "react";

export default function DragAndDrop({ initialState }) {
  const [data, setData] = useState(initialState);
  const dragItem = useRef();
  const dragContainer = useRef();
  const focusItem = useRef();
  const [focusedItem, setFocusedItem] = useState(null);

  // localStorage for initial load
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("kanbanData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("Loaded data from localStorage", parsedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error("Error loading from localStorage", error);
    }
  }, []);

  // Save data whenever data change
  useEffect(() => {
    try {
      if (data) {
        console.log("Saving data to localStorage", data);
        localStorage.setItem("kanbanData", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [data]);

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
    e.target.setAttribute("aria-grabbed", "true");
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    e.target.setAttribute("aria-grabbed", "false");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  const handleKeyDown = (e, item, container) => {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      
      const items = data[container];
      const currentIndex = items.indexOf(item);
      let newIndex = currentIndex;
      if (e.key === "ArrowDown" && currentIndex < items.length - 1) {
        newIndex = currentIndex + 1;
      }
      if (e.key === "ArrowUp" && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }
      setFocusedItem(items[newIndex]); 
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
      {Object.keys(data).map((container, index) => {
        return (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              width: 300,
              minHeight: 400,
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              outline: "none",
            }}
            tabIndex="0" 
            aria-label={`${container} column`}
          >
            <h2 style={{ textAlign: "center" }}>{container}</h2>
            {data[container].map((item, idx) => {
              const isFocused = focusedItem === item;

              return (
                <div
                  key={idx}
                  onDragStart={(e) => handleDragStart(e, item, container)}
                  onDragEnd={handleDragEnd}
                  draggable
                  onKeyDown={(e) => handleKeyDown(e, item, container)}
                  tabIndex="0" 
                  role="listitem"
                  aria-grabbed="false"
                  aria-labelledby={`${container}-${idx}`}
                  style={{
                    userSelect: "none",
                    padding: "16px",
                    margin: "8px 0",
                    backgroundColor: isFocused ? "#d3eaff" : "#fff", 
                    cursor: "move",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.2s",
                  }}
                >
                  <span id={`${container}-${idx}`}>{item}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
