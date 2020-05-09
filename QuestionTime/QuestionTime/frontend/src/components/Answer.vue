<template>
    <div>
        <div class="single-answer container">
            <div class="row">
                <div class="col-10">
                    <p class="text-muted">
                        <strong>{{ answer.author }} &#8901; {{ answer.created_at }}</strong>
                    </p>
                    <div v-show="!edit">
                        <p>{{answer.body}}</p>
                    </div>
                    <textarea
                        v-show="isAuthor && edit"
                        class="form-control"
                        v-model="answer.body"
                        rows="3"
                    ></textarea>
                    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
                </div>
                <div v-if="isAuthor" class="col-2 button-container">
                    <div class="row justify-content-around">
                        <div>
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
                                v-show="!edit"
                                @click="deleteAnswer"
                            >
                                <i class="fa fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else class="col-2">
                    <div class="row">
                        <button
                            :class="{ 'btn' : answer !==null , 'btn-outline-info': !answer.user_has_voted, 'btn-info': answer.user_has_voted }"
                            @click="toggleLike"
                        >
                            <i class="fa fa-thumbs-up"></i>
                            ({{answer.likes_count}})
                        </button>

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
        },
        requestUser: {
            type: String,
            required: true
        }
    },
    computed: {
        isAuthor() {
            return this.requestUser == this.answer.author;
        }
    },
    data() {
        return {
            showModal: true,
            edit: false,
            originalValue: null,
            error: null
        };
    },
    created() {
        this.originalValue = this.answer.body;
    },
    methods: {
        deleteAnswer() {
            this.$emit("delete", this.answer);
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
        },
        async toggleLike() {
            let endpoint = `/api/answers/${this.answer.id}/like/`;
            let method = this.answer.user_has_voted ? "DELETE" : "POST";
            try {
                await apiService(endpoint, method);
                this.answer.user_has_voted = !this.answer.user_has_voted;
                this.answer.likes_count = this.answer.user_has_voted
                    ? this.answer.likes_count + 1
                    : this.answer.likes_count -1 ;
            } catch (err) {
                console.log(err);
            }
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

.likeIcon {
    font-size: 1.5rem;
}

</style>