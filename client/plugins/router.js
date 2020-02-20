import Vue from 'vue'
import Router from 'vue-router'

import Movie from '~/pages/movie'
import Genre from '~/pages/genre'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/movie/:id',
        component: Movie
      },
      {
        path: '/details',
        component: Genre
      }
    ]
  })
}
