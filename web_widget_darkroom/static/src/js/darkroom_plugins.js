/* © 2016-TODAY LasLabs Inc.
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

odoo.define('web_widget_darkroom.darkroom_plugins', function(require){
  "use strict";
  
  var DarkroomPlugins = Object;
  DarkroomPlugins.extend = function(destination, source) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        destination[property] = source[property];
      }
    }
    return destination;
  };
  
  return DarkroomPlugins
  
});
