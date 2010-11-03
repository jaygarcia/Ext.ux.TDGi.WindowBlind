/*
    Author       : Jay Garcia
    Site         : http://tdg-i.com
    Contact Info : jgarcia@tdg-i.com
    Purpose      : Window Drawers for Ext 2.x Ext.Window class, which emulates OS X behaviors
    Warranty     : none
    Price        : free
    Version      : 1b1
    Date         : 11/23/2008

*/

Ext.onReady(function(){
    var blind = {
        ptype       : 'TDGi.WindowBlind',
        html        : 'Window blind plugin example',
        buttonAlign : 'center',
//        height      : 150, // optional
        buttons     : [
            {
                text    : 'hide',
                handler : function() {
                    //this translate to:
                    //this->fbar->blind
                    this.ownerCt.ownerCt.hide();
                }
            }
        ]
    };

    new Ext.Window({
        html    : 'test',
        width   : 400,
        height  : 300,
        plugins : [blind],
        buttons : [
            {
                text : 'Show Blind',
                // This handler runs within the scope of the Ext.Button instance
                handler : function() {

                    //this translate to:
                    //this->fbar->window.blind
                    this.ownerCt.ownerCt.blind.show();

                    //The blind plugin automatically sets itself as the window's "blind" property.
                }
            }
        ]
    }).show();



});