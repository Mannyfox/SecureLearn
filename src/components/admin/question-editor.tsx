"use client"

import { useState } from "react"
import type { Module, Question } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, PlusCircle, Trash2 } from "lucide-react"

interface QuestionEditorProps {
  modules: Module[]
}

export function QuestionEditor({ modules: initialModules }: QuestionEditorProps) {
  const [modules, setModules] = useState(initialModules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<{moduleId: string, question: Question} | null>(null)

  const handleAddOrUpdateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would be a server action.
    console.log("Form submitted, data would be saved here.")
    setIsDialogOpen(false)
    setEditingQuestion(null)
    // Here you would refresh the data from the server.
  }

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {modules.map((module) => (
          <AccordionItem value={module.id} key={module.id}>
            <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
            <AccordionContent>
              <div className="mb-4 flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
                      <DialogDescription>
                        {editingQuestion ? "Modify the details of this question." : "Fill in the details for the new question."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddOrUpdateQuestion} className="grid gap-4 py-4">
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="questionText" className="text-right">Question</Label>
                        <Textarea id="questionText" defaultValue={editingQuestion?.question.questionText} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="option1" className="text-right">Option 1</Label>
                        <Input id="option1" defaultValue={editingQuestion?.question.options[0]} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="option2" className="text-right">Option 2</Label>
                        <Input id="option2" defaultValue={editingQuestion?.question.options[1]} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="option3" className="text-right">Option 3</Label>
                        <Input id="option3" defaultValue={editingQuestion?.question.options[2]} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="correctAnswer" className="text-right">Correct (1-3)</Label>
                        <Input id="correctAnswer" type="number" min="1" max="3" defaultValue={editingQuestion ? editingQuestion.question.correctAnswerIndex + 1 : 1} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="explanation" className="text-right">Explanation</Label>
                        <Textarea id="explanation" defaultValue={editingQuestion?.question.explanation} className="col-span-3" />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Question</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {module.questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">{q.questionText}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingQuestion({moduleId: module.id, question: q}); setIsDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
