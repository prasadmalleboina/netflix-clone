import { useState } from "react";

export default function ToDo() {
    const [activity,setActivity] = useState("")
    const [description,setDesc] = useState("")
    //const [status,setStatus] = useState("")
    const [todos,setTodo] = useState([])


    
    
    const updateActivity = ()=>{
        e.preventDefault();
        setTodo([...todos,{activity,description}])

    }

    return(
    <div>
            <div>
                <p>Todo list</p>
                <form className=' bg-gray-300 h-[3vh] ' onSubmit={updateActivity}>
                    activity : <input 
                    type="text"
                    placeholder='enter activity'
                    value={activity}
                    onChange={(e)=>{
                        setActivity(e.target.value)
                    }}
                    /> 

                    description : <input type="text"
                     placeholder='enter Description'
                     value={description}
                    onChange={(e)=>{
                        setDesc(e.target.value)
                    }}
                    />
                    status<input type="chekbox"/>
                     <button type="submit" >Add Activity</button>
                </form>

                <div>
                    <table>
                         {todos.map((item)=>(
                            <div key={item.id}>
                                <tr>
                                    <td>{item.activity}</td>
                                </tr>
                                <tr>
                                    <td>{item.description}</td>
                                </tr>
                            </div>
                         ))}

                    </table>
                </div>
        </div>

    </div>
    );   
}