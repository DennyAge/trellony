<template>
  <div class="task-dashboard">
    <TaskColumn
        v-for="(tasks, status) in taskStatuses"
        :key="status"
        :column-name="status"
        :tasks="tasks"
        @update-task="updateTask"
        @create-task="createTask"
        @delete-task="deleteTask"
        @on-drag-start="onDragStart"
        @on-drop="onDrop"
    />
  </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import { useTaskStore } from '../store/index.js';
import TaskColumn from '../components/TaskColumn.vue';

useSeoMeta( {
  title: 'Dashboard',
  ogTitle: 'Dashboard',
  description: 'This is test task',
  ogDescription: 'This is test task',
} );

const taskStore = useTaskStore();

const taskStatuses = computed( () => taskStore.tasks );

const draggedTask = ref( null );


const createTask = ( newTask ) => {
  newTask.id = new Date().getTime();
  taskStore.createTask( newTask );
};

const updateTask = ( updatedTask, oldTaskValue, newStatus ) => {
  taskStore.updateTaskStatus( oldTaskValue, newStatus );
  taskStore.updateTask( updatedTask );
};

const updateTaskStatus = ( task, newStatus ) => {
  taskStore.updateTaskStatus( task, newStatus );
};

const deleteTask = ( taskId ) => {
  taskStore.deleteTask( taskId );
};

const onDragStart = ( task ) => {
  draggedTask.value = task;
};

const onDrop = ( task, newStatus ) => {
  if ( draggedTask.value ) {
    updateTaskStatus( draggedTask.value, newStatus );
    draggedTask.value = null;
  }
};
</script>

<style scoped>
.task-dashboard {
  display: flex;
  gap: 1.875rem;
}

</style>
