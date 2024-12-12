<template>
  <div class="task-card" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <div
        class="task-card-header"
        :class="{ 'active-item': isExpanded }
"
        @click="toggleDetails">
      <div class="task-card-header__title">
        <img v-if="!isExpanded && isHovered" src="../public/icons/down-arrow.svg" alt="down-arrow">
        <img v-if="isExpanded" src="../public/icons/top-arrow.svg" alt="top-arrow">
        <strong>{{ task.title }}</strong>
      </div>
    <div class="task-card-header__bnt">
      <button v-if="isHovered" class="edit-btn" @click.stop="editTask">
        <img src="../public/icons/pencil.svg" alt="pencil">
      </button>
      <button v-if="isHovered" class="delete-btn" @click.stop="deleteTask">
        <img src="../public/icons/trash.svg" alt="trash">
      </button>
    </div>
    </div>

    <div v-if="isExpanded" class="task-card-details">
      <p><strong>Description:</strong> {{ task.description }}</p>
      <p><strong>Responsible person:</strong> {{ task.creator }}</p>
      <p><strong>Executors:</strong> {{ task.assignee }}</p>
      <p><strong>Priority:</strong> {{ task.priority }}</p>
      <p><strong>Status:</strong> {{ task.status }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps( {
  task: Object
} );

const emit = defineEmits( [
  'editTask',
  'deleteTask'
] );

const isHovered = ref( false );
const isExpanded = ref( false );

const editTask = ( event ) => {
  event.stopPropagation();
  emit( 'editTask', props.task );
};

const deleteTask = ( event ) => {
  event.stopPropagation();
  emit( 'deleteTask', props.task.id );
};
const toggleDetails = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.task-card {
  background-color: var(--neutral-10-color);
  margin-bottom: 1.25rem;
  cursor: pointer;
  color: var(--neutral-100-color);
  min-height: 2.25rem;
  border-radius: 0.5rem;
}
.task-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  padding: 0.313rem 1.25rem;
}
.active-item {
  border-bottom: 1px solid var(--neutral-100-color);
}
.task-card-header__title {
  display: flex;
  align-items: center;
  gap: 0.313rem;
}
.task-card-header__bnt {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.task-card-header strong {
  font-size: 1rem;
}

.task-card-header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.task-card-header button:hover {
  opacity: 0.5;
}

.task-card-details {
  padding: 1.25rem 25px;
}
.task-card-details p {
  margin: 0.625rem 0;
}
</style>
