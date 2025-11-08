import { QuestionEditor } from "@/components/admin/question-editor"
import { mockModules } from "@/lib/mock-data"

export default function AdminQuestionsPage() {
  // In a real app, you'd fetch this from a database.
  const modules = mockModules

  return (
    <div>
      <QuestionEditor modules={modules} />
    </div>
  )
}
