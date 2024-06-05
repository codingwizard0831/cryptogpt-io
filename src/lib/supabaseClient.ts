import { supabase } from './supabase';

// Define types for the profile and user data
export interface UserProfile {
  id: string
  username: string
  email: string
  created_at: string
}

export interface UserData {
  id: string
  email: string
}

// Authentication functions

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email)
}

export const updateUser = async (userData: Partial<UserData>) => {
  return await supabase.auth.updateUser(userData)
}

export const getUser = () => {
  return supabase.auth.getUser()
}

// CRUD operations for a sample table (e.g., 'profiles')

export const fetchProfiles = async () => {
  return await supabase.from('profiles').select('*')
}

export const fetchProfileById = async (id: string) => {
  return await supabase.from('profiles').select('*').eq('id', id).single()
}

export const createProfile = async (profileData: UserProfile) => {
  return await supabase.from('profiles').insert([profileData])
}

export const updateProfile = async (id: string, profileData: Partial<UserProfile>) => {
  return await supabase.from('profiles').update(profileData).eq('id', id)
}

export const deleteProfile = async (id: string) => {
  return await supabase.from('profiles').delete().eq('id', id)
}

// Export the supabase client for direct use if needed
export default supabase
