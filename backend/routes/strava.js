const express = require('express');
const router = express.Router();
const utils = require('../utils/re-authorize');
const polyUtil = require('polyline-encoded');
const filterActivities = require('../utils/filter-activities');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('', async function (req, res) {
  let token = await utils.fetchToken();
  let link = `?access_token=${token.access_token}`

  const activities_link = 'https://www.strava.com/api/v3/athlete/activities';

  try {

    let activities = await fetch(activities_link + link);
    activities = await activities.json();
    let infos = filterActivities(activities);

    res.status(200).json(
      {
        activities: infos.filter(it => it.type === 'Ride'),
      }
    );
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
});

router.get('/:page', async function (req, res) {
  const page = req.params.page;
  let link = ""
  let token = await utils.fetchToken();
  if(page === undefined || page === '') {
    link= `?access_token=${token.access_token}`
  } else {
    link = `?page=${page}&per_page=${60}&access_token=${token.access_token}`
  }

  const activities_link = 'https://www.strava.com/api/v3/athlete/activities';

  try {

    let activities = await fetch(activities_link + link);
    activities = await activities.json();
    let infos = filterActivities(activities);

    res.status(200).json(
      {
        token: token.access_token,
        activities: infos.filter(it => it.type === 'Ride'),
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

    let activeSegments = activity.segment_efforts.filter((it) => it.segment.starred === true);

    const activeSegmentsInfos = []
    for(let x in activeSegments) {
        const newObj = {}

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
            console.log("polyline ====> ", polyline);
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
