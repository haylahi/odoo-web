.. image:: https://img.shields.io/badge/license-AGPL--3-blue.svg
   :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
   :alt: License: AGPL-3

======================
Odoo DarkroomJS Widget
======================

This module provides a `DarkroomJS`_ web widget for use with images fields.

.. _DarkroomJS: https://github.com/MattKetmo/darkroomjs 

This widget will allow you to perform the following actions on images:

 * Zoom
 * Rotate
 * Crop
 * Step back in history client-side (before save)
 

Usage
=====

To use this module, you need to:

* Install web_widget_darkroom
* Add the to any One2many image relation by using the `darkroom` widget. Options can be passed through to Darkroom using the `options` key:

.. highlight:: html
<field name="image_id" widget="darkroom"
                       options="{'minWidth': 100}" />
.. highlight:: none

The Odoo DarkroomJS widget passes options directly through to Darkroom, which are copied from the source below:

.. highlight:: javascript
  // Default options
  defaults: {
    // Canvas properties (dimension, ratio, color)
    minWidth: null,
    minHeight: null,
    maxWidth: null,
    maxHeight: null,
    ratio: null,
    backgroundColor: '#fff',

    // Plugins options
    plugins: {},

    // Post-initialisation callback
    initialize: function() { /* noop */ }
  },
.. highlight:: none

An example implementation can be found [[https://repo.laslabs.com/projects/ODOO/repos/web/browse/web_widget_darkroom_example|in the LasLabs repo]] or [[https://github.com/laslabs/odoo-web/tree/release/9.0/web_widget_darkroom_example|on our GitHub mirror]].


.. _Example: https://repo.laslabs.com/projects/ODOO/repos/web/browse/web_widget_darkroom_example


Known Issues/Roadmap
====================

* Plugins are not able to be added without inheriting, then redefining the widget in the registry due to JS inheritance.
  ** This is not scalable because there would need to be an explicit dependency chain in order to avoid registry overwrite.


Credits
=======

Images
------

* LasLabs: `Icon <https://repo.laslabs.com/projects/TEM/repos/odoo-module_template/browse/module_name/static/description/icon.svg?raw>`_.

Contributors
------------

* Dave Lasley <dave@laslabs.com>

Maintainer
----------

.. image:: https://laslabs.com/logo.png
   :alt: LasLabs Inc.
   :target: https://laslabs.com

This module is maintained by LasLabs Inc.
