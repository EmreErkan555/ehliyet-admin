export const USER_ROLES = {
  ADMIN : 1,
  COURSEADMIN: 2,
  USER: 3
}

export const isAdmin = (user) => {
  return user.role.id === USER_ROLES.ADMIN
}