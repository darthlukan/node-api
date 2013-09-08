$(document).ready(function() {

    // routes.findAll()
    $.get('/stuff', function (data) {
        $('#aDiv').append('<h1>Inside findAll</h1><br/><h3>Now we take just one item from findAll</h3>')

        var id = data[0]._id.toString();

        // routes.findById()
        $.get('/stuff/' + id, function (data) {
            $('#aDiv').append('<p> findById gave us id: ' + data._id + '</p>');
            $('#aDiv').append('<p>'+ JSON.stringify(data, undefined, 2) + '</p>');
        });

        // routes.updateStuff()
        $.ajax({
            url: '/stuff/'+id,
            type: 'PUT',
            data: {
                "name": "To be deleted"
            },
            success: function (data) {
                $.get('/stuff/'+id, function (data) {
                    // This will display after the delete.  Welcome to the world of asynch code! :P
                    $('#aDiv').append('<p>After update:</p><p>' + JSON.stringify(data, undefined, 2) + '</p>');
                });
            }
        });

        // routes.delete()
        $.ajax({
            url: '/stuff/'+id,
            type: 'DELETE',
            success: function (data) {
                $('#aDiv').append('<p>Deleted object with id:' + id + '</p>');
            }
        });
    });
});
