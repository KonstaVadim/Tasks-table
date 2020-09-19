<template>
  <div class="create-task-modal">
    <div class="modal">
      <!-- Кнопка "Зкрыть"-->
      <div class="btn-close" @click="closeModal()">
        <img src="../../../assets/close.png" alt="Close" title="Закрыть">
      </div>
      <!-- Наименование задачи-->
      <div class="name-container">
        <label for="name">Наименование задачи</label>
        <input type="text"
               v-model="task.name"
               id="name"
               placeholder="Введите наименвоание задачи">
      </div>
      <!-- Описание задачи-->
      <div class="description-container">
        <label for="description">Описание задачи</label>
        <textarea type="text"
                  id="description"
                  v-model="task.description"
                  placeholder="Введите описание задачи" rows="3">
        </textarea>
      </div>
      <!-- Дата задачи-->
      <div class="date-container">
        <label for="date">Дата</label>
        <input type="date"
               id="date"
               v-model="task.date" placeholder="Выберите дату">
      </div>
      <!-- Кнопка "Сохранить"-->
      <div class="btn-save" @click="saveTask()">
        <span>Сохранить</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CreateTask",
  props: ['taskObj'],
  data() {
    return {
      task: {},
      date: '',
    }
  },
  methods: {
    /* Закрыть модальное окно */
    closeModal() {
      this.$emit('closeModal');
    },
    /* Сохранить задачу */
    saveTask() {
      /* Меняем формат даты на удобный */
      this.task.dateFormat = this.task.date.split('-').reverse().join('.');

      if (this.validationForm()) {
        this.$emit('saveTask', this.task);
      }

    },
    /* Валидация форм */
    validationForm() {
      if (!this.task.name) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          text: 'Пожалуйста, заполните наименование задачи'
        });
        return false;
      }
      return true;
    },
  },
  created() {
    /* Избавляемся от ссылки */
    this.task = JSON.parse(JSON.stringify(this.taskObj))
  }
}
</script>

<style lang="scss" scoped>


$orange: #E8A735;
$activeBtn: #8C0004;
$btn: #C8000A;

.vdp-datepicker__calendar {
  width: 150px !important;
}

@mixin f-column {
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-top: 15px;
  font-size: 12px;
  line-height: 1.5;
}

label {
  font-size: 11px;
  width: max-content;
}

@mixin input {
  width: 230px;
  padding: 0 10px;
  border: 1px solid #cccccc;
  outline: none;

  &:focus {
    border: 1px solid $orange;
    box-shadow: 1px 1px 2px 0 $orange;
  }
}

.create-task-modal {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
}

.modal {
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;

  .btn-close {
    margin-top: 10px;
    margin-right: 10px;
    width: max-content;
    margin-left: auto;

    img {
      width: 15px;
      cursor: pointer;
    }
  }

  .name-container {
    @include f-column;

    input {
      @include input;
      height: 25px;
    }
  }

  .description-container {
    @include f-column;

    textarea {
      @include input;
      padding: 5px 10px;
      resize: none;
    }
  }

  .date-container {
    @include f-column;

    input {
      @include input;
      height: 25px;
    }
  }

  .btn-save {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    margin-top: 20px;
    font-size: 13px;
    background-color: $btn;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 2px 1px #8C0004;
    }

    &:active {
      background-color: $activeBtn;
    }

  }
}

</style>