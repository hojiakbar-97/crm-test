<template>
  <div>
    <div class="container-fluid mb-5">
      <h4 class="mb-3">Одного сотрудника</h4>
      <div class="row">
        <div class="col-lg-2">
          <ul class="p-2 list-unstyled bg-secondary">
            <li class="py-1 px-3 fw-bold">ФИО : </li>
            <li class="py-1 px-3 fw-bold">Отдел : </li>
            <li class="py-1 px-3 fw-bold">Должность : </li>
            <li class="py-1 px-3 fw-bold">Пол : </li>
            <li class="py-1 px-3 fw-bold">Дата рождения : </li>
          </ul>
        </div>
        <div class="col-lg-3">
          <ul class="p-2 list-unstyled">
            <li class="py-1 px-3">{{ employee.fullname }}</li>
            <li class="py-1 px-3">{{ employee.otdel }}</li>
            <li class="py-1 px-3">{{ employee.position }}</li>
            <li class="py-1 px-3">{{ employee.gender }}</li>
            <li class="py-1 px-3">{{ ChangeFormateDate(employee.date) }}</li>
          </ul>
        </div>
        <div class="col-lg-3">
          <button type="button" class="btn btn-warning" @click="isUpdateForm = true">Изменить</button>
          <button type="button" class="btn btn-danger ml-3" @click="deleteEmployee">Удалить</button>
        </div>
      </div>
      <div class="row" v-if="isUpdateForm">
        <div class="col-lg-6">
          <form>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="fullname">ФИО:</label>
                  <input type="text" class="form-control" v-model="form.fullname" id="fullname">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="sel1">Отдел :</label>
                  <select v-model="form.otdel" class="form-control" id="sel1">
                    <option>IT</option>
                    <option>Бухгалтерия</option>
                    <option>Маркетинг</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="position">Должность :</label>
                  <input type="text" class="form-control" v-model="form.position" id="position">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="date">Дата рождения:</label>
                  <input type="date" class="form-control" v-model="form.date" id="date">
                </div>
              </div>
              <div class="col-lg-6">
                <p>Пол:</p>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio" value="Мужчина"
                           v-model="form.gender" > Мужчина
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio" value="Женщина"
                           v-model="form.gender" > Женщина
                  </label>
                </div>
              </div>
              <div class="col-lg-12 mt-5">
                <button type="button" class="btn btn-outline-warning" @click="close">Отмена</button>
                <button type="button" class="btn btn-success ml-3" @click="updateEmployee">Сохранить изменения</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';

  export default {
    name: "OneEmployee",
    data () {
      return {
        id: this.$route.params.id,
        isUpdateForm: false,
        form: {
          fullname: '',
          otdel: '',
          position: '',
          date: '',
          gender: ''
        },
      }
    },
    computed: {
      ...mapGetters(['employee']),
    },
    methods: {
      ChangeFormateDate(oldDate) {
        return oldDate && oldDate.toString().split("-").reverse().join("-");
      },
      close () {
        this.isUpdateForm = false;
        this.form = {
          fullname: '',
          otdel: '',
          position: '',
          date: '',
          gender: ''
        }
      },
      async updateEmployee () {
        await axios.put(`http://localhost:3000/employees/${this.id}`, this.form)
          .then(() => {
            this.$store.dispatch('getEmployeeById', this.$route.params.id);
            this.form = {
              fullname: '',
              otdel: '',
              position: '',
              date: '',
              gender: ''
            }
          })
          .catch((error) => console.log(error))
      },
      async deleteEmployee () {
        await axios.delete(`http://localhost:3000/employees/${this.id}`)
          .then(() => {
            this.$router.push('/employees');
            alert('Удаление сотрудника')
          })
          .catch((error) => console.log(error))
      }
    },
    mounted() {
      this.$store.dispatch('getEmployeeById', this.$route.params.id)
    }
  }
</script>

<style scoped></style>
