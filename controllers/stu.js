const Stu = require('../model/stu');
const bcrypt = require('bcrypt');

module.exports =({
    login:(req, res)=> {
        if (req.user) {
            res.redirect('/main')
        } else {
            res.render('index.ejs')
        }
    },
    main:(req,res)=>{
        if(req.user){
            Stu.find({}, (error,stu)=>{
                if(error)console.log(`there is an err: ${error}`);
                else res.render('main.ejs',{stuinfo: stu});
            })
        }else {
            res.redirect('/')
        }
       
    },
    create:(req,res)=>{
         res.render('create.ejs');
    },
    createSave: async (req,res)=>{
        const hashPass = await bcrypt.hash(req.body.password,10);
        const firstTask = new Stu({name: req.body.name,email:req.body.email ,password: hashPass });
        firstTask.save().then(()=>res.redirect("/"));
    },
    delete:(req,res)=>{
        Stu.deleteOne({_id: req.params.id},(error)=>{
            if(error){
                console.log(`there is an error: ${error}`)
            }else res.redirect("/main");
        });
    },
    edit:(req,res)=>{
        const id = req.params.id;
        Stu.find({},(err,stu)=>{
        res.render('edit.ejs',{stuinfo: stu,stuid: id});
        })
    },
    editSave: async (req,res)=>{
        const id = req.params.id;
        const hashPass = await bcrypt.hash(req.body.password,10);
        Stu.findByIdAndUpdate(id,{name: req.body.name, email: req.body.email,password: hashPass},err=>{
            if(err){console.log(err)}
            else res.redirect("/main");
        })
       
    },
    logout:(req, res)=>{
        req.logout();
        res.redirect('/');
    }
});