<template>
<div id="app">
  <nav class="pure-menu pure-menu-horizontal">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <a class="pure-menu-heading pure-menu-link" href="#">BIRD SIGHTINGS</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/" class="pure-menu-link">Home <span class="sr-only">(current)</span></router-link></li>
        <li class="pure-menu-item"><router-link to="/entries" class="pure-menu-link">Entries</router-link></li>
        <li class="pure-menu-item"><router-link to="/edit" class="pure-menu-link">Edit</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </nav>
  <!--
  <div class="pure-menu">
    <span class="pure-menu-heading">Photo Bomb</span>
    <ul class="pure-menu-list">
      <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">Home</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/mypage" class="pure-menu-link">My Page</router-link>
      </li>
    </ul>
  </div>
  <div class="content">
    <router-view />
  </div>
  -->
</div>
</template>

<style>
/* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  min-height: 100%;
}

.mainImg {
  display: block;
  width: 35%;
  height:auto;
  margin-left: auto;
  margin-right: auto;
}

.navbar {
  margin-bottom: 0 !important;
}

.bg-1 {
  background-color: #1abc9c; /* Green */
  color: #ffffff;
}

.bg-2 {
  background-color: #474e5d; /* Dark Blue */
  color: #ffffff;
}

.bg-3 {
  background-color: #ffffff; /* White */
  color: #555555;
}

.container-fluid {
  padding-top: 3%;
  padding-bottom: 5%;
}

.heading h2 {
  margin: 0px;
  margin-left: 10px;
}

.circle {
  border-radius: 2%;
  width: 30%;
  height: 30%;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

.displayJ {
  color: #102602;
  margin: 2%;
}
</style>
