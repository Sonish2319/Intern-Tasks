import DragAndDrop from "./Components/DragAndDrop";
import "./App.css";

const initialData = {
  "To Do": [
    "Design UI mockups",
    "Set up project repository",
    "Write unit tests",
    "Integrate payment gateway",
  ],
  "In Progress": ["Develop authentication flow", "Implement responsive design"],
  Done: [
    "Set up CI/CD pipeline",
    "Conduct code reviews",
    "Deploy initial version to staging",
  ],
};

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Drag and Drop Kanban Board
      </h1>
      <DragAndDrop initialState={initialData} />
    </div>
  );
}
