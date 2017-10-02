
global.recipes = [
    {id: 1, name: "Rice", reviews: ['very nice','i love it','keep it up'], upvotes: 8},
    {id: 2, name: "Oats", reviews: ['very short','Interesting','keep it going'], upvotes: 8}, 
    {id: 3, name: "Porridge", reviews: ['very good','cool stuff'], upvotes: 8}, 
    {id: 4, name: "Beans", reviews: ['quite nice','i want it','keep the flag high'], upvotes: 8}];

const Route = (app) => {
    app.get('/api/v1/recipes', (req, res) => {
        return res.json({
            status: "error",
            message: global.recipes
        });
    });

    app.post('/api/v1/recipes', (req, res) => {
        if(!req.body.name){
            return res.json({
                status:"error",
                message: "user is missing"
            })
        }
        global.recipes.push(req.body);
        return res.json({
            status:"Success",
            message: "Posted successfully"
        });
      });

      app.get('/api/v1/recipes/:recipeid', (req,res)=>{
        for(let i=0; i<global.recipes.length; i++){
            if(global.recipes[i].id === parseInt(req.params.recipeid)){
                return res.json({
                    status:"Success",
                    recipe : global.recipes[i]
                });
            }
        }
            return res.status(404).json({
                status:"error",    
                message: "user not found"
                });
            
    });

    app.put("/api/v1/recipes/:recipeid",(req,res)=>{
        for(let i=0; i<global.recipes.length; i++){
            if(global.recipes[i].id === parseInt(req.params.recipeid,10)){
                global.recipes[i].name = req.body.name;
                return res.json({
                    status: "Successful",
                    message: "Updated successfully"
                    
                });
            }
        }
            return res.status(404).json({
                status: "error",    
                message: "user not found"
                    
                });
        
    });

    app.delete("/api/v1/recipes/:recipeid",(req,res)=>{
        for(let i=0; i<global.recipes.length; i++){
            if(global.recipes[i].id === parseInt(req.params.recipeid,10)){
                    global.recipes.splice(i,1);
                    return res.json({
                        status: "Success",
                        message: "Delete done"
                    });
            }
        }
            return res.status(404).json({
                status: "error",    
                message: "user not found"
                    
                });
        
    });

    app.post("/api/v1/recipes/:recipeid/reviews",(req,res)=>{
        for(let i=0; i<global.recipes.length; i++){
            if(global.recipes[i].id === parseInt(req.params.recipeid)){
                global.recipes[i].reviews.push(req.body.reviews);
                    return res.json({
                        status: "Success",
                        message: "Inserted successfully"
                    });
            }
        }
            return res.status(404).json({
                status: "error",    
                message: "user not found"
                });
        
    });
    }
    
export default Route;