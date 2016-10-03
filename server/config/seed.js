/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
 import User from '../api/user/user.model';
 import Group from '../api/group/group.model';
 import Chanel from '../api/chanel/chanel.model';
 var debug = require('debug')('seed');

 Chanel.find({}).remove()
 .then(() => {
  Chanel.create([{

    feed: 'http://feeds.feedburner.com/AndroidPhoneFans',
    title: 'Phandroid',
    link: 'http://phandroid.com/',
    description: 'Android Phone News, Rumors, Reviews, Apps, Forums &amp; More!',
    image: ''
  },
  {
    feed: 'http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
    title: 'NYT &gt; World',
    link: 'http://www.nytimes.com/pages/world/index.html?partner=rss&amp;emc=rss',
    description: '',
    image: 'https://static01.nyt.com/images/misc/NYT_logo_rss_250x40.png'
  },
  {
    feed: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    title: 'BBC News - World',
    link: 'http://www.bbc.co.uk/news/',
    description: 'BBC News - World',
    image: 'http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif'
  },
  {
    feed: 'http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
    title: 'NYT &gt; World',
    link: 'http://www.nytimes.com/pages/world/index.html?partner=rss&amp;emc=rss',
    description: '',
    image: 'https://static01.nyt.com/images/misc/NYT_logo_rss_250x40.png'
  },
  {
    feed: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    title: 'BBC News - World',
    link: 'http://www.bbc.co.uk/news/',
    description: 'BBC News - World',
    image: 'http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif'
  },
  {
    feed: 'http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
    title: 'NYT &gt; World',
    link: 'http://www.nytimes.com/pages/world/index.html?partner=rss&amp;emc=rss',
    description: '',
    image: 'https://static01.nyt.com/images/misc/NYT_logo_rss_250x40.png'
  },
  {
    feed: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    title: 'BBC News - World',
    link: 'http://www.bbc.co.uk/news/',
    description: 'BBC News - World',
    image: 'http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif'
  }])
  .then(chanels=> {
    debug('populating chanels', chanels);
    createGroupse(chanels);
  });

});
 var createGroupse = function (chanels) {

  debug('createGroupse', chanels);
  var groups = [
  {
    name: 'news',
    chanels: chanels.slice(1)
  },
  {
    name: 'Technology',
    chanels: chanels.slice(0, 1)
  }];
  debug('createGroupse', groups);

  return Group.find({}).remove()
  .then(() => {
    return Group.create(groups)
    .then((g) => {
      debug('populating groups', g);
      createUsers(g);
    });
  });
};
var createUsers = function(groups) {
  debug('*', groups);
  return User.find({}).remove()
  .then(() => {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      groups: groups
    },
    {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }).then(users => {
      debug('populating users');
    });
  });
};
