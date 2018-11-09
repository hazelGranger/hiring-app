
export function getRedirectPath({type,avatar}){
  // user.type  /boss /applicant
  // user.avatar /bossinfo employee
  console.log(type,'utli');
  let url = type==='boss'? '/boss' : '/applicant'
  if (!avatar) {
    url += 'info'
  }
  return url
}
