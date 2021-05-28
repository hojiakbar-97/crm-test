<template>
  <div class="employees">
    <div class="container-fluid">
      <div>
        <div class="row">
          <div class="col-lg-2">
            <div class="form-group">
              <label for="sel1">Фильтр по отделу:</label>
              <select v-model="filterOtdel" class="form-control" id="sel1">
                <option selected disabled></option>
                <option>IT</option>
                <option>Бухгалтерия</option>
                <option>Маркетинг</option>
              </select>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-group">
              <label for="sel2">Фильтр по полу:</label>
              <select v-model="filterGender" class="form-control" id="sel2">
                <option selected disabled></option>
                <option>Женщина</option>
                <option>Мужчина</option>
              </select>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-group" @click="restart">
              <label for="usr">Начать снова:</label>
              <input type="submit" class="form-control btn btn-success" value="Restart" id="usr">
            </div>
          </div>
          <div class="col-lg-6">
            <button type="button" @click="openModal" class="btn btn-success float-right mt-4">Создать сотрудника</button>
          </div>
        </div>
      </div>
      <table class="table table-bordered">
        <thead class="bg-success text-white">
        <tr>
          <th>№</th>
          <th>ФИО</th>
          <th>Отдел</th>
          <th>Должность</th>
          <th>Пол</th>
          <th>Дата рождения</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="employee of filerFun" :key="employee.id" @click="employeeLink(employee.id)" style="cursor: pointer">
          <td class="">{{ employee.id }}</td>
          <td>{{ employee.fullname }}</td>
          <td>{{ employee.otdel }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ ChangeFormateDate(employee.date) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- The Modal -->
    <div class="modal" :class="isActive">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Создать сотрудника</h5>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
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
                    <label for="otdel">Отдел :</label>
                    <select v-model="form.otdel" class="form-control" id="otdel">
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
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn-success ml-3" @click="createEmployee">Сохранить</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';

  export default {
    name: "Employees",
    data () {
      return {
        filterOtdel: '',
        filterGender: '',
        isActive: '',
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
      ...mapGetters(['employees']),
      filerFun () {
        return this.employees.filter((otdel) => {
          return otdel.otdel.match(this.filterOtdel) && otdel.gender.match(this.filterGender);
        })
      }
    },
    methods: {
      ChangeFormateDate(oldDate) {
        return oldDate && oldDate.toString().split("-").reverse().join("-");
      },
      openModal () {
        this.isActive = 'd-block'
      },
      closeModal () {
        this.isActive = '';
        this.form = {
          fullname: '',
          otdel: '',
          position: '',
          date: '',
          gender: ''
        }
      },
      employeeLink (index) {
        this.$router.push(`/oneemployee/${index}`);
      },
      restart () {
        this.filterOtdel = '';
        this.filterGender = '';
      },
      async createEmployee () {
        this.isActive = '';
        await axios.post('http://localhost:3000/employees', this.form)
          .then(() => {
            this.$store.dispatch('getEmployees');
            this.form = {
              fullname: '',
              otdel: '',
              position: '',
              date: '',
              gender: ''
            }
          })
          .catch((error) => console.log(error))
      }
    },
    mounted() {
      this.$store.dispatch('getEmployees')
    }
  }
</script>

<style scoped>

</style>
