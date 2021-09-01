const express=require('express');

const mongoose=require('mongoose');
const app=express();


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokemonapi",{useNewUrlParser:true},()=>{
    console.log("Mongodb connceted !!");
});

const apiSchema=new mongoose.Schema({
    name:String,
    species:String,
    type:String,
    imageUrl:String
});

const apiModel=new mongoose.model("pokemon_api",apiSchema);

app.get("/pokemon_api",async (req,res)=>{
    let apidata=await apiModel.find();
    res.send(apidata);
    console.log(apidata);
});


app.get("/pokemon_api/:id",async (req,res)=>{

    let id=req.params.id;
    let pokemonid=await apiModel.find({_id:id})
    res.send(pokemonid);

});

app.get("pokemon_api/type/:type",async (req,res)=>{
    let type=req.params.type;
    let pokemontype=await apiModel.find({type:type});
    res.send(pokemontype);
});


app.post("pokemon_api",(req,res)=>{

    let pokemon=req.body;

    let pokemonObj=new apiModel(pokemon);

    pokemonObj.save((err,data)=>{
        if(err===null){
            res.send({message:"Pokemon Created"});
        }
    });

});

app.listen(8000,()=>{
    console.log("Server is running !!");
});
