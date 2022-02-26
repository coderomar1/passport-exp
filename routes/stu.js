const router = require('express').Router();
const stuContr = require('../controllers/stu');
const passport = require('passport');


router.get('/',stuContr.login);
router.post('/', passport.authenticate('local-login', {
	failureRedirect : '/',
	failureFlash : false // allow flash messages
}),(req, res)=>{
	res.redirect('/')
});
router.get('/logout',stuContr.logout);
router.get('/main',stuContr.main);
router.get('/create',stuContr.create);
router.post('/createSave',stuContr.createSave);
router.delete('/delete/:id',stuContr.delete);
router.get('/update/:id',stuContr.edit);
router.put('/updateSave/:id',stuContr.editSave);


module.exports = router;