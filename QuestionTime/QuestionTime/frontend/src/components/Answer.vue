<template>
    <div>
        <div class="single-answer container">
            <div class="row">
                <div class="col-10">
                    <p class="text-muted">
                        <strong>{{ answer.author }} &#8901; {{ answer.created_at }}</strong>
                    </p>
                    <p v-show="!edit">{{answer.body}}</p>
                    <textarea
                        v-show="isAuthor && edit"
                        class="form-control"
                        v-model="answer.body"
                        rows="3"
                    ></textarea>
                    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
                </div>
                <div class="col-2 button-container">
                    <div class="row justify-content-around">
                        <div v-show="isAuthor">
                            <button
                                v-show="!edit"
                                class="btn btn-outline-info"
                                @click="edit = true"
                            >
                                <i class="fa fa-edit"></i>
                                Edit
                            </button>
                            <button
                                v-show="edit"
                                class="btn btn-outline-info mr-3"
                                @click="onUpdateAnswer"
                            >
                                <i class="fa fa-save"></i>
                                Save
                            </button>
                            <button
                                v-show="edit"
                                class="btn btn-outline-dark"
                                @click="onCancel"
                            >Cancel</button>
                        </div>
                        <div>
                            <button
                                class="btn btn-outline-danger"
                                v-show="isAuthor && !edit"
                                @click="deleteAnswer"
                            >
                                <i class="fa fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>

 
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
export default {
    name: "AnswerComponent",
    props: {
        answer: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showModal: true,
            isAuthor: false,
            edit: false,
            originalValue: null,
            error: null
        };
    },
    created() {
        this.originalValue = this.answer.body;
        let endpoint = "/api/user/";
        apiService(endpoint).then(data => {
            this.isAuthor = data.username === this.answer.author;
        });
    },
    methods: {
        deleteAnswer() {
            let endpoint = `/api/answers/${this.answer.id}/`;
            let method = "DELETE";
            apiService(endpoint, method).then(() =>
                this.$emit("delete", this.answer)
            );
        },
        onUpdateAnswer() {
            let endpoint = `/api/answers/${this.answer.id}/`;
            let method = "PUT";

            if (!this.answer.body) {
                return (this.error = "Answer cannot be empty!");
            }

            if (this.originalValue !== this.answer.body) {
                apiService(endpoint, method, { body: this.answer.body }).then(
                    data => {
                        this.answer = data;
                        this.edit = false;
                        this.error = false;
                    }
                );
            }
        },

        onCancel() {
            this.edit = false;
            this.answer.body = this.originalValue;
            this.error = false;
        }
    }
};
</script>

<style  scoped>
.delete-button {
    display: flex;
}

.button-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
}
</style>