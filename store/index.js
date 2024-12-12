// taskStore.js
import { defineStore } from 'pinia';

export const useTaskStore = defineStore( 'taskStore', {
  state: () => ( {
    tasks: {
      TODO: [
        { id: 1, title: 'Task 1', description: 'Description 1', creator: 'Alice', assignee: 'John', priority: 'High', status: 'TODO' },
        { id: 2, title: 'Task 2', description: 'Description 2', creator: 'Alice', assignee: 'Alice', priority: 'Low', status: 'TODO' },
      ],
      'In Progress': [
        { id: 3, title: 'Task 3', description: 'Description 3', creator: 'Alice',  assignee: 'Bob', priority: 'Medium', status: 'In Progress' },
      ],
      Done: [
        { id: 4, title: 'Task 4', description: 'Description 4', creator: 'Alice',  assignee: 'Eve', priority: 'High', status: 'Done' },
      ],
    },
  } ),
  actions: {
    createTask( task ) {
      this.tasks[task.status].push( task );
    }, 
    updateTaskStatus( task, newStatus ) {
      const oldColumnTasks = this.tasks[task.status];
      const newColumnTasks = this.tasks[newStatus];

      const index = oldColumnTasks.findIndex( t => t.id === task.id );
      if ( index !== -1 ) {
        oldColumnTasks.splice( index, 1 );
      }

      task.status = newStatus;
      newColumnTasks.push( task );
    },
    deleteTask( taskId ) {
      Object.keys( this.tasks ).forEach( ( status ) => {
        const index = this.tasks[status].findIndex( task => task.id === taskId );
        if ( index !== -1 ) {
          this.tasks[status].splice( index, 1 );
        }
      } );
    },
  },
  getters: {
    tasksByStatus: ( state ) => ( status ) => {
      return state.tasks[status] || [];
    },
  },
} );
