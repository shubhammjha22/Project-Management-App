import { useState } from 'react';

import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from './components/SelectedProject';


function App() {
  const [projectState,setProjectedsState] = useState({
    selectedProjectId:undefined,
    projects:[],
    tasks: [],
  })

  function handleAddTask(text){
    setProjectedsState((prev)=>{
      const taskId= Math.random();
      const newTask= { 
        text:text,
        projectId: prev.selectedProjectId, 
        id: taskId,
      };
      console.log(newTask);
      return{
        ...prev,
        tasks: [newTask,...prev.tasks],
      };
    })
  }

  function handleDeleteTask(id){
    setProjectedsState(prev=>{
      return {
        ...prev,
        tasks: prev.tasks.filter((task)=> task.id!==id )
        
      }
    })
  }

  function handleStartAddProject()
  {
    setProjectedsState(prev=>{
      return {
        ...prev,
        selectedProjectId:null,
        
      };
    });
  }

  function handleCancelAddProject()
  {
    setProjectedsState(prev=>{
      return {
        ...prev,
        selectedProjectId:undefined,
        
      };
    });
  }

  function handleAddProject(projectData){
    setProjectedsState((prev)=>{
      const projectId= Math.random();
      const newProject= { 
        ...projectData,
        id: projectId,
      };
      return{
        ...prev,
        selectedProjectId:undefined,
        projects:[...prev.projects,newProject]
      };
    });
  }

  function handleDeleteProject(){
    setProjectedsState(prev=>{
      return {
        ...prev,
        selectedProjectId:undefined,
        projects: prev.projects.filter((project)=> project.id!==prev.selectedProjectId ),
        
      };
    });
  }

  function handleSelectProject(id){
    setProjectedsState((prev)=>{
      return {
        ...prev,
        selectedProjectId:id,
        
      };
    });
  }
  const selectedProject=projectState.projects.find((project)=>project.id===projectState.selectedProjectId);

  let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks} selectedProjectId={projectState.selectedProjectId} />;
 
 
  if (projectState.selectedProjectId===null)
  {
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProjectId=== undefined){
    content = <NoProject onStartAddProject={handleStartAddProject} />
  }

  return (
   <main className="h-screen pt-8 flex gap-6">

    <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelect={handleSelectProject} selectedProjectId={projectState.selectedProjectId}  />
    {content}

   </main>
  );
}

export default App;
