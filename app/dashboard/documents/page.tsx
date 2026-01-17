import { UploadButton } from "@/components/documents/upload-button"
import { DocumentList } from "@/components/documents/document-list"

export default function DocumentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
                    <p className="text-muted-foreground mt-2">Manage and analyze your compliance documents.</p>
                </div>
                <UploadButton />
            </div>

            <DocumentList />
        </div>
    )
}
