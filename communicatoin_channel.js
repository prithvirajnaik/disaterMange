$(document).ready(function() {
    $('#submitMessage').click(function() {
        const message = $('#message').val().trim();

        if (message === '') {
            alert('Please enter a message.');
            return;
        }

    
        const allMessages = JSON.parse(localStorage.getItem('allMessages')) || [];

       
        allMessages.push(message);


        localStorage.setItem('allMessages', JSON.stringify(allMessages));

       alert("Message Sent Succesfully");
        window.location.href = './index.html';
    });
});




