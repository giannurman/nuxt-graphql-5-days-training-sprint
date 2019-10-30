require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const mdls = require('./src/models');
const models = mdls.models;
const sequelize = mdls.sequelize;

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, Sequelize, and Postgres API' })
})

app.get('/users', (request, response) => {
  response.json({info: 'GET:Users'})
})
app.get('/users/:id', (request, response) => {
  response.json({info: 'GET:Users/Id'})
})
app.post('/users', (request, response) => {
  response.json({info: 'POST:Users'})
})
app.put('/users/:id', (request, response) => {
  response.json({info: 'PUT:Users/Id'})
})
app.delete('/users/:id', (request, response) => {
  response.json({info: 'DELETE:Users/Id'})
})

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsers();
  }

  try {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`)
    })
  } catch (err) {
    console.log('app.listen', err)
  }
});

const createUsers = async () => {
  try {
    const user = await models.User.create(
      {
        name: 'rwieruch',
        email: 'jerry@example.com'
      },
    );
    console.log('success', user.toJSON())
  } catch (err) {
    console.log('error', err)
  }

  try {
    const user = await models.User.create(
      {
        name: 'George',
        email: 'george@example.com'
      },
    );
    console.log('success', user.toJSON())
  } catch (err) {
    console.log('error', err)
  }
};
