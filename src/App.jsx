import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // ใช้ undefined เพราะให้รู้ว่า เรายังไม่ได้ทำอะไรกับ project
    projects: [],
    tasks:[]
  });

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    });
  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projectId: prevState.selectedProjectId,
        tasks: prevState.tasks
          .filter((task) => task.id !== id)
      }
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null // ใช้ null เพราะให้รู้ว่าเรากำลังจะสร้าง project ใหม่
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleAddProject(projectData) {
    console.log('hadleAddProject', projectData);
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        selectedProjectId: undefined, // เพื่อให้หลังจาก save แล้วปิดหน้าต่างให้ add new
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects
          .filter((p) => p.id !== prevState.selectedProjectId)
      }
    });
  }

  // console.log(projectsState);
  const objSelectedProject = projectsState.projects
    .find(p => p.id === projectsState.selectedProjectId);
  let content = <SelectedProject 
    project={objSelectedProject}
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}
      onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = < NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
