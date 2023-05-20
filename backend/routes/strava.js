const express = require('express');
const router = express.Router();
const utils = require('../utils/re-authorize');
const polyUtil = require('polyline-encoded');
const filterActivities = require('../utils/filter-activities');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('', async function (req, res) {
  let token = await utils.fetchToken();

  const activities_link = 'https://www.strava.com/api/v3/athlete/activities';

  const all_activities= []

  try {
    let pageNum = 1

    while(true) {
      let link = `?page=${pageNum}&per_page=${200}&access_token=${token.access_token}`
      let activities = await fetch(activities_link + link);
      activities = await activities.json();
      let infos = filterActivities(activities);

      if(infos.length == 0) {
        break
      }

      if(all_activities){
        all_activities.push(infos)
      } else {
        all_activities = infos
      }

        pageNum += 1
    }

    const rides = all_activities.flat(1).filter(it => it.type === 'Ride')


    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = (page * limit);

    const results = {};

    if(endIndex < rides.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if(startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if(isNaN(parseFloat(limit)) && isNaN(parseFloat(page))) {
      results.activities = rides
    } else {
      results.activities = rides.slice(startIndex, endIndex)
    }

    res.status(200).json(
      {
        activities: results,
      }
    );
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
});

router.get('/activity/:id', async function (req, res) {

  let token = await utils.fetchToken();
  const id = req.params.id;
  const activity_link = `https://www.strava.com/api/v3/activities/${id}?access_token=`;

  try {
    let activity = await fetch(activity_link + token.access_token);
    activity = await activity.json();
    let activeSegments;
    activeSegments = activity.segment_efforts.filter((it) => it.segment.starred === true);

    console.log("activeSegments", activeSegments)

    const activeSegmentsInfos = []
    for(let x in activeSegments) {
        const newObj = {}

        newObj['elevationData'] = Math.round(activeSegments[x]['segment']['elevation_high'] - activeSegments[x]['segment']['elevation_low'])
        newObj['name'] = activeSegments[x]['name']
        newObj['id'] = activeSegments[x]['segment']['id']
        newObj['watts'] = activeSegments[x]['average_watts']
        newObj['time'] = activeSegments[x]['moving_time']
        newObj['distance'] = activeSegments[x]['distance']
        newObj['speed'] = ((parseInt(activeSegments[x]['distance']) /1000) / (parseInt(activeSegments[x]['moving_time']) / 3600)).toFixed(2)
        activeSegmentsInfos.push(newObj);
    }


    const polylineString = activity.map.summary_polyline;
    const coords = polyUtil.decode(polylineString);

    const asyncRes = await Promise.all(activeSegmentsInfos.map(async (it) => {
      const segmentLink = `https://www.strava.com/api/v3/segments/${it.id}?access_token=`;

      try {
        let infosNext = await fetch(segmentLink + token.access_token);
        infosNext = await infosNext.json();
        Object.keys(infosNext).forEach((key) => {
          if (key === 'athlete_segment_stats') {
            it['effort_count'] = infosNext[key]['effort_count'];
            it['pr_elapsed_time'] = infosNext[key]['pr_elapsed_time'];
          }
          if (key === 'map') {
            let polyline = infosNext[key]['polyline'];
            let finalCoords = polyUtil.decode(polyline);
            it['coords'] = finalCoords
          }
        });

      }
      catch (err) {
        console.log(err);
      }
      return it;

    }));

    res.status(200).json(
      {
        token: token.access_token,
        activity: activity,
        coords: coords,
        activeSegments: asyncRes,
      }
    );
  }
  catch (err) {
    console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
  }
});

module.exports = router;
