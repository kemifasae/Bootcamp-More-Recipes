
global.recipes = [
    {id: 1, name: "Rice"}, {id: 2, name: "Rice"}, {id: 3, name: "Rice"}, {id: 4, name: "Beans"}];

const Route = (app) => {
    app.get('/api/v1/recipes', (req, res) => {
        return res.json({
            status: error,
            message: global.recipes,
            
        });
    });
}
    
export default Route;