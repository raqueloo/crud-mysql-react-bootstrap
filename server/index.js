const express=require("express");
const mysql=require('mysql');
const cors=require('cors');

const app=express();


//const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});

//Petición de guardar

app.post("/create",(req, res)=>{
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anios=req.body.anios;
    console.log("ya llegue");
    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

});



app.get("/empleados",(req, res)=>{
    
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

});


app.put("/update",(req, res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anios=req.body.anios;
   
    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

});



app.delete("/delete/:id",(req, res)=>{
    const id=req.params.id;
   
   
    db.query('DELETE from empleados WHERE id=?', id,
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

});


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})

//app.listen(PORT, () => {
 //   console.log(`Servidor backend escuchando en el puerto ${PORT}`);
  //});
