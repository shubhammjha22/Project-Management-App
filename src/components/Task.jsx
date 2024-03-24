import NewTask from "./NewTask";

export default function Task({tasks, onAdd,onDelete ,selectedProjectId})
{
    const tesks=tasks.filter(task=>task.projectId===selectedProjectId);
    
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Task</h2>
            <NewTask onAdd={onAdd} />
            { tasks.length===0 && <p className="text-stone-700 font-semibold my-4">
                This Project does not have any task yet. 
            </p> }

            {tesks.length >0  && <ul className="p-4 mt-8 rounded-mg bg-stone-100">
                {tesks.map((task)=> <li className="flex justify-between my-4" key={task.id}><span>{task.text}</span>
                <button onClick={()=>onDelete(task.id)} className="text-stone-700 hover:text-red-500" >Clear</button>
                </li>)}
                </ul>}
        </section>
    )
}