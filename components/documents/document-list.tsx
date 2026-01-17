"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { FileText, Loader2, CheckCircle, AlertTriangle } from "lucide-react"

interface Document {
    id: string
    title: string
    status: string
    created_at: string
}

export function DocumentList() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchDocuments = async () => {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error && data) {
                setDocuments(data)
            }
            setLoading(false)
        }

        fetchDocuments()

        // Realtime subscription
        const channel = supabase
            .channel('realtime documents')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' }, (payload) => {
                fetchDocuments()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
    }

    if (documents.length === 0) {
        return <div className="text-center p-8 text-muted-foreground">No documents found. Upload one to get started.</div>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-2 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 font-semibold truncate">
                            <FileText className="h-5 w-5 text-blue-500" />
                            {doc.title}
                        </div>
                        {doc.status === 'compliant' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : doc.status === 'non_compliant' ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : (
                            <div className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">{doc.status}</div>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {new Date(doc.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    )
}
