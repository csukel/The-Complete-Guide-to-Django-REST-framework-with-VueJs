

Vue.component('todoList',{
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            new_todo : null
        }
    },
    template: `
        <div class="form-group">
            <input type='text' v-model="new_todo" class="form-control" @keyup.enter="onEnter" placeholder="What do you need to do?">
            <single-todo v-for="(todo,index) in todos" :todo="todo" :key="index" @remove="$emit('remove',index)"></single-todo>
            <p v-if="todos.length === 0">To add a new task, write something and press enter!</p>
        </div>
    `,
    methods: {
        onEnter(){
            if (this.new_todo){
                //add item to the todo list
                this.$emit('add-todo',this.new_todo)
                this.new_todo = null;
            }
        }
    }
})

Vue.component('single-todo', {
    props: {
        todo: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    },
    template: `
        
        <div class="mt-3 alert alert-success" role="alert">
            {{ todo }}
            <button type="button" class="close" @click="remove" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `,
    methods: {
        remove(){
            this.$emit('remove')
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        todoList: [

        ]
    },
    computed: {
        counter() {
            return this.todoList.length;
        }
    },
    methods: {
        addToDo(todo) {
            this.todoList.push(todo);
        },
        removeToDo(index) {
            this.todoList.splice(index, 1);
        }
    }
})