
const express = require('express');
const app = express();
const port = 3000;

// ficheiros publicos
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

//saida de dados nesta porta 3000
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})