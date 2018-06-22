$(function() {
	const loginForm = $('#loginForm');
	loginForm.on('submit', function(event) {
		event.preventDefault();
		const user = {
			identifier : $(this).find('#username').val(),
			password : $(this).find('#password').val()
		}
		console.log(user);
		$.ajax({
			url: 'http://localhost:1337/auth/local',
			type: 'POST',
			data: user,
			success : function (res) {
				console.log("Success..!!")
				console.log(res);
			},
			error : function (err) {
				console.log(err)
			}	
		});
	});
});