import User from "../models/User"
import bcrypt from "bcrypt"
import fetch from "node-fetch"
import e from "express"

export const getEdit = (req,res) => {
    return res.render("edit-profile",{pageTitle: "Edit Profile"})
}
export const postEdit = async(req,res) => {
    console.log("hi");
    const {
        session:{
            user:{_id,avatarUrl},
        },
        body:{name,email,username,location},
        file,
    }=req;
    
    //const id = req.session.user.id
    console.log(file)
    const updatedUser=await User.findByIdAndUpdate(_id,{
        avatarUrl:file?file.path :avatarUrl,
        name,
        email,
        username,
        location,
    },{
        new:true
    })
    req.session.user=updatedUser;
    res.redirect("/users/edit")}
export const remove = (req,res) =>{
    res.send("Edit User");
}
export const getlogin = (req,res)=>{
    res.render("login",{pageTitle:"login now"});
}

export const postlogin = async(req,res)=>{
    try{const{username,password}=req.body;
    const user = await User.findOne({username})
    //    const user = await User.findOne({username})
    if(!user){
        return res.status(400).render("login",{pageTitle:"An account with this username does not exists."});
    }
    console.log(user);
    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        res.status(400).render("login",{pageTitle:"login now"
        ,errorMessage:"Wrong password"});
    }else{
    req.session.loggedIn=true;
    req.session.user=user;
    return res.redirect('/');}
    }catch(err){
        console.log(err);
    }
}

export const getJoin = async(req,res)=>{
    res.render("join",{pageTitle:"create Account"});
}

export const postJoin = async(req,res)=>{
    const {name,username,email,password,password2,location}=req.body;
    const exits = await User.exists({$or: [{username},{email}]});

    if(exits){
        return res.status(400).render("join",{pageTitle:"usernameor email is already taken"});
    }
    if(password!=password2)
    {
        return res.status(400).render("join",{pageTitle:"pwd is not equail"});
    }

    await User.create({
        name,
        username,
        email,
        password,
        location,

    })
    return res.redirect("/login");

   
}
export const logout = (req,res)=>{
    req.session.destroy();
    req.flash("info","Bye Bye");
    return res.redirect("/");
}

export const see = async(req,res)=>{
    try{
    
    const {id} = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
          path: "owner",
          model: "User",
        },
      });
    if(!user){
    req.flash("error","no User");
    return res.status(400).render("404",{pageTitle:"User is not here"})
    
    }
   
    return res.render("profile",{
        pageTitle:user.name,user,
    })
}catch(err){
    console.log(err);
    
}
}

export const startGithubLogin = async(req,res)=>{
   
   
    const config={

        client_id:process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email"
    }

    const params = new URLSearchParams(config).toString();
    const finalUrl =`https://github.com/login/oauth/authorize?${params}`
    return res.redirect(finalUrl)
}

export const finishGithubLogin = async(req,res)=>{
    const config={
        clientId:process.env.GH_CLIENT,
        client_secret:process.env.GH_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalURL =`https://github.com/login/oauth/access_token?${params}`
    const tokenRequest = await(await fetch(finalURL,{
        method:"POST",
        headers:{
            Accept:"application/json",
        },
    })
    ).json();
    if("access_token" in tokenRequest){
    const {access_token}=tokenRequest;

    const apiUrl="https://api.github.com"

    const userData = await(await fetch(`${apiUrl}/user`,{
        headers:{
            Authorization:`token ${access_token}`,
        },

    })
    ).json();
    console.log(userData);
    const emailData =await(
        await fetch(`${apiUrl}/user/emails`,{
        headers:{
            Authorization:`token ${access_token}`,
        },

    })
    ).json();
    const emailObj = emailData.find(
        (email)=>email.primary === true && email.verified === true
    )
    if(!emailObj){
        return res.redirect("/login")
    }
    let user = await User.findOne({email: emailObj.email});
    if(!user){
         user = await User.create({
            avataUrl: userData.avatar_url,
            name:userData.name,
            username:userData.login,
            email:emailObj.email,
            passwrod:"",
            socialOnly:true,
            location:userData.location,

        });
    }
        req.session,loggedIn = true;
        req.session.user = user;
        return res.redirect("/");

}else{
    return res.redirect("/login");
}
}

export const getChangePawword=async(req,res)=>{
if(req.session.user.socialOnly===true){
    return res.redirect("/");
}
return res.render("change-password",{pagetitle:"change password"})

}

export const postChangePawword=async(req,res)=>{
    const {
        session:{
            user:{_id},
        },
        body:{oldpassword,newpassword,newpassword1},
    }=req;
    const user1 = await User.findOne({_id})
    const ok = await bcrypt.compare(oldpassword,user1.password);
    if(!ok){
        return res.status(400).render("change-password",{pagetitle:"change password",errorMessage:"the current password is incorrect"}) 
    }
    if(newpassword!=newpassword1){
        return res.status(400).render("change-password",{pagetitle:"change password",errorMessage:"password is not equl passwordconfirmation"})
    }
    const user = await User.findById(_id);
    user.password = newpassword;
    await user.save();
    req.session.user.password=user1.password
    return res.redirect("/")
}