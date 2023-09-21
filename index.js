const express =require ("express");
const app=express();

app.use (express.static("."));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/pagina.html");

});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/css/style.css");

});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/javascript/script.js");

});


app.listen(3000, () => {
    console.log("servidor en el puerto 3000",);
});