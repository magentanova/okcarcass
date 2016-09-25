let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Sketch = require('../db/schema.js').Sketch
let Contribution = require('../db/schema.js').Contribution

const buildRoutes = function(resourceName,Model) {
  apiRouter
    .get(`/${resourceName}`, function(req, res){
      Model.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  console.log(`/${resourceName}`)

  apiRouter
    .get(`/${resourceName}/:_id`, function(req, res){
      Model.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .post(`/${resourceName}`, function(req,res) {
      console.log('post request received')
      console.log(req.body)
      let newRecord = new Model(req.body)
      newRecord.save(function(err) {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        }
        else {  
          res.json(newRecord)
        }
      })
    })
    .put(`/${resourceName}/:_id`, function(req, res){

      Model.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send(`no record found with that id`)
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete(`/${resourceName}/:_id`, function(req, res){
      Model.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

}

buildRoutes('users',User)
buildRoutes('sketches',Sketch)
buildRoutes('contributions',Contribution)

module.exports = apiRouter