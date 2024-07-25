const path = require('path');
const express = require("express");
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true}) //, useUnifiedTopology: true });
const bodyParser = require('body-parser');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();


//bodyParser required for post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//CRUD operations for mongoose: https://www.freecodecamp.org/news/mongodb-mongoose-node-tutorial/


//exercise tracker specific server activities
  //userSchema established
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    }
  })

  const User = mongoose.model('User', userSchema)

  //exerciseSchema established
  //made date required and duration not required since passing FCC tests
  const exerciseSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: false
    },
    date: {
      type: String,
      required: true
    }
  })

  const Exercise = mongoose.model("Exercise", exerciseSchema)

  //function that changes empty date to current date if provided
  function exerciseDate(submitDate){
    if(submitDate == undefined){
      const goodDateFrmt = new Date().toDateString();
      console.log(goodDateFrmt + ' is the alternate format')

      //testing how to convert good date format back to standard date format
      //const jsDateFrmt = new Date(goodDateFrmt).toISOString();
      //console.log(jsDateFrmt)

      return goodDateFrmt
    } else {
      const goodDateFrmt = new Date(submitDate.replace(/-/g, '/')).toDateString()
      console.log(goodDateFrmt + ' is the entered date')
      return goodDateFrmt;
    }
  }

  //create new user via form/submit
  app.post('/api/users', async function(req, res){
    const newUserName = req.body.username;
    const newUser = new User({
      username: newUserName
    })

    try {
      await newUser.save();
      //console.log('New user saved: ' + newUserName)
      res.json({
      username: newUser['username'],
      _id: newUser['_id']
      })
    } catch(error) {
      console.error(error)
      res.json({error: "Username taken"})
    }

    
  });

  //call user list via url bar or with axios/fetch within useEffect
  app.get('/api/users', async function(req, res){
    const userList = await User.find().select('-__v')
    res.json(userList)
  });

  //delete all user and exercise data
  /*
  app.get('/api/delete', async function(req, res){
    
    //holy crap this deletes all users be careful!
    const deleteUsers = await User.deleteMany()
    //holy crap this deletes all exercises be careful!
    const deleteList = await Exercise.deleteMany()
    const userList = await User.find().lean()
    res.json(userList)
  });
  */

  //throw an error if no id provided to add exercises post, causing below
  //path to be called
  /*
  app.get('/api/users/exercises', function(req, res){
    res.json({error: 'Please provide Id'})
  })
  */

  //function for identifying whether to use the form id field or id in url
  //may be unneccessary, delete when confirmed
  /*
  function goodId(formId, urlId){
    if(formId == undefined){
      return urlId
    } else {
      return formId
    }
  }
  */

  //function for paring down a users exercise log via from/to/limit queries
  function smallExLog(largeExLog, fromDay, toDay, limitInt){
    let newExLog = [];
    //console.log('largeExLog is: ' + largeExLog)
    /*console.log(
      'fromDay is: ' + fromDay + ' and toDay is: ' + toDay
      + ' and limitInt is ' + limitInt)*/
    

    for(let i = 0; i < largeExLog.length; i++){
      //new Date(goodDateFrmt).toISOString();
      
      if(newExLog.length >= limitInt && limitInt !== undefined){
        break
      }

      if(fromDay == undefined && toDay == undefined){
        newExLog.push(largeExLog[i])
      }else if(new Date(largeExLog[i]['date']).toISOString() >= fromDay && 
      new Date(largeExLog[i]['date']).toISOString() <= toDay){
        newExLog.push(largeExLog[i])
        /*console.log(
          new Date(largeExLog[i]['date']).toISOString()
          + ' is added to new exercise log'
        )*/

      } else {
        /*console.log(
          new Date(largeExLog[i]['date']).toISOString()
          + ' not added to new exercise log'
        )*/
      }
    }

    return newExLog;
  }

  //new after FCC tests - get exercise log via username field + submit button
  app.get('/api/users/exercises', async function(req, res){
    let userName = req.query.username;
    //console.log('username is: ' + userName)
    const exList = await Exercise.find({username: userName}).select({_id: 0, __v: 0})
    //console.log(exList)
    res.json(exList)
  });

  //create new exercise log entry via form/submit
  app.post('/api/users/exercises', async function(req, res){
    //const { _id } = req.params;
    
    //console.log(_id + ' is the word fed in through url bar')
    console.log('Heres- req.body[username]: ' + req.body['username']
      + ', req.body.date: ' + req.body.date
    )
    
      //const userId = req.body[':_id'];//_id; for some reason didnt like params version
      const exDesc = req.body.description;
      const exDur = req.body.duration;
      const usName = req.body.username;
      //const idUser = await User.find({_id: userId}).lean()
      const exDate = exerciseDate(req.body.date)
      


      const newExercise = new Exercise({
        username: usName, //[0]['username'],
        description: exDesc,
        duration: exDur,
        date: exDate
      })

      try {
        await newExercise.save();
        console.log('New exercise saved: ' + exDesc)
        res.json({
          //_id: idUser[0]['_id'],newExercise['_id']
          username: usName,//idUser[0]['username'],newExercise['username'],
          date: newExercise['date'],
          duration: newExercise['duration'],
          description: newExercise['description']
        })
      } catch(error) {
        console.error(error)
        res.json({error: "Please populate all required fields correctly"})
      }


    //}
  })

  //user log of all exercises performed GET function
  app.get('/api/users/:username/logs', async function(req, res){
    const { username } = req.params;
    
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limitNum = req.query.limit;

    //const userName = username//await User.find({_id: _id}).lean()

    const bigExLog = await Exercise
    .find({
      username: username//userName[0]['username']
    })
    .select({_id: 0, username: 0, __v: 0})
    .lean()

    /* example code for find
    YourModel.find({
      created_on: {
        $gte: start, // Greater than or equal to start date
        $lt: end,    // Less than end date (up to midnight of August 15)
      }
    })*/

    const goodExLog = smallExLog(bigExLog, fromDate, toDate, limitNum)

    res.json({
      //_id: _id,
      username: username,//userName[0]['username'],
      count: goodExLog.length,
      log: goodExLog
    })
  })

  
// TEST - Handle GET requests to /api route and correctly call env variables
app.get("/api", (req, res) => {
    //test at url: http://localhost:3001/api
    res.json({ message: "Hello from node.js server! " + process.env.MESSAGE_STYLE });
  });

//server listening on port xxxx confirmation
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});