$(document).ready(function() {
    $.ajax({
        'type': 'POST',
        'url': '/',
        'data': {
            'text': ''
        },
        success: function(response) {
            if (response.type == 'question') {
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content}</div>`);
            } else {
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin' , `<div class="computer">ML model is occupied please wait.</div>`);
            }
        }
    });
})

$('#submit-form').on('submit', '', function(event) {
    event.preventDefault();
    let userText = $('.chat-input').val();
    document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="user">${userText}</div>`);
    $('.chat-input').val('');
    $.ajax({
        'type': 'POST',
        'url': '/',
        'data': {
            'text': userText
        },
        success: function(response) {
            if (response.type == 'question') {
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content}</div>`);
            } else {
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content.disease}</div>`);
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content.symptoms}</div>`);
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content.doctor}</div>`);
                document.querySelector('.chatbot').insertAdjacentHTML('afterBegin', `<div class="computer">${response.content.visit}</div>`);
            }
        }
    });
});