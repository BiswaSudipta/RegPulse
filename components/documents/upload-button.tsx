"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function UploadButton() {
    const [uploading, setUploading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('compliance-docs')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Insert into documents table
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: docData, error: dbError } = await supabase
                    .from('documents')
                    .insert({
                        user_id: user.id,
                        title: file.name,
                        file_path: filePath,
                        status: 'uploaded',
                    })
                    .select()
                    .single()

                if (dbError) throw dbError
            }
            router.refresh()
        } catch (error) {
            alert('Error uploading file!')
            console.log(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex items-center gap-4">
            <Button disabled={uploading} asChild variant="default">
                <label className="cursor-pointer">
                    {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Document
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            </Button>
        </div>
    )
}
