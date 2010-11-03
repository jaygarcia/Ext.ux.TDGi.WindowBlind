/*
    Author       : Jay Garcia
    Site         : http://tdg-i.com
    Contact Info : jgarcia@tdg-i.com
    Purpose      : Window Blinds for Ext 3.x Ext.Window class, which emulates OS X behavior.
    Warranty     : none
    License      : MIT,
    Price        : free
    Version      : 1.0
    Date         : 06/08/2010
*/
Ext.ns('Ext.plugins.TDGi');



 /**
 * @class Ext.plugins.TDGi.WindowBlind
 * @extends Ext.Panel
 * <p>Window Blinds for Ext 3.x Ext.Window class, which emulates OS X behavior.</p>
 * @constructor
 * @param {Object} config The config object
 * @xtype Ext.plugins.TDGi.WindowBlind
 */

Ext.plugins.TDGi.WindowBlind = Ext.extend(Ext.Panel, {
    frame        : true,
    draggable    : false,
    animate      : true,
    hidden       : true,
    /**
     * @cfg {Number} animDuration
     * Animation duration <strong>in  seconds</strong>.  1 = one second, .5 = 1/2 second.
     */
    animDuration : .55,
    offsetHeight : 10,
    offsetWidth  : 5,
    /**
     * @public
     * @param {Boolean} skipAnim true to skip animation
     */
    show : function(skipAnim) {
        var me = this;
        if (me.hidden && me.fireEvent("beforeshow", me) !== false) {
            me.hidden = false;
            me.constructor.superclass.show.call(me);
            me.afterShow(!!skipAnim);
        }
    },
    /**
     * Hide the Blind.
     * @public
     * @param {Boolean} skipAnim Set true to skip animation
     */
    hide : function(skipAnim) {
        var me = this;
        if (me.hidden) {
            return;
        }

        if (me.animate === true && !skipAnim) {

            me.el.slideOut('t', {
                duration : me.animDuration,
                callback : me.onAfterAnimHide,
                scope    : this
            });
        } else {
            Ext.plugins.TDGi.WindowBlind.superclass.hide.call(me);
        }

        // REQUIRED!!!
        me.hidden = true;
    },

    // private
    init : function(parent) {
        var me = this;
        me.win = parent;

        // Attach the me as the parent
        parent.blind = this;
        me.win.on({
            scope       : me,
            afterrender : me.onAfterParentRender,
            destroy     : me.destroy,
            resize      : me.onParentResize
        });
    },

    // private
    initComponent : function() {
        var me = this;
        delete me.renderTo;

        Ext.plugins.TDGi.WindowBlind.superclass.initComponent.call(me);
        me.on({
			beforeshow : {
				scope : me,
				fn    : me.onBeforeShow
			},
			beforehide: {
				scope : me,
				fn    : me.onBeforeHide
			}
		});
    },


	//private
	onBeforeHide : function() {
		if (this.animate) {
			this.getEl().addClass('x-panel-animated');
		}
	},
    /**
     * @private
     *
     */
	onAfterAnimHide : function() {
        var me = this;

        me.el.setVisible(false);
        var thisWin = me.win;
        thisWin.body.unmask();
        if (thisWin.fbar) {
            thisWin.fbar.el.unmask();
        }
        me.fireEvent('hide', me)
    },

    // private
    onBeforeShow : function() {

        var me      = this,
            thisWin = me.win;
        thisWin.body.mask();
        if (thisWin.fbar) {
            thisWin.fbar.el.mask();
        }
        if (! me.rendered) {
            me.render(me.renderTo);
            delete me.renderTo;
        }
    },

    //private
    onAfterParentRender : function(win) {
        var me = this;
        me.prntTitleHeight = win.el.child('.x-window-tl').getHeight();

        Ext.apply(me, {
            renderTo : win.el,
            style    : 'z-index: 2;position:absolute;top: ' + ( --me.prntTitleHeight ) +'px; left: 10px;',
            height   : win.body.getHeight() + (me.prntTitleHeight - me.offsetHeight)
        });

    },

    // private
    afterShow : function(skipAnim) {
        var me = this;

        if (me.animate && !skipAnim) {
            me.el.down('.x-panel-tl').hide();
            me.el.slideIn('t', {
                scope    : me,
                easing   : 'easeOut',
                duration : me.animDuration
            });
        }
		else {
            Ext.plugins.TDGi.WindowBlind.superclass.afterShow.call(me);
        }
    },
    // private
    onParentResize : function(win, width, height) {
        var me = this,
            w = win.body.getWidth() - me.offsetWidth,
            h = win.body.getHeight() + (me.prntTitleHeight - me.offsetHeight);

        me.setSize(w,h);
    }
});

Ext.preg('Ext.plugins.TDGi.WindowBlind', 'Ext.plugins.TDGi.WindowBlind');