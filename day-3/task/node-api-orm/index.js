require('dotenv').config()
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
  models.User.findAll().then(users => {
    response.status(200).json(users)
  })
})
app.get('/users/:id', (request, response) => {
  const id = parseInt(request.params.id)

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    response.status(200).json(user)
  })
})
app.post('/users', (request, response) => {
  const { name, email } = request.body

  models.User.create({
    name: name,
    email, email
  }).then(user => {
    response.status(201).json(user)
  })
})
app.put('/users/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  models.User.update({
    name: name,
    email: email
  }, {
    where: {
      id: id
    }
  }).then((ids) => {
    response.status(200).send(`User deleted with ID: ${ids}`)
  })
})
app.delete('/users/:id', (request, response) => {
  const id = parseInt(request.params.id)

  models.User.destroy({
    where: {
      id: id
    }
  }).then((id) => {
    response.status(200).send(`User deleted with ID: ${id}`)
  })
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
