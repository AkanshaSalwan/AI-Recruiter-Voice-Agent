'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/services/supabaseClient.js'



const UserDetailContext = createContext(null)

function Provider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const supabase = createClient()
        const usersBeingCreated = new Set()

        const createNewUser = async (authenticatedUser) => {
            if (!authenticatedUser?.email) {
                return
            }
            if (usersBeingCreated.has(authenticatedUser.id)) {
                return
            }
            usersBeingCreated.add(authenticatedUser.id)

            try {
                const { data: existingUser, error: lookupError } = await supabase
                    .from('Users')
                    .select('id')
                    .eq('email', authenticatedUser.email)
                    .maybeSingle()

                if (lookupError) {
                    throw lookupError
                }
                if (existingUser) {
                    return
                }

                const { error: insertError } = await supabase.from('Users').insert([
                    {
                        name: authenticatedUser.user_metadata?.name ?? authenticatedUser.user_metadata?.full_name,
                        email: authenticatedUser.email,
                        picture: authenticatedUser.user_metadata?.picture ?? authenticatedUser.user_metadata?.avatar_url,
                    },
                ])

                if (insertError) {
                    throw insertError
                }
            } catch (error) {
                usersBeingCreated.delete(authenticatedUser.id)
                throw error
            }
        }

        const handleUser = (authenticatedUser) => {
            setUser(authenticatedUser)
            createNewUser(authenticatedUser).catch((error) => {
                console.error('Unable to create the Supabase user record:', error)
            })
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setTimeout(() => handleUser(session?.user ?? null), 0)
        })

        supabase.auth.getUser().then(({ data: { user: authenticatedUser }, error }) => {
            if (error) {
                throw error
            }
            handleUser(authenticatedUser)
        }).catch((error) => {
            console.error('Unable to retrieve the Supabase user:', error)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            {children}
        </UserDetailContext.Provider>
    )
}

export default Provider

export function DashboardProvider({ children }) {
    const context = useContext(UserDetailContext)

    if (!context) {
        throw new Error('DashboardProvider must be used within a Provider')
    }

    return (
        <UserDetailContext.Provider value={context}>
            {children}
        </UserDetailContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserDetailContext)
    if (!context) {
        throw new Error('useUser must be used within a Provider')
    }
    return context
}