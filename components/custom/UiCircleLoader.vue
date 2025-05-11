<template>
  <div class="loader-container">
    <svg width="300" height="300" viewBox="-25 -25 300 300" class="load-parent">
      <path
        class="load"
        d="M 125 25 A 100 100 0 0 1 225 125 A 100 100 0 0 1 125 225"
        fill="none"
        stroke="#5898ff"
        stroke-width="10"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
  .loader-container {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .load {
    animation: colorChange 3s linear infinite;
    filter: drop-shadow(0 0 10px #5898ff) drop-shadow(0 0 20px #5898ff); /* Неоновое свечение */
  }

  .load-parent {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes colorChange {
    0% {
      stroke: #5898ff;
      filter: drop-shadow(0 0 10px #5898ff) drop-shadow(0 0 20px #5898ff);
    }
    /* 15% {
      stroke: #80fcff;
      filter: drop-shadow(0 0 10px #80fcff) drop-shadow(0 0 20px #80fcff);
    }
    33% {
      stroke: #ff00ff;
      filter: drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #ff00ff);
    } */
    50% {
      stroke: #ff80ff;
      filter: drop-shadow(0 0 10px #ff80ff) drop-shadow(0 0 20px #ff80ff);
    }
    /* 66% {
      stroke: #00ff00;
      filter: drop-shadow(0 0 10px #00ff00) drop-shadow(0 0 20px #00ff00);
    }
    83% {
      stroke: #80ff80;
      filter: drop-shadow(0 0 10px #80ff80) drop-shadow(0 0 20px #80ff80);
    } */
    100% {
      stroke: #5898ff;
      filter: drop-shadow(0 0 10px #5898ff) drop-shadow(0 0 20px #5898ff);
    }
  }
</style>
