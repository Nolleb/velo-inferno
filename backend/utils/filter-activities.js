const filterActivities = (activities) => {
  const infos = [];
  for(let x in activities) {
      const newObj = {};
      newObj.id = activities[x].id;
      newObj.date = activities[x].start_date;
      newObj.time =  activities[x].moving_time;
      newObj.name =  activities[x].name;
      newObj.distance =  activities[x].distance;
      newObj.elevation =  activities[x].total_elevation_gain;
      newObj.type =  activities[x].type;

      infos.push(newObj);
  }
  return infos;
}

module.exports = filterActivities
