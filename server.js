var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var pub = __dirname + '/public';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.static(pub));
//app.use(app.router);



var PostProvider = require('./provider').PostProvider;
var PostProvider = new PostProvider();

//Blog index
app.get('/', function(req, res) {
    PostProvider.findAll(function(error, posts) {
        res.render('index', {
            locals: {
                title: 'Mongo Node.js Blog',
                posts: posts
            }
        });
    })
});

//new
app.get('/posts/new', function(req, res) {
    res.render('post_new', {
        locals: {
            title: 'New Post'
        }
    });
});

//create
app.post('/posts/new', function(req, res) {
    PostProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function(error, docs) {
        res.redirect('/');
    });
});

//show
app.get('/posts/:id', function(req, res) {
    PostProvider.findById(req.param('id'), function(error, post) {
        res.render('post_show', {
            locals: {
                title: post.title,
                post: post
            }
        });
    });
});

//edit
app.get('/posts/:id/edit', function(req, res) {
    PostProvider.findById(req.param('id'), function(error, post) {
        res.render('post_edit', {
            locals: {
                title: post.title,
                post: post
            }
        });
    });
});

//update
app.post('/posts/:id/edit', function(req, res) {
    PostProvider.updateById(req.param('id'), req.body, function(error, post) {
        res.redirect('/');
    });
});

//add comment
app.post('/posts/addComment', function(req, res) {
    PostProvider.addCommentToPost(req.body._id, {
        person: req.body.person,
        comment: req.body.comment,
        created_at: new Date()
    }, function(error, docs) {
        res.redirect('/posts/' + req.body._id)
    });
});

// Only listen on $ node app.js

if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d", 3000);
}
