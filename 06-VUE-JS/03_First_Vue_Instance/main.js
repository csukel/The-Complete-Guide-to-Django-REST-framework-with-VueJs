// Before you create app

var app = new Vue({
    el: "#app",
    data: {
        message: "Hello World!",
        value : 5,
        imgSrc: "https://cdn.pixabay.com/photo/2020/04/25/17/11/landscape-5091781_960_720.jpg",
        link: "https://google.com"
    },
    methods: {
        onSayHello : function(){
            alert('Hello Vue')
        }
    }
})
