'use strict';

import angular from 'angular';

/**
 * The Util service is for thin, globally reusable, utility functions
 */
export function UtilService($window) {
  'ngInject';


  var COLORS = ['#FFCDD2', '#F44336', '#B71C1C', '#FF8A80',
    '#F8BBD0', '#E91E63', '#880E4F', '#FF80AB',
    '#E1BEE7', '#9C27B0', '#4A148C', '#EA80FC',
    '#D1C4E9', '#673AB7', '#311B92', '#B388FF',
    '#C5CAE9', '#3F51B5', '#1A237E', '#8C9EFF',
    '#BBDEFB', '#2196F3', '#0D47A1', '#82B1FF',
    '#B3E5FC', '#03A9F4', '#01579B', '#80D8FF',
    '#B2EBF2', '#00BCD4', '#006064', '#84FFFF',
    '#B2DFDB', '#009688', '#004D40', '#A7FFEB',
    '#C8E6C9', '#4CAF50', '#1B5E20', '#B9F6CA',
    '#DCEDC8', '#8BC34A', '#33691E', '#CCFF90',
    '#F0F4C3', '#CDDC39', '#827717', '#F4FF81',
    '#FFF9C4', '#FFEB3B', '#F57F17', '#FFFF8D',
    '#FFECB3', '#FFC107', '#FF6F00', '#FFE57F',
    '#FFE0B2', '#FF9800', '#E65100', '#FFD180',
    '#FFCCBC', '#FF5722', '#BF360C', '#FF9E80',
    '#D7CCC8', '#795548', '#3E2723',
    '#F5F5F5', '#9E9E9E', '#212121',
    '#CFD8DC', '#607D8B', '#263238',
  ];

  var Util = {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    safeCb(cb) {
      return angular.isFunction(cb) ? cb : angular.noop;
    },

    /**
     * Parse a given url with the use of an anchor element
     *
     * @param  {String} url - the url to parse
     * @return {Object}     - the parsed url, anchor element
     */
    urlParse(url) {
      var a = document.createElement('a');
      a.href = url;

      // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
      if (a.host === '') {
        a.href = a.href;
      }

      return a;
    },

    /**
     * Test whether or not a given url is same origin
     *
     * @param  {String}           url       - url to test
     * @param  {String|String[]}  [origins] - additional origins to test against
     * @return {Boolean}                    - true if url is same origin
     */
    isSameOrigin(url, origins) {
      url = Util.urlParse(url);
      origins = origins && [].concat(origins) || [];
      origins = origins.map(Util.urlParse);
      origins.push($window.location);
      origins = origins.filter(function(o) {
        let hostnameCheck = url.hostname === o.hostname;
        let protocolCheck = url.protocol === o.protocol;
        // 2nd part of the special treatment for IE fix (see above):
        // This part is when using well-known ports 80 or 443 with IE,
        // when $window.location.port==='' instead of the real port number.
        // Probably the same cause as this IE bug: https://goo.gl/J9hRta
        let portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port ===
          '443');
        return hostnameCheck && protocolCheck && portCheck;
      });
      return origins.length >= 1;
    },
    randomColor() {
      return this.COLORS[Math.floor(Math.random() * COLORS.length)];
    },
    randomColors(size) {
      var colors = COLORS.slice();
      var ans = new Array(size);
      for (var i = 0; i < ans.length; i++) {
        var color = colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
        console.log(color);
        ans[i] = color;
      }
      return ans;
    }
  };

  return Util;
}
