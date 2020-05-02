var app = new Vue({
    el: '#app',
    data: {
        lesson: "Computed Properties",
        first_name: "John",
        last_name: "Doe"

    },
    computed: {
        getRandomComputed(){
            return Math.random();
        },
        fullName(){
            return this.first_name + " " + this.last_name;
        },
        reverseFullName(){
            var first = this.first_name.split('').reverse().join('');
            var last = this.last_name.split('').reverse().join('');
            return `${first} ${last}`;

        }
    },
    methods: {
        getRandomNumber(){
            return Math.random();
        }
    }
})

