var express = require("express");
var router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET posts */
router.get("/posts", function (req, res, next) {
  Post.find()
    .sort({ title: 1 })
    .populate("title")
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.send(list_posts);
    });
});

/* Get post */
router.get("/post/:id", function (req, res, next) {
  Post.findOne({ _id: req.params.id }).exec(function (err, post) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.send(post);
  });
});

/* POST post */
router.post("/post/create", function (req, res, next) {
  const post = new Post({
    title: req.query.title,
    content: req.query.content,
    date: new Date(),
  });
  post.save((err) => {
    if (err) {
      return next(err);
    } else res.send(`POST new blog post with id: ${post._id}`);
  });
});

/* Update post */
router.put("/post/:id/update", function (req, res, next) {
  //delete the post
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.query.title, content: req.query.content },
    function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Post Update");
      }
    }
  );
});

/* DELETE post */
router.delete("/post/:id/delete", function (req, res, next) {
  //delete the post
  Post.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      //delete all comments related to the post
      Comment.deleteMany({ postID: req.params.id }, function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send("Deleted post and all related comments");
        }
      });
    }
  });
});

/* GET post comments */
router.get("/post/:id/comments", function (req, res, next) {
  Comment.find({ postID: req.params.id })
    .sort({ title: 1 })
    .exec(function (err, list_comments) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.send(list_comments);
    });
});

/* POST comment */
router.post("/post/:id/comment/create", function (req, res, next) {
  const comment = new Comment({
    postID: req.params.id,
    author: req.query.author,
    content: req.query.content,
    date: new Date(),
  });
  comment.save((err) => {
    if (err) {
      return next(err);
    } else res.send(`POST new comment on post with id: ${req.params.id}`);
  });
});

/* Delete comment */
router.delete("/comment/:id/delete", function (req, res, next) {
  Comment.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Deleted comment");
    }
  });
});

module.exports = router;
