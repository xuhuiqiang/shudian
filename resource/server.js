var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();

app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname,'index.html'))
});
app.get('/favicon.ico', function (req, res) {
    res('404');
});

app.use(express.static(path.resolve('..')));//设置静态文件存储目录
app.use(bodyParser.json());
var books=[{id:1,name:'java'},{id:2,name:'js'}];
//当用户访问/books路径，病情请求方式是get的时候
app.route('/books').get(function (req,res) {
res.send(books);
}).post(function (req,res) {
    var book=req.body;
    console.log(book);
    book.id=books[books.length-1].id+1;
    books.push(book);
    res.send(book);
});
app.listen(8080);