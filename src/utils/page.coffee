Page = {}

Page =
  APP.prototype.createText = function(info){

    var html = '';
    html = '<div id="">'

    html += '<div>';
    return html;
  };

  APP.prototype.getCmpsHtml = function(cmp){

    var _this = this;
    var html = '';

    if(_this['create'+cmp.cmpType]){

      html += _this['create'+cmp.cmpType]();

    }

    return html;
  };

  APP.prototype.getRenderHtml = function(page){

    var _this = this;
    var html = '';
    html = '<div class="page" style="background:'+page.bgcol+'">';

    for (var i = 0; i < page.cmps.length; i++) {
      html += _this.getCmpsHtml(page.cmps[i]);
    };

    html += '</div>';
    return html;
  };

  APP.prototype.renderItem = function() {

    var _this = this;

    var data = _this.data;
    var page = data.pages[0];
    var html = _this.getRenderHtml(page);

    _this.appid.html(html);

  };