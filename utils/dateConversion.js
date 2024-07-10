const currentDate = () => {
  let d = new Date();
  return d.toDateString();
};

const convertDateGiven = (dateGiven) => {
  let d = new Date(dateGiven);
  return d.toDateString();
};

module.exports = { currentDate, convertDateGiven }
