const Task = require('../models/task.model')

const generateStatus = (apiStatus, data, message)=>{
    return {
        apiStatus,
        data,
        message        
    }
}

const addTask = async(req,res)=>{
    const newInserted = new Task(req.body)
    try{
        await newInserted.save()
        res.status(200).send({
            apiStatus:true,
            data: newInserted,
            message:"task added success"
        })   
    }
    catch(e){
     res.status(500).send({
         apiStatus:false,
         data:e.message,
         message: "task inserting problem"
     })
    }
}
const showAllTask = async(req, res)=>{
    try{
        myData = await Task.find()
        res.status(200).send({
            apiStatus:true,
            data: myData,
            message: "task fetched success"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message:"error loading task"
        })
    }
}

const showSingleTask = async(req,res)=>{
    const id = req.params.id
    try{
        result = await Task.findById(id)
        if(!result) return res.status(404).send({
            apiStatus: false,
            data:null,
            message: "tasks not found"
        })
        res.status(200).send({
            apiStatus: true,
            data: result,
            meesage: "task retrived"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.meesage,
            message:"error loading task"
        })
    }
}


const deleteTask = async(req,res)=>{
    try{
        id = req.params.id
        const task = await Task.findByIdAndDelete(id) // User.deleteOne({_id:id})
        if(!task) return res.status(400).send({
            apiStatus:false,
            data:null,
            message:"task not found"
        })
        res.status(200).send({
            apiStatus:true,
            data:data,
            message: "deleted"
        })
    }
    catch(e){
        res.status(500).send( generateStatus(false, e.message, "error in delete"))
    }
}

const editTask =async(req, res)=>{
    try{
        id = req.params.id
        allowed = ['name', 'email']
        requested = Object.keys(req.body)
        const task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        if(!task) return res.status(404).send({apiStatus:false, data:null, message:"task not found"})
        res.status(200).send({
            apiStatus:true,
            data:user,
            message:"updated"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message: "error in edit"
        })
    }
    

}







module.exports ={generateStatus, addTask,showSingleTask,showAllTask
  , deleteTask,editTask}