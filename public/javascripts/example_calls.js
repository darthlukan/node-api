$(document).ready(function() {

    // routes.findAll()
    $.get('/stuff', function (data) {
        $('#aDiv').append('<h1>Inside findAll</h1><br/><h3>Now we take just one item from findAll</h3>')

        var id = data[0]._id.toString();

        // routes.findById()
        $.get('/stuff/' + id, function (data) {
            $('#aDiv').append('<p> findById gave us id: ' + data._id + '</p>');
        });
    });
});
