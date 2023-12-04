const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const {v4:uuidv4}=require('uuid');
const methodOverride=require('method-override');
const mysql=require("mysql2");
const dotenv=require("dotenv");
dotenv.config();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

const connection=mysql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    user:process.env.USER
});
let posts=[
    {
        id:uuidv4(),
        username:"anshuman1",
        imgUrl:"/assets/cat.jpg",
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus molestiae ullam id mollitia, atque perspiciatis, similique laborum odio, consequatur tempore saepe quasi non pariatur aspernatur velit quos quas quis temporibusIllo sed ipsa doloribus reiciendis tempore deleniti cum inventore modi? Accusantium esse unde ipsam tenetur est repudiandae aliquid earum soluta cum aliquam. Dolorem dolorum ut nulla iste et dicta necessitatibus.Nesciunt quisquam voluptatibus molestias dolorum soluta maiores doloribus est voluptatum illum illo sunt, aut fugit ratione quibusdam rem labore ducimus modi facilis perspiciatis quasi quia ipsa! Accusantium placeat voluptatibus voluptatum?Ex corporis animi sint ullam voluptatum non voluptas. Incidunt at soluta veritatis! Nam maxime vel architecto id voluptates quaerat, ipsa eaque error recusandae adipisci quibusdam facere quos sed ipsum nulla!Culpa sed saepe distinctio blanditiis, soluta voluptas cumque. Molestias quidem corrupti quasi repudiandae adipisci quam provident quia, perspiciatis corporis, voluptates repellat maiores cupiditate! Vitae neque quidem suscipit eaque quia. Reprehenderit."
    },
    {
        id:uuidv4(),
        username:"sumitlaskar1",
        imgUrl:"/assets/ac.jpg",
        content:"Live By the Creed!!!Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus molestiae ullam id mollitia, atque perspiciatis, similique laborum odio, consequatur tempore saepe quasi non pariatur aspernatur velit quos quas quis temporibusIllo sed ipsa doloribus reiciendis tempore deleniti cum inventore modi? Accusantium esse unde ipsam tenetur est repudiandae aliquid earum soluta cum aliquam. Dolorem dolorum ut nulla iste et dicta necessitatibus.Nesciunt quisquam voluptatibus molestias dolorum soluta maiores doloribus est voluptatum illum illo sunt, aut fugit ratione quibusdam rem labore ducimus modi facilis perspiciatis quasi quia ipsa! Accusantium placeat voluptatibus voluptatum?Ex corporis animi sint ullam voluptatum non voluptas. Incidunt at soluta veritatis! Nam maxime vel architecto id voluptates quaerat, ipsa eaque error recusandae adipisci quibusdam facere quos sed ipsum nulla!Culpa sed saepe distinctio blanditiis, soluta voluptas cumque. Molestias quidem corrupti quasi repudiandae adipisci quam provident quia, perspiciatis corporis, voluptates repellat maiores cupiditate! Vitae neque quidem suscipit eaque quia. Reprehenderit."
    }
];

//Show all posts route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


//Add a Post route (iff user is registered and authenticated by password)
app.get("/posts/newPost",(req,res)=>{
    res.render("addPost.ejs");
});
app.post("/posts",(req,res)=>{
    console.log("body:",req.body);
    // res.render("index.ejs");
    let {username,imgUrl,content,password}=req.body;
    //Checking if user is registered or not
    let check= `select * from users where username='${username}';`;
    try{
        connection.query(check,(err,result)=>{
            if(err){
                throw err;
            }
            else{
                if(result.length===0){
                    res.redirect("/posts/signUp");
                }
                else if(result[0]["password"]!=password){
                    res.send("Wrong Password");
                }
                else{
                    let id=uuidv4();
                    posts.push({id,username,imgUrl,content});
                    res.redirect("/posts");
                }
            }
        });
    }
    catch(err){
        console.log("Check ERROR : ",err);
        res.send("Something went wrong!");
    }
    
    
});


//update a post Route
app.get("/posts/:id/postUpdate",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return p.id===id});
    res.render("postUpdate.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {newImgUrl,newContent,password}=req.body;
    let {id}=req.params;
    let post=posts.find((p)=>{
        return p.id===id;
    });

    
    let name=post.username;
    let find=`select password from users where username='${name}';`;
    try{
        connection.query(find,(err,result)=>{
            if(err){
                throw err;
            }
            else{
                if(result[0]["password"]===password){
                    post.content=newContent;
                    post.imgUrl=newImgUrl;
                    res.redirect("/posts");
                }
                else{
                    res.send("Wrong Password");
                }
            }
        });
    }
    catch(err){
        console.log("Find Error(edit post): ",err);
        res.send("Something went Wrong!");
    }

    
    // res.send("Patch request is working!");
});




// Remove a Post
app.get("/posts/:id/deletePost",(req,res)=>{
    let {id}=req.params;
    res.render("deletePost.ejs",{id});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let {password}=req.body;
    let post=posts.find((p)=>{
        return p.id===id;
    });
    let name=post.username;

    try{
        let q=`select password from users where username='${name}';`;
        connection.query(q,(err,result)=>{
            if(err){
                throw err;
            }
            else{
                if(password === result[0]["password"]){
                    posts=posts.filter((p)=>{
                        return p.id!==id;
                    });
                    res.redirect("/posts");
                }
                else{
                    res.send("Wrong Password");
                }
            }
        }); 
    }
    catch(err){
        console.log("ERROR in remove route: ",err);
        res.send("Something went Wrong!");
    }




    
});

//SignUp
app.get("/posts/signUp",(req,res)=>{
    res.render("signUp.ejs");
    // res.send("Working!");
});

app.post("/posts/signUp",(req,res)=>{
    let {username,password}=req.body;
    let q=`select * from users where username='${username}';`;
    try{
        connection.query(q,(err,result)=>{
            if(err){
                throw err;
            }
            else{
                // console.log(result);
                // res.send("Working Fine!");
                if(result.length!=0){
                    res.send("Username Unavailable");
                }
                else{
                    //Enter the data into the database.
                    let query="insert into users values ? ;";
                    let val=[[username,password]];
                    try{
                        connection.query(query,[val],(err,result)=>{
                            console.log("SignUp successful");
                            res.redirect("/posts");

                        });
                    }
                    catch(err){
                        console.log("Insert ERROR: ",err);
                        res.send("Something went wrong!");
                    }

                }
            }
        });
    }
    catch(err){
        console.log("Find ERROR : ",err);
        res.send("Something went Wrong :(");
    }
});

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});