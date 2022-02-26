const localStrategy = require('passport-local').Strategy;
const User = require('./stu');

// نسوي دالة عشان نستخدمها في اب جي اس 
module.exports = (passport)=>{

    // تسجيل الدخول
    passport.use('local-login', new localStrategy({
        usernameField: 'name',
        passwordField: 'password',
        passReqToCallback:true
    },(req,name,pass,done)=>{
        // نبحث هنا عن المستخدم
        User.findOne({name: name}).then((user)=>{
            // اذا كان موجود لا يوجد المستخدم 
            if(!user) return done(null,false);
            // نتحقق من كلمة المرور
            if(!user.validPassword(pass)) return done(null,false);

            return done(null,user)

        }).catch((err)=>done(err,false));
    }));
      // used to serialize the user for the session
      passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done)=>{
        User.findById(id,(err, user)=>{
            done(err, user);
        });
    });
};

