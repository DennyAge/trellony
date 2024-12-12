import { defineStore } from 'pinia';

export const useTaskStore = defineStore( 'taskStore', {
  state: () => ( {
    tasks: {
      'TODO': [],
      'In Progress': [],
      'Done': [],
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
    updateTask( task ) {
      const column = this.tasks[task.status];
      const index = column.findIndex( t => t.id === task.id );

      if ( index !== -1 ) {
        column[index] = { ...task };
      } else {
        console.error( 'error updating task' );
      }
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
