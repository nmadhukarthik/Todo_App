import todoSchemaModel from "../Models/todoModel.js"

export const createTodo = async(req,res) => {
    const todo = new todoSchemaModel({
        title : req.body.title,
        date : req.body.date,
        completed : req.body.completed,
        user : req.user._id  //associate todo with logged in user
    })

    try {
        const newTodo = await todo.save()
        res.status(201).json({message: "Todo created successfully", newTodo})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Please provide correct information",error})
    }
}
    

export const getTodo = async(req,res) => {
    try {
        const todos = await todoSchemaModel.find({user : req.user._id}) // fetch todos of only logged in user
        res.status(200).json({message:"Todos fetched successfully",todos})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error occured while fetching todos",error})
    }
}


export const updateTodo = async(req,res) => {
    try {
        const todo = await todoSchemaModel.findByIdAndUpdate(req.params.id, req.body, {
            new : true
        })
        res.status(200).json({message:"Todos updated successfully",todo})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error occured while updating todos",error})
    }
}
    

export const deleteTodo = async(req,res) => {
    try {
        const todo = await todoSchemaModel.findByIdAndDelete(req.params.id)
        if(!todo)
        {res.status(404).json({message:"Todo not found"})}
        res.status(200).json({message:"Todo deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error occured while deleting todos",error})
    }
}
    
    