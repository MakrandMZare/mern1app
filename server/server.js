const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000




const db = mysql.createConnection({
    host: "root@localhost",
    user: "root",
    password: "",
    database: "metrore",
    port: 3306
});

app.post('/add', (req, res) => {
    sql = "INSERT INTO property_details ('name','location','details') VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.location,
        req.body.details
    ]
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'Somthing unexptected has occured' + err })
        return res.json({ success: "Property added successfully" })
    })
})

app.listen(port, () => {
    console.log('listening')
});
