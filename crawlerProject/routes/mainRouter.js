let router = require('express').Router();
let http = require('https');
let cheerio = require('cheerio');
let html = '';
let set = [];

/**
 *@Time  2018/8/11 19:41
 *@Author  沐沐
 *@Description  异步加载网页函数
 *@return
 **/
async function loadHtml(url, selector, ...value) {
    await  http.get(url, (req) => {
        req.on('data', async (data) => {
            html += data;
            console.log(value[0])
        });
        req.on('end', () => {
            let $ = cheerio.load(html);
            let target = $(selector);
            for (let val of value) {
                switch (val) {
                    case 'text()':
                        for (let i = 0; i < target.length; i++) {
                            set.push($(target[i]).text());
                            console.log($(target[i]).text());
                        }
                        break;
                    case 'val()':
                        for (let i = 0; i < target.length; i++) {
                            set.push($(target[i]).val());
                            console.log($(target[i]).val());
                        }
                        break;
                    case 'html()':
                        for (let i = 0; i < target.length; i++) {
                            set.push($(target[i]).html());
                            console.log($(target[i]).html());
                        }
                        break;
                    default:
                        console.log('您的输入不合法!');
                }
            }
        })
    });
    if (html != null)
        return await Promise.resolve('网页爬取成功!');
    else
        return await Promise.reject('网页数据源为空!');
}

router.get('/', (req, res) => {
    res.render('index');
})
    .post('/crawling', (req,res)=> {
        let url = req.body.url;
        let selector = req.body.selector;
        let method = req.body.method;
        loadHtml(url, selector,method)
            .then((msg) => {
                console.log(msg);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .get('/ajax',(req,res)=>{
        console.log(set)
        res.send({data:set});
    })
    .get('/ddd',(req,res)=>{
        console.log(1212)
        res.render('otherRouter')
    })



module.exports = router;