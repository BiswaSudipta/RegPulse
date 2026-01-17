export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            documents: {
                Row: {
                    id: string
                    user_id: string
                    title: string | null
                    file_path: string
                    status: string
                    risk_score: number
                    summary: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title?: string | null
                    file_path: string
                    status?: string
                    risk_score?: number
                    summary?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string | null
                    file_path?: string
                    status?: string
                    risk_score?: number
                    summary?: string | null
                    created_at?: string
                }
            }
            chats: {
                Row: {
                    id: string
                    user_id: string
                    title: string | null
                    document_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title?: string | null
                    document_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string | null
                    document_id?: string | null
                    created_at?: string
                }
            }
            messages: {
                Row: {
                    id: string
                    chat_id: string
                    role: string
                    content: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    chat_id: string
                    role: string
                    content: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    chat_id?: string
                    role?: string
                    content?: string
                    created_at?: string
                }
            }
        }
    }
}
