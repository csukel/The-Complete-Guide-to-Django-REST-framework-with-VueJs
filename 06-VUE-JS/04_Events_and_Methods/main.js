var app = new Vue({
    el : '#app',
    data: {
        lesson: "Events and Methods",
        counter: 0
    },
    methods: {
        onIncrement(){
            this.counter++
        },
        onDecrement(){
            this.counter--
        },
        overTheBox(){
            console.log('Over the green box');
        }
    }
})