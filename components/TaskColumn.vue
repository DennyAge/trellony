<template>
  <div class="task-column" @dragover.prevent @drop="onDrop">
    <h2 class="task-column__name">{{ columnName }}</h2>
    <ul>
      <li
          v-for="task in tasks"
          :key="task.id"
          class="task-item"
          draggable="true"
          @dragstart="onDragStart(task)"
      >
        <TaskCard
            :task="task"
            @edit-task="editTask"
            @delete-task="deleteTask"
        />
      </li>
    </ul>
    <button class="add-task-btn" @click="addNewTask">
      <img src="../public/icons/add.svg" alt="add">
      Створити задачу
    </button>
  </div>
  <TaskModal
      v-if="isModalVisible"
      :task="selectedTask"
      :is-visible="isModalVisible"
      :is-edit="isEdit"
      @close="closeModal"
      @update-task="updateTask"
      @create-task="createTask"
  />
</template>

<script setup>

import { ref } from 'vue';

import TaskCard from './TaskCard.vue';
import TaskModal from './TaskModal.vue';

const props = defineProps( {
  columnName: String,
  tasks: Array,
} );

const emit = defineEmits( [
  'createTask',
  'updateTask',
  'deleteTask',
  'onDragStart',
  'onDrop' ]
);

const isModalVisible = ref( false );
const isEdit = ref( false );
const selectedTask = ref( null );


const addNewTask = () => {
  const task = {
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium',
    status: props.columnName,
  };
  selectedTask.value = { ...task };
  isModalVisible.value = true;
};
const editTask = ( task ) => {
  selectedTask.value = { ...task };
  isModalVisible.value = true;
  isEdit.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedTask.value = null;
};

const updateTask = ( updatedTask, oldTaskValue,  newStatus ) => {
  emit( 'updateTask', updatedTask, oldTaskValue, newStatus );
  closeModal();
};
const createTask = ( newTask ) => {
  emit( 'createTask', newTask );
  closeModal();
};
const deleteTask = ( taskId ) => {
  emit( 'deleteTask', taskId );
};

const onDragStart = ( task ) => {
  emit( 'onDragStart', task );
};

const onDrop = ( ) => {
  const task = props.onDragStartTask;
  emit( 'onDrop', task, props.columnName );
};
</script>

<style scoped>
.task-column {
  width: 100%;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(0.6rem);
  border-radius: 0.938rem;
  padding: 1.875rem;
  margin-right: 0.625rem;
  height: max-content;
}
.task-column__name {
  text-align: center;
  margin-bottom: 0.938rem;
  text-transform: uppercase;
  color: var(--neutral-10-color);
}
.task-item {
  list-style: none;
  cursor: move;
}
.add-task-btn {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  padding: 0.313rem 0.625rem 0.313rem 0;
  cursor: pointer;
}
.add-task-btn:hover {
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(0.6rem);
  border-radius: 0.313rem;
}

@media screen and (max-width: 500px) {
  .task-column {
    padding: 0.875rem;
  }

}

</style>
