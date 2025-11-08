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
import { Edit, PlusCircle, Trash2, Wand2, Loader2 } from "lucide-react"
import { generateQuestionsFromText } from "@/ai/flows/generate-questions-flow"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface QuestionEditorProps {
  modules: Module[];
  initialPolicyText?: string;
}

export function QuestionEditor({ modules: initialModules, initialPolicyText = "" }: QuestionEditorProps) {
  const [modules, setModules] = useState(initialModules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<{moduleId: string, question: Question} | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [policyText, setPolicyText] = useState(initialPolicyText)
  const [targetModule, setTargetModule] = useState<string | null>(null)
  const { toast } = useToast()

  const handleAddOrUpdateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would be a server action.
    console.log("Form submitted, data would be saved here.")
    toast({
      title: "Erfolg!",
      description: "Die Frage wurde gespeichert. (Simulation)",
    });
    setIsDialogOpen(false)
    setEditingQuestion(null)
    // Here you would refresh the data from the server.
  }

  const handleGenerateQuestions = async () => {
    if (!policyText || !targetModule) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte fügen Sie Richtlinientext ein und wählen Sie ein Zielmodul aus.",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateQuestionsFromText({ documentContent: policyText })
      
      // In a real app, you would save these new questions to the database for the target module.
      // For this demo, we'll just log them and show a success toast.
      console.log("Generated Questions:", result.questions)

      toast({
        title: "Fragen generiert!",
        description: `${result.questions.length} neue Fragen wurden erstellt. (Simulation - wird nicht gespeichert)`,
      })
      // We don't clear the policy text anymore so user can re-generate for other modules.

    } catch (error) {
      console.error("Error generating questions:", error)
      toast({
        variant: "destructive",
        title: "Fehler bei der Generierung",
        description: "Die Fragen konnten nicht erstellt werden. Bitte versuchen Sie es später erneut.",
      })
    } finally {
      setIsGenerating(false)
    }
  }


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Fragen aus Richtlinien generieren (KI)</CardTitle>
          <CardDescription>
            Fügen Sie den Inhalt Ihrer im Tab "Richtlinien" gespeicherten Richtlinien ein, wählen Sie das Zielmodul und lassen Sie die KI automatisch Quizfragen erstellen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Fügen Sie hier Ihre Richtlinientexte ein..."
            className="min-h-[200px]"
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            disabled={isGenerating}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={setTargetModule} disabled={isGenerating}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Zielmodul auswählen" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module.id} value={module.id}>{module.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateQuestions} disabled={isGenerating || !policyText || !targetModule} className="w-full sm:w-auto">
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Fragen generieren
            </Button>
          </div>
        </CardContent>
      </Card>


      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Bestehende Fragen verwalten</h2>
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module) => (
            <AccordionItem value={module.id} key={module.id}>
              <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 flex justify-end">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingQuestion(null)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Frage hinzufügen
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{editingQuestion ? "Frage bearbeiten" : "Neue Frage hinzufügen"}</DialogTitle>
                        <DialogDescription>
                          {editingQuestion ? "Ändern Sie die Details dieser Frage." : "Füllen Sie die Details für die neue Frage aus."}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddOrUpdateQuestion} className="grid gap-4 py-4">
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="questionText" className="text-right">Frage</Label>
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
                          <Label htmlFor="correctAnswer" className="text-right">Korrekt (1-3)</Label>
                          <Input id="correctAnswer" type="number" min="1" max="3" defaultValue={editingQuestion ? editingQuestion.question.correctAnswerIndex + 1 : 1} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="explanation" className="text-right">Erklärung</Label>
                          <Textarea id="explanation" defaultValue={editingQuestion?.question.explanation} className="col-span-3" />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Frage speichern</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Frage</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
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
    </div>
  )
}
