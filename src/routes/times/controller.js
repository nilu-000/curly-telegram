const express = require('express');
const router = express.Router();
const {timesValidate} = require('../../libs/joi.js');
const PrayerTimes = require('../../libs/prayerTimes');
const auth = require('../../middleware/auth');


router.get('/times', auth, (req, res) => {
    try{
        let prayer = new PrayerTimes();
        const {lat, long, timezone} = req.query;
        if (!(lat && long && timezone))
            throw new Error('no required parameters');
        
        // joi validation
        let {error} = timesValidate(req.params);
        if (error)
            throw new Error(error.details[0].message);
        
        const times = prayer.getTimes(new Date(), [lat, long], utc);
        res.status(200).send(times);
    }
    catch(error){
        res.status(400).send({
            ok: false,
            message: error + ""
        });
    }    
});


module.exports = router;