/**
 * Created by sparsh on 15/8/16.
 */
/**
 * Created by sparsh on 13/8/16.
 */

$(function () {
    if ($("#create-poll").length > 0) {

        $("#create-poll").click(function () {
            vex.dialog.open({
                message: 'Enter the Poll Topic and the stipulated Time (days and hours):',
                input: [
                    '<input name="pollTopic" type="text" placeholder="Poll Topic" required />',
                    '<input name="hours" type="text" placeholder="Hours"  required />',
                    '<input name="days" type= "text" placeholder="Days" required />'
                ].join(''),
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {text: 'Push Poll'}),
                    $.extend({}, vex.dialog.buttons.NO, {text: 'Back'})
                ],
                callback: function (data) {
                    if (!data) {
                        console.log('Cancelled')
                    } else {
                        $.post('/poll', {
                            pollTopic: data.pollTopic,
                            timeHours: data.hours,
                            timeDays : data.days
                        }).done(function (data) {
                            console.log(data);
                            window.location.href = data.redirect;
                        });
                    }
                }
            });
        });
    }


    $(".list-item").click(function () {
        // Make a get request for the group page
        $.get('/group', {groupId: $(this).attr("data-groupId")}, function (data) {
            console.log(data);
            console.log(data.redirect);
            window.location.href = data.redirect;
        });
    });
});
