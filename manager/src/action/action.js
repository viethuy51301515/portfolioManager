export const login = (email)=>{
    return{
        email:email,
        type:"login",
    }
}
export const logout = ()=>{
    return{
        type:'logout',
    }
}
