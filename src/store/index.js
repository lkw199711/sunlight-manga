import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: '阳光漫画',
        reading: false,
    },
    mutations: {
        // 阅读状态控制
        reading_state_update(state, bool = true) {
            state.reading = bool;
        },
    },
    actions: {},
    modules: {}
});
