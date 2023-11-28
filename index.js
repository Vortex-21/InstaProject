const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const {v4:uuidv4}=require('uuid');
const methodOverride=require('method-override');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

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
        content:"Live By the Creed!!!"
    }
];

//Show all posts route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//Add a Post route
app.post("/posts",(req,res)=>{
    console.log("body:",req.body);
    // res.render("index.ejs");
    let {username,imgUrl,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,imgUrl,content});
    res.redirect("/posts");
});

//newPost page
app.get("/posts/newPost",(req,res)=>{
    res.render("addPost.ejs");
});

//update a post Route
app.patch("/posts/:id",(req,res)=>{
    let {newImgUrl,newContent}=req.body;
    let {id}=req.params;
    console.log("id = ",id);
    let post=posts.find((p)=>{
        return p.id===id;
    });

    post.content=newContent;
    post.imgUrl=newImgUrl;
    res.redirect("/posts");
    // res.send("Patch request is working!");
});



//PostUpdate page
app.get("/posts/:id/postUpdate",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return p.id===id});
    res.render("postUpdate.ejs",{post});
});

// Remove a Post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>{
        return p.id!==id;
    });
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});