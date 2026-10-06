'use client'
import React, { useState, useEffect } from 'react'
import { Supabase } from './services/supabaseClient'

function Provider({ children }) {

    useEffect(() => {
         createNewUser();
    }, [])

    const CreateNewUser = () => {

        Supabase.auth.getUser().then(async ({ data: { user } }) => {
            // Check if the user exists in your database
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email);

                console.log(Users);


               // If the user doesn't exist, create a new user 
        })
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider