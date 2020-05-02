Vue.component('comment',{
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="card">
            <div class="card-body">
                <p>{{ comment.username }}</p>
                <p>{{ comment.content }}</p>
            </div>
        </div>
    `
})

var app = new Vue({
    el : '#app',
    data: {
        lesson:'Components and Props',
        comments: [
            {
                username:'alice',
                content: 'first comment'
            },
            {
                username:'bob',
                content: 'hello world'
            },
            {
                username:'superman',
                content: 'My punch is stronger than yours...'
            },
            {
                username:'robin',
                content: 'my suite rocks'
            },
        ]
    }
})