/* © 2016-TODAY LasLabs Inc.
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

odoo.define('web_widget_darkroom.darkroom_widget', function(require){
  "use strict";
  
  var core = require('web.core');
  var common = require('web.form_common');
  var session = require('web.session');
  var utils = require('web.utils');
  
  var QWeb = core.qweb;
  var _t = core._t;
  
  var FieldDarkroomImage = common.AbstractField.extend(common.ReinitializeFieldMixin, {
    className: 'darkroom-widget',
    template: 'FieldDarkroomImage',
    darkroom: null,
    no_rerender: true,
    
    _init_darkroom_icons: function() {
      var element = document.createElement('div');
      element.id = 'darkroom-icons';
      element.style.height = 0;
      element.style.width = 0;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.innerHTML = '<!-- inject:svg --><!-- endinject -->';
      this.el.appendChild(element);
    },
    
    _init_darkroom_plugins: function(){
      require('web_widget_darkroom.darkroom_crop').DarkroomPluginCrop();
      require('web_widget_darkroom.darkroom_history').DarkroomPluginHistory();
      require('web_widget_darkroom.darkroom_rotate').DarkroomPluginRotate();
      require('web_widget_darkroom.darkroom_zoom').DarkroomPluginZoom();
    },

    _init_darkroom_ui: function() {

      this._init_darkroom_icons();
    
      Darkroom.UI = {
        Toolbar: Toolbar,
        ButtonGroup: ButtonGroup,
        Button: Button,
      };
      
      // Toolbar object.
      function Toolbar(element) {
        this.element = element;
      }
      
      Toolbar.prototype = {
        createButtonGroup: function(options) {
          var buttonGroup = document.createElement('div');
          buttonGroup.className = 'darkroom-button-group';
          this.element.appendChild(buttonGroup);
      
          return new ButtonGroup(buttonGroup);
        }
      };
      
      // ButtonGroup object.
      function ButtonGroup(element) {
        this.element = element;
      }
      
      ButtonGroup.prototype = {
        createButton: function(options) {
          var defaults = {
            image: 'help',
            type: 'default',
            group: 'default',
            hide: false,
            disabled: false
          };
      
          options = Darkroom.Utils.extend(options, defaults);
      
          var buttonElement = document.createElement('button');
          buttonElement.type = 'button';
          buttonElement.className = 'darkroom-button darkroom-button-' + options.type;
          buttonElement.innerHTML = '<i class="' + options.image + ' fa-2x"></i>'
          // buttonElement.innerHTML = '<svg class="darkroom-icon"><use xlink:href="#' + options.image + '" /></svg>';
          this.element.appendChild(buttonElement);
      
          var button = new Button(buttonElement);
          button.hide(options.hide);
          button.disable(options.disabled);
      
          return button;
        }
      }
      
      // Button object.
      function Button(element) {
        this.element = element;
      }
      
      Button.prototype = {
        addEventListener: function(eventName, listener) {
          if (this.element.addEventListener){
            this.element.addEventListener(eventName, listener);
          } else if (this.element.attachEvent) {
            this.element.attachEvent('on' + eventName, listener);
          }
        },
        removeEventListener: function(eventName, listener) {
          if (this.element.removeEventListener){
            this.element.removeEventListener(eventName, listener);
          }
        },
        active: function(value) {
          if (value)
            this.element.classList.add('darkroom-button-active');
          else
            this.element.classList.remove('darkroom-button-active');
        },
        hide: function(value) {
          if (value)
            this.element.classList.add('hidden');
          else
            this.element.classList.remove('hidden');
        },
        disable: function(value) {
          this.element.disabled = (value) ? true : false;
        }
      };
      
    },
    
    render_value: function() {
      
      this._init_darkroom_ui();
      this._init_darkroom_plugins();
      
      var url;
      if (this.get('value') && !utils.is_bin_size(this.get('value'))) {
        url = 'data:image/png;base64,' + this.get('value');
      } else if (this.get('value')) {
        var id = JSON.stringify(this.view.datarecord.id || null);
        var field = this.name;
        if (this.options.preview_image)
            field = this.options.preview_image;
        url = session.url('/web/image', {
          model: this.view.dataset.model,
          id: id,
          field: field,
          unique: (this.view.datarecord.__last_update || '').replace(/[^0-9]/g, ''),
        });
      } else {
        url = this.placeholder;
      }
      var $img = $(QWeb.render("FieldBinaryImage-img", { widget: this, url: url }));
      this.$el.find('> img').remove();
      this.$el.append($img);
      
      this.darkroom = new Darkroom($img.get(0));
    },
    
  });
  
  core.form_widget_registry.add("darkroom", FieldDarkroomImage);
  
  return {
    FieldDarkroomImage: FieldDarkroomImage,
  }
  
});
