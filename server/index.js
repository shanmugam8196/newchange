const express=require('express');
const cors=require('cors');
const mycon=require('mysql');
const bodyparser=require('body-parser');
const fileupload=require('express-fileupload');

const app=express();

app.use(cors());
app.use(fileupload());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const c=mycon.createConnection({
    host:"sql12.freemysqlhosting.net",
    port:"3306",
    user:"sql12603380",
    password:"U8aZiPjIAk",
    database:"sql12603380"
})

c.connect(function(err){
    if(err){console.log(err)}
    else{console.log("Database connected")}
})


app.post('/add',(request,response)=>{
    let {firstname,lastname}=request.body;

    let sql='insert into stu(firstname,lastname) values(?,?);';

    c.query(sql,[firstname,lastname],(error,result)=>{
        if(error){
            let s={"status":"error"};
            response.send(s);
        }
        else{
            let s={"status":"success"};
            response.send(s);
        }
    })
})

// app.get('/Add',(request,response)=>{

    
//     let sql = 'select * from stu';

//     c.query(sql,(error,result)=>{
//         if(error){
//             let s = {"status":"error"};
//             response.send(s);
//         }
//         else{
//             let s = {"status":"success"};
//             response.send(s);
//         }
//     })

// })

app.listen(3336);