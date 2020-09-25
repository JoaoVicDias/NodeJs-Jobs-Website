const express = require('express')
const router = express.Router()
const indexRouter = require('../controllers/index')
const companyRouter = require('../controllers/company')
const job = require('../controllers/job')



//Routes
router.get('/',indexRouter.getIndex)
router.get('/recruiter',companyRouter.getCompany)
router.get('/job/:id',job.getJob)
router.get('/jobs',job.getIndexJob)


router.post('/jobs/searchTitle',job.postTitleSearch)








module.exports = router