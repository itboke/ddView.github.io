/*
 * @coder: 
 * @description: node-server
 * @params: 
 * @return: 
*/
const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 8091;

app.engine('.html', ejs.__express);
app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static('build'));

const router = express.Router();
router.get('*', (req, res) => {
  res.render('index.html');
});
app.use(router);

app.listen(port, () => {
  console.log('The Server is run in http://localhost:' + port);
});


