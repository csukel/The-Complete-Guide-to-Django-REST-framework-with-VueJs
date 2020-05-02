Vue.component("comment-list", {
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {
            new_comment: null,
            comment_author: null,
            errors: null
        }
    },
    template: `
        <div class="mt-2">
            <div class="container">
                <single-comment v-for="(comment,index) in comments"
                    :comment="comment"
                    :key="index">
                </single-comment>

                <hr>
                <h4 v-if="errors" style="color: red" v-if="errors">{{ errors }}</h4>

                <form class="mb-3">
                    <div class="form-group">
                        <label for="commentAuthor">Username</label>
                        <input class="form-control" id="commentAuthor" type="text" v-model="comment_author">
                    </div>
                    <div class="form-group">
                        <label for="newCommentArea">Comment</label>
                        <textarea class="form-control" id="newCommentArea"  rows="3" v-model="new_comment"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Publish</button>
                </form>            
            </div>
        

        </div>
    `,
    methods: {
        onSubmit() {
            if (!this.new_comment || !this.comment_author) {
                return this.errors = 'Author and comment are both mandatory fields!'
            }
            this.errors = null;

            let new_comment = {
                username: this.comment_author,
                content: this.new_comment
            }

            this.$emit('submit-comment',new_comment);
            this.new_comment = null;
            this.comment_author = null;

        }
    }

}
)

//single comment component
Vue.component('single-comment', {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="mb-2">
            <div class="card">
                <div class="card-header">
                    <p>Published by: {{ comment.username }}</p>
                </div>
                <div class="card-body">
                    <p>{{ comment.content }}</p>
                </div>
            </div>       
        </div>

    `
})

var app = new Vue({
    el: '#app',
    data: {
        lesson: 'Components and $Emit',
        comments: [
            {
                username: 'alice',
                content: 'first comment'
            },
            {
                username: 'bob',
                content: 'hello world'
            },
            {
                username: 'superman',
                content: 'My punch is stronger than yours...'
            },
            {
                username: 'robin',
                content: 'my suite rocks'
            },
        ]
    },
    methods: {
        addNewComment(new_comment){
            this.comments.push(new_comment);
        }
    }
})