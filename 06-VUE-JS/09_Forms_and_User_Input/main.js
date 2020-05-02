var app = new Vue({
    el: '#app',
    data: {
        lesson: "Forms and User Input",
        // text: '',
        // checked: true,
        // city: ''
        comment: null,
        comments: [

        ],
        errors: null

    },
    methods: {
        onSubmit(evt){
            evt.preventDefault();
            
            
            if (this.comment){
                this.comments.push(this.comment)
                this.comment = null;
                this.errors = null;
            }else{
                this.errors = "The comment field can't be empty!";
            }
            
        }
    }
})