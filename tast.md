### use useReducer to handle auth state chnages (storing of user auth chnages)

### re-modify and make use of the new hook => useGetStoreUser()

- change the name to useAuthUserStore()
- make use of the hook all places where it is needed
- remove all of any other hook that does this action already, which it the useStoreUser

- the find a way to create a hook that can get a users Store data based on the username passed to the hook
