var app = new Vue({
    el: '#app',
    data: {
        flag: true,
        lesson: "Class and Style Binding",
        styleObject: {
            backgroundColor: 'green',
            border: '5px solid orange'
        }

    },
    methods: {
        changeShape(){
            this.flag = !this.flag
        }
    }
})