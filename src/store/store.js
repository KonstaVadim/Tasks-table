import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        iterator: 0,    // итератор
        tasksList: {},  // Список задач
    },
    getters: {
        TASKS_LIST: state => state.tasksList,   // Список задач
    },
    mutations: {
        /* Удалить задачу */
        DELETE_TASK(state, id) {
            /* Здесь должен быть метод для отправки на сервер */
            /* Добавляем данные */
            Vue.delete(state.tasksList, id);
        },
        /* Сохранить задачу */
        SAVE_TASK(state, task) {
            /* Здесь должен быть метод для отправки на сервер,
            * Поэтому сами иммитируем добавление id
            * */
            if (task.id === undefined || task.id === null) {
                task.id = state.iterator++;
            }
            /* Добавляем данные */
            Vue.set(state.tasksList, task.id, task)
        },
    },
    actions: {
        /* Удалит задачу */
        deleteTask(state, id) {
            state.commit('DELETE_TASK', id)
        },
        /* Сохранить задачу */
        saveTask(state, task) {
            state.commit('SAVE_TASK', task)
        },
    }
})