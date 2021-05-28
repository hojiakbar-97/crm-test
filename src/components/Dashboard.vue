<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 mb-3">
          <div class="card bg-success text-white">
            <div class="card-header">
              Количество всех сотрдников
            </div>
            <div class="card-body">{{ employees.length }}</div>
          </div>
        </div>
        <div class="col-lg-4 mb-3">
          <div class="card bg-success text-white">
            <div class="card-header">
              Количество мужчин
            </div>
            <div class="card-body">{{ male.length }}</div>
          </div>
        </div>
        <div class="col-lg-4 mb-3">
          <div class="card bg-success text-white">
            <div class="card-header">
              Количество женщин
            </div>
            <div class="card-body">{{ female.length }}</div>
          </div>
        </div>
        <div class="col-lg-4 mb-3">
          <div class="card bg-success text-white">
            <div class="card-header">
              Количество сотрудников в каждом отделе
            </div>
            <div class="card-body">
              <p>Бухгалтерия : {{ otdelAccounting.length  }}</p>
              <p>IT : {{ otdelIt.length }}</p>
              <p>Маркетинг : {{ otdelMarketing.length }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-3">
          <div class="card bg-success text-white">
            <div class="card-header">
              Средний возраст сотрудника в компании
            </div>
            <div class="card-body">{{ agesSum }} {{ averageAge }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
  name: "Dashboard",
  data () {
    return {
      agesSum: 0
    }
  },
  computed: {
    ...mapGetters(['employees']),
    ChangeFormateDate(oldDate) {
      return oldDate && oldDate.toString().split("-").reverse().join("-");
    },
    male() {
      return this.employees.filter((item) => {
        return item.gender.match('Мужчина');
      })
    },
    female () {
      return this.employees.filter((item) => {
        return item.gender.match('Женщина');
      })
    },
    otdelAccounting () {
      return this.employees.filter((item) => {
        return item.otdel.match('Бухгалтерия');
      })
    },
    otdelIt () {
      return this.employees.filter((item) => {
        return item.otdel.match('IT');
      })
    },
    otdelMarketing () {
      return this.employees.filter((item) => {
        return item.otdel.match('Маркетинг');
      })
    },
    averageAge () {
      let ages = [];
      return this.employees.forEach((item) => {
        ages.push(new Date().getFullYear() - (item.date).split('-')[0]);
         return this.agesSum = ages.reduce((a, b) => a + b) / ages.length;
      })
    },
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('getEmployees');
  }
}
</script>

<style scoped>

</style>
