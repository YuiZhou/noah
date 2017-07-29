var images = require('./images.json');
images = resolveSrc(images);

function getImages(index) {
  index = index || 'all';
  if (index === 'all') {
    return images;
  }

  var select = [];
  for(var i = 0; i < images.length; i++) {
    if (images[i].category.indexOf(index) < 0) {continue;}
    select.push(images[i]);
  }
  return select;
}

function resolveSrc(images) {
  var result = [];
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.src = process.env.PUBLIC_URL + '/portfolio/' + image.src;
    image.thumb = process.env.PUBLIC_URL + '/portfolio/' + image.thumb;
    result.push(image);
  }

  return result;
}

var tags = require('./tags.json');

var DEFAULT_INDEX = 'all';

export default {
  DEFAULT_INDEX,
  getImages,
  tags,
};