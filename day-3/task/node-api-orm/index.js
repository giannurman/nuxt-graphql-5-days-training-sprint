require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

// const mdls = require('./src/models');
// const models = mdls.models;
// const sequelize = mdls.sequelize;

const app = express()
const port = process.env.PORT

// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`)
//   });
// });

// const eraseDatabaseOnSync = true;
// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//   if (eraseDatabaseOnSync) {
//     createUsers();
//   }
  
//   app.listen(port, () =>
//     console.log(`Example app listening on port ${port}!`),
//   );
// });

// const createUsers = async () => {
//   await models.User.create(
//     {
//       name: 'rwieruch',
//       email: 'jerry@example.com'
//     },
//   );

//   await models.User.create(
//     {
//       name: 'George',
//       email: 'george@example.com'
//     },
//   );
// };

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, Sequelize, and Postgres API' })
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
