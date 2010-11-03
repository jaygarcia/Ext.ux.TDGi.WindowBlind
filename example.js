/*
    Author       : Jay Garcia
    Site         : http://tdg-i.com
    Contact Info : jgarcia@tdg-i.com
    Purpose      : Window Blind for Ext 2.x Ext.Window class, which emulates OS X behaviors
    Warranty     : none
    Price        : free
    Version      : 1b1
    Date         : 11/23/2008

*/

Ext.onReady(function(){
    var blind = new Ext.plugins.TDGi.WindowBlind({
        border : false,
        items  : {
            xtype       : 'form',
            defaultType : 'textfield',
            labelWidth  : 60,
            defaults    : {
                anchor : '100%'
            },
            items       : [
                {
                    fieldLabel : 'First Name'
                },
                {
                    fieldLabel : 'Last  Name'
                },
                {
                    fieldLabel : 'Phone'
                },
                {
                    fieldLabel : 'Email'
                }
            ]
        },
        buttons : [
            {
                text    : 'OK',
                handler : function() {
                    this.ownerCt.ownerCt.hide();
                }
            }
        ]
    });

    new Ext.Window({
        height   : 200,
        width    : 300,
        closable : false,
        title    : 'Window Blind test',
        html     : 'This is a blind test',
        plugins  : [
            blind
        ],
        buttons  :  [
            {
                text    : 'Show blind',
                handler : function(btn) {
                    blind.show()
                }
            }
        ]
    }).show();
});