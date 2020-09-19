<template>
  <div id="app">
    <tasks-table/>
    <notifications group="foo" />
  </div>
</template>

<script>

import TasksTable from './components/TasksTable/Tasks-table';

export default {
  name: 'App',
  components: {
    TasksTable
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-width: 860px;
  min-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 10px;
}
</style>
