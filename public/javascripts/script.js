/**
 * Created by sparsh on 13/8/16.
 */

$(function () {
    $("#create_group").click(function () {
        vex.dialog.open({
            message: 'Enter the Group Name and Password:',
            input: [
                '<input name="groupName" type="text" placeholder="Group Name" required />',
                '<input name="groupPassword" type="password" placeholder="Password" required />'
            ].join(''),
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, {text: 'Create Group'}),
                $.extend({}, vex.dialog.buttons.NO, {text: 'Back'})
            ],
            callback: function (data) {
                if (!data) {
                    console.log('Cancelled')
                } else {
                    $.post('/create', {
                        groupName: data.groupName,
                        groupPassword: data.groupPassword
                    }).done(function (data) {
                        window.location.href = "/";
                    });
                }
            }
        });
    });

    $("#join_group").click(function () {
        vex.dialog.open({
            message: 'Enter the Group Name and Password:',
            input: [
                '<input name="groupName" type="text" placeholder="Group Name" required />',
                '<input name="groupPassword" type="password" placeholder="Password" required />'
            ].join(''),
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, {text: 'Join Group'}),
                $.extend({}, vex.dialog.buttons.NO, {text: 'Back'})
            ],
            callback: function (data) {
                if (!data) {
                    console.log('Cancelled')
                } else {
                    $.post('/join', {groupName: data.groupName, groupPassword: data.groupPassword});
                }
            }
        });
    });
});
