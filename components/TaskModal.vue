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
        <v-form ref="formRef">
          <v-text-field
              v-model="task.title"
              label="Title"
              :rules="[requiredRule]"
              required
          />
          <v-textarea
              v-model="task.description"
              label="Description"
              :rules="[requiredRule]"
              required
          />
          <v-text-field
              v-model="task.creator"
              label="Creator"
              :rules="[requiredRule]"
              required
          /> 
          <v-text-field
              v-model="task.assignee"
              label="Assignee"
              :rules="[requiredRule]"
              required
          />
          <v-select
              v-model="task.priority"
              label="Priority"
              :items="['Low', 'Medium', 'High']"
          />
          <v-select
              v-model="task.status"
              label="Status"
              :items="['TODO', 'In Progress', 'Done']"
          />
        </v-form>
      </div>
      <div class="modal-footer">
        <button
            class="modal-footer__btn"
            @click="closeModal"
        >
          close
        </button>
        <button
            class="modal-footer__btn"
            @click="submitForm"
        >
          save
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

const emit = defineEmits( [ 'close', 'updateTask', 'createTask' ] );

const oldTaskValue = props.task;
const task = ref( { ...props.task } );

const formRef = ref( null );
const requiredRule = value => !!value || 'This field is required.';

const submitForm =  async () => {
  const isValid = await formRef.value.validate();
  if ( !isValid.valid ) {
    return;
  }

  if ( props.isEdit ) {
    emit( 'updateTask', oldTaskValue, task.value.status );
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
  background: #fff;
  border-radius: 8px;
  text-align: center;
  width: max-content;
  min-width: 15em;
  box-shadow: 0 0.0625rem 1.5rem 0.5rem rgba(0, 0, 0, 0.08), 0 0 0.0625rem rgba(20, 20, 20, 0.08);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  border-bottom: 1px solid #9E9E9E;
  padding: 0.5em 1em;
}
.close-btn {
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}
.close-btn img {
  width: 1.5em;
  height: 1.5em;
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
  border-top: 0.063rem solid #9E9E9E;
}
.modal-footer__btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 0.063rem solid #9E9E9E;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #000;
}
.modal-footer__btn:hover {
  background: #9E9E9E;
  color: #000;
  font-weight: 700;
}
</style>
