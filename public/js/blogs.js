$(function() {
    const getBlogsBtn = $('#getBlogsBtn');
    const postsContainer = $('#postsContainer');
    const addPost = $('#addPost');
    const mainSection = $('#mainSection');
    const postContainerForm = $('#postContainerForm');

    const postTemplate = "<div class='postSection mdc-card'>" +
                            "<div class='mdc-card__primary-action mdc-ripple-upgraded'>"+
                                "<div class='demo-card__primary' >"+
                                    "<h2 class='demo-card__title mdc-typography--headline6'>{{title}}</h2>"+
                                    "<h3 class='demo-card__subtitle mdc-typography--subtitle2'>by {{name}}</h3>"+
                                "</div>"+
                            "</div>"+
                            "<div class='demo-card__secondary mdc-typography--body2'>{{blogContent}}</div>" +
                            "</div>";


    function displayBlogs(post) {
        postsContainer.append(Mustache.render(postTemplate, post))
    }

    mainSection.delegate('button', 'click', function(event) {
        var displayedContent = $('#'+$(this).attr('data-type'));
        displayedContent.addClass('Display').removeClass('noDisplay');
        displayedContent.siblings('section').addClass('noDisplay').removeClass('Display');
    });     

    getBlogsBtn.on('click' , function (event) {
        event.preventDefault();
        postsContainer.html("");
        $.ajax({
            url: '/blogContent',
            type: 'GET',
            dataType: 'json',
            success : function (res) {
                console.log(res);
                res.forEach(function (post) {
                    displayBlogs(post);          
                });
            }
        });
    });

    postContainerForm.on('submit', function(event) {
        event.preventDefault();
        var post = {
            name : $(this).find('#name').val(),
            title : $(this).find('#title').val(),
            blogContent : $(this).find('#blogContent').val()
        };

        if (post.title === "" || post.name === "" || blogContent === "") {
            alert("Please Enter all the details");
        } else {        
            console.log(post);
            $.ajax({
                url: '/addPost',
                type: 'POST',
                data: post,
                success : function (res) {
                    console.log(res);
                    alert(res.msg);
                    window.location = res.redirectTo;
                }
            });
        }
        
    });
});