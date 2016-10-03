'use strict';
const angular = require('angular');

export class PieChartController {
  $log;
  constructor($log, Util) {
    'ngInject';
    // this.message = 'World';
    this.$log = $log;
    this.Util = Util;
    this.secectedPath;
    this.tip = {
      x: 100,
      y: 100,
      visible: true
    };
    this.vertical = true;
    $log.debug('PieChartController', this.text);
  }
  onSelectPath(ev, path) {
    this.secectedPath = path;
    this.tip.x = ev.layerX;
    this.tip.y = ev.layerY;
    this.$log.debug('onSelectPath', path.letter, ev);
  }

  onEnterPath(ev, path) {
    this.secectedPath = path;
    this.tip.x = ev.layerX;
    this.tip.y = ev.layerY;
    // this.$log.debug('onEnterPath',path.letter,ev.x,ev.layerY);
  }
  onLeavePath(ev, path) {
    this.secectedPath = null;
    this.tip.x = ev.layerX;
    this.tip.y = ev.layerY;
    // this.$log.debug('onEnterPath',path.letter);
  }
  onMoveInPath(ev) {
    this.tip.x = ev.layerX;
    this.tip.y = ev.layerY;

    // this.$log.debug('onEnterPath',ev.layerX,ev.layerY);
  }
  $onInit() {
    this.$log.debug('onInit', this.text, this.width, this.height, this.radius);
    let dataMap = this.calcData(this.text);
    this.width = this.width || 200;
    this.height = this.height || 200;
    this.radius = this.radius || Math.min(this.width, this.height) / 2;
    this.circle = this.createChart(this.width, this.height, this.radius, dataMap);
    this.$log.debug('circle', this.circle);
  }
  setSelected(path) {
    this.$log.debug('click', path);
    // this.secectedPath=this,circle.paths[index];
  }
  createChart(w, h, r, map) {
    let circle = {
      x: w / 2,
      y: h / 2,
      r: r,
      paths: []
    }
    let colors = this.Util.randomColors(map.size);
    let colorIndex = 0;
    let startangle = 0;

    map.forEach((part, letter) => {
      let endangle = startangle + part * Math.PI * 2,
        x1 = circle.x + circle.r * Math.sin(startangle),
        y1 = circle.y - circle.r * Math.cos(startangle),
        x2 = circle.x + circle.r * Math.sin(endangle),
        y2 = circle.y - circle.r * Math.cos(endangle);
      let big = (endangle - startangle > Math.PI) ? 1 : 0;
      // this.$log.debug('letter', letter, ' big', big);
      let d = "M " + circle.x + "," + circle.y + // На­ча­ло в цен­тре ок­руж­но­сти
        " L " + x1 + "," + y1 + // На­ри­со­вать ли­нию к точ­ке (x1,y1)
        " A " + circle.r + "," + circle.r + // На­ри­со­вать ду­гу с ра­диу­сом r
        " 0 " + big + " 1 " + // Ин­фор­ма­ция о ду­ге...
        x2 + "," + y2 + // Ду­га за­кан­чи­ва­ет­ся в точ­ке (x2,y2)
        " Z"; // За­кон­чить ри­со­ва­ние в точ­ке (cx,cy)
      let color = colors[colorIndex++];
      circle.paths.push({
        d: d,
        fill: color,
        stroke: '#FFF',
        letter: letter,
        part: part
      });
      startangle = endangle;
    });

    return circle;
  }
  calcData(text) {

    // console.log(text);
    let lowercase = text.toLowerCase().replace(/([^a-z])/g, '');
    let set = new Set();
    // console.log(lowercase);
    [...lowercase].forEach(c => set.add(c));
    //lowercase.forEach(l => set.add(l));
    // console.log('set',set.size);

    let map = new Map();
    let v = 'a';
    let part = lowercase.match(new RegExp(v, 'g')).length;

    // console.log('part',part);
    let sum = 0;
    set.forEach(v => {

      let count = lowercase.match(new RegExp(v, 'g')).length;
      let part = count / lowercase.length;
      sum += part;
      map.set(v, part);
      // console.log('part',v,count,lowercase.length,part);
    });
    // console.log('End',sum);
    return map;
  }
}

export default angular.module('angularRssApp.pieChart', [])
  .component('pieChart', {
    template: require('./pie.chart.component.html'),
    bindings: {
      message: '<',
      text: '<',
      width: '<',
      height: '<',
      radius: '<'
    },
    controller: PieChartController
  })
  .name;
