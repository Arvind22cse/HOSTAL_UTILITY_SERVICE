import { create } from "zustand";
export const usehostalstore=create((set)=>({
    accounts:[],
    setAccount:(accounts)=>set({accounts}),
    createAccount:async(newaccount)=>{
        if(!newaccount.name||!newaccount.email||!newaccount.password){
            return {success:false,message:"Please fill in all fields."}
        }
        const res=await fetch("/api/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newaccount)
        })
        const data=await res.json();
        set((state)=>({accounts:[...state.accounts,data.data]}))
        return {success:true,message:"account created successfully."}
    },
}))