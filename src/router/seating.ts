export default {
  path: '/seating',
  name: 'Seating',
  component: () => import('@/views/seating/index.vue'),
  meta: {
    title: '班级座位表',
    icon: 'grid'
  }
}