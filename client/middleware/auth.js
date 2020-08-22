export default function(ctx) {
  const user = ctx.app.$fireAuth.currentUser
  if (!user) {
    return ctx.redirect('/signin')
  }
}
