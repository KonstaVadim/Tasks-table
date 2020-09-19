<template>
  <div class="tasks-table">
    <!-- Контейнер c поиском и кнопкой "Создать"-->
    <div class="filter-container">
      <!-- Поиск -->
      <div class="search-container">
        <input type="text" v-model="searchText" placeholder="Введите задачу">
        <img src="../../assets/close.png" alt="Del" @click="resetText()" title="Очистить">
      </div>
      <!-- Кнопка "создать" -->
      <div class="btn-create" @click="createTask()">
        <span>Создать задачу</span>
      </div>
    </div>

    <!-- Котейнер с таблицой -->
    <div class="table">
      <!-- Вкладки таблицы-->
      <div class="table-tabs">
        <div class="tab">
          <span>Наименование задачи</span>
        </div>
        <div class="tab">
          <span>Описание задачи</span>
        </div>
        <div class="tab">
          <span>Дата</span>
        </div>
      </div>
      <!-- Контент таблицы -->
      <div class="table-content">
        <!-- Задача -->
        <transition-group name="fade">
        <div class="task-container" v-for="(task) in filteredTasksList" :key="task.id">
          <div class="task" @click="openBtns(task.id)">
            <div class="cell">{{ task.name }}</div>
            <div class="cell">{{ task.description }}</div>
            <div class="cell">{{ task.dateFormat }}</div>
          </div>
          <transition name="fade">
            <div class="btn-container" v-if="tasksIsOpen[task.id]">
              <div class="edit-btn" @click="editTask(task)">
                <span>Редактировать</span>
                <img src="../../assets/edit.png" alt="Edit">
              </div>
              <div class="delete-btn" @click="deleteTask(task.id)">
                <span>Удалить</span>
                <img src="../../assets/delete.png" alt="Del">
              </div>
            </div>
          </transition>
        </div>
        </transition-group>
      </div>
    </div>
    <transition name="fade">
      <create-task-modal
          v-if="activeModal == 'create-task-modal'"
          :taskObj="taskObj"
          @saveTask="saveTask($event)"
          @closeModal="closeModal()"
      />
    </transition>
  </div>
</template>

<script>

/* Модалка */
import CreateTaskModal from "@/components/TasksTable/modals/CreateTaskModal";

import {mapGetters} from 'vuex';

export default {
  name: "Tasks-table",
  components: {CreateTaskModal},
  comments: {
    CreateTaskModal
  },
  data() {
    return {
      tasksIsOpen: {},
      activeModal: '',
      searchText: '',
      taskObj: {},
    }
  },
  computed: {
    ...mapGetters({
      tasksList: 'TASKS_LIST'
    }),

    /* Отфиьлтрованный список */
    filteredTasksList() {
      let filteredList = Object.values(this.tasksList);
      if (this.searchText) {
        filteredList = filteredList.filter(task => {
          let name = task.name.toLowerCase(),
              searchText = this.searchText.toLowerCase();
          return name.indexOf(searchText) > -1
        })
      }
      return filteredList;
    }
  },
  methods: {
    /* Редактировать задачу */
    editTask(task) {
      this.taskObj = task;
      this.activeModal = 'create-task-modal';
    },
    /* Удалить задачу */
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
    /* Открыть контейнер с кнопками */
    openBtns(id) {
      if (this.tasksIsOpen[id]) {
        this.$set(this.tasksIsOpen, id, false);
      } else {
        this.$set(this.tasksIsOpen, id, true);
      }
    },
    /* Сохранить задачу */
    saveTask(task) {
      this.$store.dispatch('saveTask', task)
      this.closeModal();
    },
    /* Создать задачу */
    createTask() {
      this.taskObj = {
        id: null,
        name: '',
        description: '',
        date: '',
        dateFormat: '',
      }

      this.activeModal = 'create-task-modal';
    },
    /* Закрыть модальное окно */
    closeModal() {
      this.tasksObj = {};
      this.activeModal = '';
    },
    /* Сбросить текст поиска */
    resetText() {
      this.searchText = '';
    },
  }
}
</script>

<style lang="scss" scoped>

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin row-table {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
}

@mixin btnRed {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background-color: $btn;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px 1px $activeBtn;
  }

  &:active {
    background-color: $activeBtn;
  }
}

@mixin btnBlue {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background-color: $btn2;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px 1px $activeBtn2;
  }

  &:active {
    background-color: $activeBtn2;
  }
}

$activeBtn: #8C0004;
$btn: #C8000A;
$activeBtn2: #548279;
$btn2: #AFBDB8;
$orange: #E8A735;
$rock: #e2c499;


.tasks-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 10px;

  .search-container {
    position: relative;

    input {
      width: 230px;
      height: 25px;
      padding-left: 10px;
      padding-right: 30px;
      border: 1px solid #cccccc;
      border-radius: 10px;
      outline: none;

      &:focus {
        border: 1px solid $orange;
        box-shadow: 1px 1px 2px 0 $orange;
      }
    }

    img {
      position: absolute;
      width: 13px;
      top: 50%;
      right: 10px;
      transform: translate(0, -50%);
      cursor: pointer;

    }
  }

  .btn-create {
    @include btnRed;
    height: 25px;
    padding: 0 10px;
  }
}

.table {
  display: flex;
  flex-direction: column;
  height: calc(100% - 35px);
  font-size: 14px;

  &-tabs {
    @include row-table;
    width: 100%;
    padding-right: 17px;
    background-color: $orange;
    border-radius: 2px;
    color: #fff;


    .tab {
      @include flex-center;
      padding: 10px 10px;

      &:not(:last-child) {
        box-shadow: 5px 0 0 -4px $rock;
      }
    }

  }

  &-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid $orange;
    border-radius: 2px;
    background-color: #f0f0f0;
    overflow-y: scroll;
    overflow-x: hidden;

    .task-container {
      margin-bottom: 5px;

      .task {
        @include row-table;
        background-color: $rock;
        margin-bottom: 3px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          background-color: #e2bc87;
        }

        .cell {
          display: flex;
          padding: 5px 10px;

          &:not(last-child) {
            box-shadow: 5px 0 0 -4px #f0f0f0;
          }

          &:last-child {
            @include flex-center;
          }
        }
      }

      .btn-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;

        .edit-btn {
          margin-right: 20px;
        }

        .edit-btn, .delete-btn {
          @include btnBlue;
          padding: 3px 7px;
          border-radius: 10px;

          img {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

/* Анимация */
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}

.fade-enter, .fade-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>