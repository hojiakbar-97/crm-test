import Vue from 'vue';
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    employees: [],
    employeeById: []
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    setEmployeeById(state, employee) {
      state.employeeById = employee;
    }
  },
  actions: {
    async getEmployees({ commit }) {
      await axios.get('http://localhost:3000/employees')
        .then((res) => {
          commit('setEmployees', res.data);
        })
        .catch((error) => console.log(error))
    },
    async getEmployeeById({ commit }, id) {
      await axios.get(`http://localhost:3000/employees/${id}`)
        .then((res) => {
          commit('setEmployeeById', res.data);
        })
        .catch((error) => console.log(error))
    },
  },
  getters: {
    employees(state) {
      return state.employees
    },
    employee(state) {
      return state.employeeById
    },
  }
});

export default store;
