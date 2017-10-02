
global.recipes = [
    {id: 1, name: "Rice"}, {id: 2, name: "Rice"}, {id: 3, name: "Rice"}, {id: 4, name: "Beans"}];

const Route = (app) => {
    app.get('/api/v1/recipes', (req, res) => {
        return res.json({
            status: error,
            message: global.recipes,
            
        });
    });

    app.post('/api/v1/recipes', (req, res) => {
        if(!req.body.name){
            return res.json({
                message: "user is missing",
                error: true
            })
        }
        global.recipes.push(req.body);
        return res.json({
            message: "Success",
            error: false
        });
      });

      app.get('/api/v1/recipes/:recipeid', (req,res)=>{
        for(let i=0; i<global.recipes.length; i++){
            if(global.recipes[i].id === parseInt(req.params.recipeid)){
                return res.json({
                    recipe : global.recipes[i],
                    error: false
                });
            }
        }
            return res.status(404).json({
                    message: "user not found",
                    error: true
                });
            
    });
    }
    
export default Route;