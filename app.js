const express = require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const router = require('./routes/stu');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DB;
mongoose.connect(DBURL,{useNewUrlParser: true,
useUnifiedTopology: true});

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// مكتبة تساعد في الطلب 
// مثل: استخدام "Put" في الاتش ام ال
const methodOverride =require('method-override');
/*||||||||||||||||||||||||||||||||||||||||||||||*/
app.use(methodOverride('_method',{methods: ['POST','GET']}));
//app.use();

// اعدادات السشن
app.use(session({
	 secret: 'sec', 
	 resave: true, 
	 saveUninitialized: false,
	 cookie: new Date(Date.now() + 60)
	}));

require('./model/auth')(passport); // نستخدم بارميتر للفنكشن passport
// دوال مهمة للباس بورت
app.use(passport.initialize());
app.use(passport.session());


// Pass 'req.user' as 'user' to ejs templates
// Just a custom middleware
app.use(function(req, res, next) {
	res.locals.user = req.user || null;
	// res.locals is an object available to ejs templates. for example: <%= user %>
	next();
  })
  
// التحويل
app.use('/', router);

app.listen(PORT,()=>console.log(`server lisening on port ${PORT}`));
