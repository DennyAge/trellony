<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <button
            class="close-btn"
            @click="closeModal"
        >
          <img src="../public/icons/cross.svg" alt="cross">
        </button>
      </div>
      <div class="modal-body">
        <v-form
            ref="formRef"
            class="form"
        >
          <v-text-field
              v-model="task.title"
              label="Назва"
              :rules="[requiredRule]"
              required
              variant="outlined"
          />
          <v-textarea
              v-model="task.description"
              label="Опис"
              :rules="[requiredRule]"
              required
              variant="outlined"
              auto-grow
          />
          <v-text-field
              v-model="task.creator"
              label="Відповідальна особа"
              :rules="[requiredRule]"
              required
              variant="outlined"
          /> 
          <v-text-field
              v-model="task.assignee"
              label="Виконавці"
              :rules="[requiredRule]"
              required
              variant="outlined"
          />
          <v-select
              v-model="task.status"
              label="Статус"
              :items="['TODO', 'In Progress', 'Done']"
              variant="outlined"
          />
          <v-select
              v-model="task.priority"
              label="Приорітет"
              :items="['Low', 'Medium', 'High']"
              variant="outlined"
          />
        </v-form>
      </div>
      <div class="modal-footer">
        <button
            class="modal-footer__btn"
            @click="closeModal"
        >
          Скасувати
        </button>
        <button
            class="modal-footer__btn"
            @click="submitForm"
        >
          {{ isEdit ?  'Зберегти' : 'Додати' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps( {
  isVisible: Boolean,
  isEdit: Boolean( false ),
  task: Object,
} );

const emit = defineEmits( [
  'close',
  'updateTask',
  'createTask'
] );

const oldTaskValue = props.task;
const task = ref( { ...props.task } );
const formRef = ref( null );

const requiredRule = value => !!value || 'Це поле є обов\'язковим для заповнення.';

const submitForm =  async () => {
  const isValid = await formRef.value.validate();
  if ( !isValid.valid ) {
    return;
  }

  if ( props.isEdit ) {
    emit( 'updateTask', task.value,  oldTaskValue, task.value.status );
  } else {
    emit( 'createTask', task.value );
  }
};

const closeModal = () => {
  emit( 'close' );
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: var(--neutral-10-color);
  border-radius: 8px;
  text-align: center;
  width: max-content;
  min-width: 15em;
  box-shadow: var(--large-shadow);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  border-bottom: 1px solid var(--neutral-60-color);
  padding: 0.5em 1em;
}
.close-btn {
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5em;
  padding: 1rem 2.5rem;
}
.modal-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 2rem;
  border-top: 0.063rem solid var(--neutral-60-color);
}
.modal-footer__btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 0.063rem solid var(--neutral-60-color);
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--neutral-100-color);
}
.modal-footer__btn:hover {
  background: var(--neutral-60-color);
  color: var(--neutral-10-color);
  font-weight: 700;
}
.form {
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media screen and (max-width: 500px) {
  .modal {
    width: 100%;
    height: 100dvh;
    overflow: scroll;
  }
}
</style>
