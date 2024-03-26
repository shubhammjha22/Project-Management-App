import { useState } from 'react';

import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from './components/SelectedProject';


function App() {
  const [projectState,setProjectedsState] = useState({
    selectedProjectId:undefined,
    projects:[{
      title: 'Project Management Dashboard', description: ' A centralized dashboard for managing projects, tasks, and team collaboration.', dueDate: '2024-04-11', id: 0.8427817419065569
    },{
      title: 'Project 2 Bug Tracking System', description: 'An application to track and manage software bugs reported during development.', dueDate: '2024-05-09', id: 0.9316643512128271
    },{
      title: 'Project 3: Inventory Management System', description: ' A system for tracking and managing inventory in warehouses and stores.', dueDate: '2024-03-15', id: 0.6222035316388039
    }],
    tasks: [
      {text: 'Integrate User Authentication', projectId: 0.8427817419065569, id: 0.47115179423406217},{text: 'Implement Task Lists', projectId: 0.8427817419065569, id: 0.7467004950551459},{text: 'Create Dashboard Layout:', projectId: 0.8427817419065569, id: 0.44697872575989406},{text: 'Implement Notification System', projectId: 0.9316643512128271, id: 0.4467685586400114},{text: 'Develop Bug Tracking Database', projectId: 0.9316643512128271, id: 0.3149499395366173},{text: 'Design Bug Report Form', projectId: 0.9316643512128271, id: 0.4253125672716829},{text: 'Implement Reporting Features', projectId: 0.6222035316388039, id: 0.661472845981379},{text: 'Integrate Barcode Scanning', projectId: 0.6222035316388039, id: 0.6336398501903207},{text: 'Develop User Interface', projectId: 0.6222035316388039, id: 0.38756363675882444},{text: 'Design Database Schema', projectId: 0.6222035316388039, id: 0.5625057199176604}
    ],
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
