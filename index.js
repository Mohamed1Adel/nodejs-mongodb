const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Article = require("./models/Article");

//mongodb+srv://<username>:<password>@cluster0.gwrvvsn.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect(
    "mongodb+srv://Mohamed:Sliman01556040246@cluster0.gwrvvsn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected are successfully");
  })
  .catch((error) => {
    console.log("Error with connecting with database", error);
  });

app.use(express.json());

// article endpoints

app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  // newArticle.title = "my first title article";
  // newArticle.body = "my first body article";
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numbersOfLikes = 100;
  await newArticle.save();

  res.json(newArticle);
});
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error", error);
    res.send("error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error", error);
    res.send("error");
  }
});

// regular end points before using database
app.get("/", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  res.send(`${numbers}`);
});

app.get("/findSummation/:num1/:num2", (req, res) => {
  console.log(req.params);
  const num1 = req.params.num1;
  const num2 = req.params.num2;
  const total = +num1 + +num2;
  res.send(`the total is ${total}`);
});

app.get("/findSummation2", (req, res) => {
  console.log(req.body);
  res.send(`hello ${req.body.name}`);
});

app.get("/sayAge", (req, res) => {
  // console.log(req.query);
  // res.send(`the age is : ${req.query.age}`);
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "arabic",
  });
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.put("/helloput", (req, res) => {
  res.send("helloput");
});

app.delete("/delete", (req, res) => {
  res.send("delete");
});

app.get("/hi", (req, res) => {
  res.send("hi");
});
app.get("/test", (req, res) => {
  res.send("test");
});

app.get("/numbers", (req, res) => {
  // res.sendFile(__dirname + "/views/numbers.html");

  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  res.render("numbers.ejs", {
    name: "Mohamed",
    numbers: numbers,
  });
});

app.listen(5000, () => {
  console.log("server is running");
});
