const allReplace = function(content, replacement) {
  for (let target in replacement) {
    const replacer = replacement[target];
    content = content.split(target).join(replacer);
  }
  return content;
};

const formatDate = function(dateObject) {
  dateObject = new Date(dateObject);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const time = `Time: ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
  const date = `Date:  ${dateObject.getDate()}
  -${months[dateObject.getMonth()]}
  -${dateObject.getFullYear()}`;
  return `${date}______${time}`;
};

module.exports = {allReplace, formatDate};
