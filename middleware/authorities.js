export default ({ app, store, route, redirect }) => {
  if (route.path !== app.localePath('/login') && !store.getters.isLogin) {
    return redirect(app.localePath('/login'), { redirect: route.path })
  }
}
