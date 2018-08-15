let router = require('express').Router();
router.get('/',(req,res,next)=>{
    res.send("我是路由测试页面")
})
module.exports = router;