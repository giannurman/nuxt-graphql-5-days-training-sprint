import * as express from 'express'

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    router.get('/custom', (req, res) => {
      res.json({
        message: 'Hello Gian Nurman Lestari!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
