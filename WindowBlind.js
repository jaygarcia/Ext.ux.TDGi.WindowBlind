/*
    Author       : Jay Garcia
    Site         : http://tdg-i.com
    Contact Info : jgarcia@tdg-i.com
    Purpose      : Window Blinds for Ext 3.x Ext.Window class, which emulates OS X behaviors
	Contributors : Mystix, http://extjs.com/forum/member.php?u=1459
    Warranty     : none
    License      : TBD,
    Price        : free
    Version      : 1.0
    Date         : 06/08/2010
*/
Ext.ns('Ext.plugins.TDGi');

// Drawer Base Class
Ext.plugins.TDGi.WindowBlind = Ext.extend(Ext.Panel, {
    frame        : true,
    draggable    : false,
    animate      : true,
    hidden       : true,
    animDuration : 1,
    offsetHeight : 10,
    offsetWidth  : 10,
    show : function(skipAnim) {
        if (this.hidden && this.fireEvent("beforeshow", this) !== false) {
            this.hidden = false;
            this.constructor.superclass.show.call(this);
            this.afterShow(!!skipAnim);
        }
    },

    hide : function(skipAnim) {
        if (this.hidden) {
            return;
        }

        if (this.animate === true && !skipAnim) {

            this.el.slideOut('t', {
                duration : this.animDuration,
                callback : this.onAfterAnimHide,
                scope    : this
            });
        } else {
            Ext.plugins.TDGi.WindowBlind.superclass.hide.call(this);
        }

        // REQUIRED!!!
        this.hidden = true;
    },

    // private
    init : function(parent) {
        this.win = parent;

        parent.blind = this;
        this.win.on({
            scope       : this,
            afterrender : this.onAfterParentRender,
            destroy     : this.destroy,
            resize      : this.onParentResize
        });
    },

    // private
    initComponent : function() {

        delete this.renderTo;

        Ext.plugins.TDGi.WindowBlind.superclass.initComponent.call(this);
        this.on({
			beforeshow : {
				scope : this,
				fn    : this.onBeforeShow
			},
			beforehide: {
				scope : this,
				fn    : this.onBeforeHide
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
        this.el.setVisible(false);
        var thisWin = this.win;
        thisWin.body.unmask();
        if (thisWin.fbar) {
            thisWin.fbar.el.unmask();
        }
        this.fireEvent('hide', this)
    },

    // private
    onBeforeShow : function() {
        var thisWin = this.win;
        thisWin.body.mask();
        if (thisWin.fbar) {
            thisWin.fbar.el.mask();
        }
        if (! this.rendered) {
            this.render(this.renderTo);
            delete this.renderTo;
        }
    },
    onAfterParentRender : function(win) {
        this.prntTitleHeight = win.el.child('.x-window-tl').getHeight();

        Ext.apply(this, {
            renderTo : win.el,
            style    : 'z-index: 2;position:absolute;top: ' + ( this.prntTitleHeight -2 ) +'px; left: 10px;',
            height   : win.body.getHeight() + (this.prntTitleHeight - this.offsetHeight)
        });

    },
    // private
    afterShow : function(skipAnim) {
        if (this.animate && !skipAnim) {
            this.el.slideIn('t', {
                scope    : this,
                easing   : 'easeOut',
                duration : this.animDuration
            });
        }
		else {

            Ext.plugins.TDGi.WindowBlind.superclass.afterShow.call(this);
        }
    },
    onParentResize : function(win, width, height) {
        var w = win.body.getWidth() - this.offsetWidth,
           h  = win.body.getHeight() + (this.prntTitleHeight - this.offsetHeight);

        this.setSize(w,h);
    }
});
