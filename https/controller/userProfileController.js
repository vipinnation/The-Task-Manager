const task = require('../Models/tasks')


function userProfileController(){
    return{
        dashboard(req,res){
           

            const tasks = task.find({user:req.user._id},(err,data)=>{
                 
               if(data){
                return res.render('profile',{'record':data})
               }

               else{
                return res.render('profile',{'record':""})
               }
            });

            
            
            
            
        },

        addtask(req,res){

            const taskInput = req.body.task;

            const taskDetail = new task({
                user:req.user._id,
                task:taskInput
            });


            taskDetail.save().then((info)=>{
                console.log("Task Added")
                return res.redirect('/profile')
            }).catch(err=>{
                console.log("Something went wrong");
                return res.redirect('/profile')
            })
            
            
        },

        doneTask(req,res){
            const taskId = req.params.id; 
            console.log(taskId)

            const taskDel = task.findOneAndDelete({_id:taskId} , (err,data)=>{
                if(err) throw err;
                console.log(data)
                res.redirect('/profile');
            })
        }
    }
}


module.exports = userProfileController;