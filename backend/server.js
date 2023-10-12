
const express= require('express')
const uuid = require('uuid')
var mysql = require('mysql')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json());
const PORT=8000;



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsdb',
    port: 3306 // MySQL default port is 3306
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      console.log("Check DB connection")
      return;
    }
    console.log('Connected to MySQL database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  });

// Get all Notes
  app.get("/get-all-news",(req,res)=>{
    const sql="SELECT * FROM news"
    connection.query(sql,(error,results)=>{
        if(error){
            console.error('Error executing MySQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results)
    })
  })

//   Add a News
  app.post("/add-news",(req,res)=>{
    const newNews=req.body
    const sql="INSERT INTO news VALUES (?,?, ?,?,?,?)"
    connection.query(sql,[uuid.v4(),newNews.title,newNews.imgURL,newNews.author,newNews.description,newNews.type],(error,results)=>{
        if(error){
            console.error('Error executing MySQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results)
    })
  })



//   Update a News

  app.post("/update-news/:id", (req, res) => {
    const updatedNews = req.body;
    const newsId = req.params.id;
    
    const sql = "UPDATE news SET title = ?, imgURL = ?, description = ?,author = ?,type = ? WHERE id = ?";
    
    connection.query(sql, [updatedNews.title,updatedNews.imgURL,updatedNews.description,updatedNews.author,updatedNews.type,newsId], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results)
    });
});

// Delete a Note
app.delete("/delete-news/:id", (req, res) => {
    const newsId = req.params.id;
    console.log("hello");
    const sql = "DELETE FROM news WHERE id = ?";
    
    connection.query(sql, [newsId], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results)
    });
});