import DragAndDrop from "./Components/DragAndDrop";
import "./App.css";

const initialData = {
  "To Do": [
    "Create a professional resume",
    "Build a LinkedIn profile",
    "Research potential companies",
    "Identify required skills for the desired role",
    "Set up a GitHub portfolio",
  ],
  "In Progress": [
    "Apply to job openings",
    "Prepare for technical interviews",
    "Attend networking events",
    "Participate in coding challenges",
  ],
  Done: [
    "Complete online courses",
    "Update personal projects on GitHub",
    "Get certifications",
    "Receive interview calls",
  ],
  Hired: ["Sign job offer", "Onboard with the company"],
};

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Student Kanban Board
      </h1>
      <DragAndDrop initialState={initialData} />
    </div>
  );
}
