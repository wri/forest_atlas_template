define(["declare","mparser","mainevents","mainconfig","mainui","hashcontroller","hash","ioquery","atlas/tools/Helper","dijit/form/TextBox","dijit/form/Button","dijit/form/CheckBox","dijit/layout/StackContainer","dijit/layout/ContentPane","dijit/layout/BorderContainer","dijit/TitlePane","dijit/form/SimpleTextarea","dijit/Dialog"],function(i,t,e,o,n,a,r,l,u){return i(null,{constructor:function(i){t.parse(),a.initialize(!0);var e,o=window.location.href,n="v=atlas&l="+i,d=o.split("#");if(2===d.length){var c=l.queryToObject(d[1]);c.init?(delete c.init,e=l.objectToQuery(c),n=e):(e=l.objectToQuery(c),n=e+"&init=y")}r(n),u.enableLayout()}})});