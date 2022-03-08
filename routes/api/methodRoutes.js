

app.get('/api/departments', (req, res) => {
    db.query('SELECT * FROM department', (err, table) => {

        res.json(table)
    })

})
