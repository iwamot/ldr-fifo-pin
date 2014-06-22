// ==UserScript==
// @name         LDR - FIFO Pin
// @namespace    http://iwamot.com/
// @version      1.0.2
// @author       IWAMOTO Takashi <hello@iwamot.com> http://iwamot.com/
// @description  livedoor Readerのピンの挙動をLIFO（後入れ先出し）からFIFO（先入れ先出し）に変えます。
// @include      http://reader.livedoor.com/reader/*
// @homepage     https://github.com/iwamot/ldr-fifo-pin
// @updateURL    https://github.com/iwamot/ldr-fifo-pin/raw/master/ldr-fifo-pin.user.js
// ==/UserScript==

(function(){
  window.addEventListener('load', onLoad, false);

  function onLoad(){
    location.href = 'javascript:(' + function(){
      pin.add = function(url, title, info){
        if (this.has(url) || this.pins.length >= 100) return;
        this.hash[url] = true;
        var data = {title: title, url: url};
        if (info) data.icon = info.icon;
        this.pins.push(data);
        this.update_view();
        new Pinsaver().add(url, title);
      }
    }.toString() + ')()';
  }
})();
