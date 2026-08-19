const { prisma }= require('../utils/dbConnector');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.adminRegister= async (req,res)=>{
    const {name,role,email,pass} = req.body
    const hashPassword = await bcrypt.hash(pass,10)//10 salts of hashing
    try{
    const UserData  = await prisma.user.create({
        data:{
            name,
            email,
            role,
            pass:hashPassword
        }
    });
    res.status(201).send({message:'created admin',status:true,data:UserData})
    }catch(err){
       res.status(400).send({message:err,status:false})
       //console.log(err.message)
    }  
}
exports.adminLogin= async (req,res)=>{
    const {email,pass} = req.body;
    try{
      const validUser = await prisma.user.findFirst({where:{email:email,role:'admin'}});
      if(!validUser)return res.status(400).send({message:`User Doesn't exist`});
      const validPass =await bcrypt.compare(pass,validUser.pass);
      if(!validPass)return  res.status(400).send({message:`Wrong Password`});
      //we will generate token here and send it as response
      const token = jwt.sign(
        {id:validUser.id,email:email,role:'admin'},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:'6h'});
      res.status(200).send({message:`Login Successful`,token:token});
    }catch(err){ 
        res.status(400).send({message:err});

    }
}

exports.userRegister = async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        const hashPassword = await bcrypt.hash(pass, 10);

        const userData = await prisma.user.create({
            data: {
                name,
                email,
                pass: hashPassword,
                role: "user",
            },
        });

        res.status(201).send({
            status: true,
            message: "User Created",
            data: userData,
        });

    } catch (err) {

        console.log("USER REGISTER ERROR:", err);

        res.status(400).send({
            status: false,
            message: err.message,
        });
    }
};

exports.userLogin = async (req,res)=>{
    const {email,pass} = req.body;
    try {
        const validUser = await prisma.user.findFirst({where:{email:email,role:'user'}});
        if(!validUser) res.status(400).send({message:`User doesn't exist`})
        const validPass =  await bcrypt.compare(pass,validUser.pass);
        if (!validPass) res.status(400).send({message:`Wrong password`});     

        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '6h' });

        
        res.status(200).send({message:`Login Successfull`,token:token,status:true})
    } catch (error) {
        res.status(400).send({message:error})
    }

  
  res.status(201).send({status:true});
}

exports.adminChangePass = async (req, res) => {

    try {

        const adminId = req.user.id;
        const { newPass } = req.body;

        if (!newPass) {
            return res.status(400).json({
                status: false,
                message: "New password is required"
            });
        }

        const hashPassword = await bcrypt.hash(
            newPass,
            10
        );

        const updateData = await prisma.user.update({
            where: {
                id: adminId
            },
            data: {
                pass: hashPassword
            }
        });

        res.status(200).json({
            status: true,
            message: "Password changed successfully"
        });

    } catch (err) {

        console.log("Change Password Error:", err);

        res.status(500).json({
            status: false,
            message: err.message
        });

    }

};