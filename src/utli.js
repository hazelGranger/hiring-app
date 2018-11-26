
export function getRedirectPath(userinfo) {
  // user.type  /boss /applicant
  // user.avatar /bossinfo employee
  const { type, avatar } = userinfo

  let url = type === 'boss'? '/boss' : '/applicant'
  if (!avatar) {
    url += 'info'
  }

  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}
