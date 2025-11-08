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
import { Edit, PlusCircle, Trash2, Wand2, Loader2, Info } from "lucide-react"
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useFirestore, setDocumentNonBlocking } from "@/firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"


interface QuestionEditorProps {
  modules: Module[];
  policyTextForGeneration: string;
}

export function QuestionEditor({ modules: initialModules, policyTextForGeneration }: QuestionEditorProps) {
  const firestore = useFirestore();
  const [modules, setModules] = useState(initialModules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<{moduleId: string, question: Question} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetModule, setTargetModule] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddOrUpdateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;
    
    const formData = new FormData(e.currentTarget);
    const moduleId = editingQuestion?.moduleId || targetModule;
    if (!moduleId) return;

    const questionData: Question = {
      id: editingQuestion?.question.id || `q${Date.now()}`,
      questionText: formData.get('questionText') as string,
      options: [
        formData.get('option1') as string,
        formData.get('option2') as string,
        formData.get('option3') as string,
      ],
      correctAnswerIndex: parseInt(formData.get('correctAnswer') as string) - 1,
      explanation: formData.get('explanation') as string,
    };

    const moduleRef = doc(firestore, "modules", moduleId);

    try {
      if (editingQuestion) {
        // This is complex. You need to remove the old question and add the new one.
        // For simplicity, we'll just update in place if the ID matches.
        // A better way would be a server-side transaction.
        const moduleDoc = modules.find(m => m.id === moduleId);
        const updatedQuestions = moduleDoc?.questions.map(q => q.id === questionData.id ? questionData : q) || [];
        await updateDoc(moduleRef, { questions: updatedQuestions });
      } else {
        await updateDoc(moduleRef, {
          questions: arrayUnion(questionData)
        });
      }

      toast({
        title: "Erfolg!",
        description: "Die Frage wurde gespeichert.",
      });
      // You'd typically refetch data here. For now, we manually update state.
      setModules(prevModules => prevModules.map(m => {
        if (m.id === moduleId) {
          let newQuestions: Question[];
          if(editingQuestion) {
            newQuestions = m.questions.map(q => q.id === questionData.id ? questionData : q);
          } else {
            newQuestions = [...m.questions, questionData];
          }
          return { ...m, questions: newQuestions };
        }
        return m;
      }));


    } catch(error) {
       console.error("Error saving question:", error);
       toast({ variant: "destructive", title: "Fehler", description: "Frage konnte nicht gespeichert werden." });
    }

    setIsDialogOpen(false)
    setEditingQuestion(null)
  }
  
  const handleDeleteQuestion = async (moduleId: string, questionId: string) => {
    if (!firestore) return;
    const moduleRef = doc(firestore, "modules", moduleId);
    const questionToRemove = modules.find(m => m.id === moduleId)?.questions.find(q => q.id === questionId);
    
    if (!questionToRemove) return;

    try {
      await updateDoc(moduleRef, {
        questions: arrayRemove(questionToRemove)
      });
       toast({ title: "Gelöscht", description: "Die Frage wurde entfernt." });
       // Manual state update
       setModules(prevModules => prevModules.map(m => {
        if (m.id === moduleId) {
          return { ...m, questions: m.questions.filter(q => q.id !== questionId) };
        }
        return m;
      }));
    } catch(error) {
      console.error("Error deleting question:", error);
      toast({ variant: "destructive", title: "Fehler", description: "Frage konnte nicht gelöscht werden." });
    }
  }

  const handleGenerateQuestions = async () => {
    if (!policyTextForGeneration || !targetModule || !firestore) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte wählen Sie ein Zielmodul aus. Der Richtlinientext muss im 'Richtlinien'-Tab gespeichert sein.",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateQuestionsFromText({ documentContent: policyTextForGeneration })
      const moduleRef = doc(firestore, "modules", targetModule);
      
      const questionsWithIds = result.questions.map(q => ({...q, id: `q${Date.now()}-${Math.random()}`}));
      
      await updateDoc(moduleRef, {
        questions: arrayUnion(...questionsWithIds)
      });
      
      setModules(prevModules => prevModules.map(m => {
        if (m.id === targetModule) {
          return { ...m, questions: [...m.questions, ...questionsWithIds] };
        }
        return m;
      }));

      toast({
        title: "Fragen generiert!",
        description: `${result.questions.length} neue Fragen wurden für das ausgewählte Modul erstellt und gespeichert.`,
      })

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
            Wählen Sie ein Zielmodul und lassen Sie die KI automatisch Quizfragen aus dem im Tab "Richtlinien" gespeicherten Text erstellen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {policyTextForGeneration.length < 50 && (
             <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Kein Richtlinientext gefunden</AlertTitle>
                <AlertDescription>
                  Es scheint, als wäre kein Text im "Richtlinien"-Tab gespeichert. Bitte fügen Sie dort zuerst Ihre Richtlinien ein, um Fragen generieren zu können.
                </AlertDescription>
              </Alert>
           )}
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
            <Button onClick={handleGenerateQuestions} disabled={isGenerating || !policyTextForGeneration || !targetModule} className="w-full sm:w-auto">
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
        <Accordion type="single" collapsible className="w-full" defaultValue={modules[0]?.id}>
          {modules.map((module) => (
            <AccordionItem value={module.id} key={module.id}>
              <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 flex justify-end">
                  <Dialog open={isDialogOpen && editingQuestion?.moduleId !== module.id} onOpenChange={(isOpen) => { if (!isOpen) setEditingQuestion(null); setIsDialogOpen(isOpen); }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingQuestion(null); setTargetModule(module.id); setIsDialogOpen(true); }}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Frage hinzufügen
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleAddOrUpdateQuestion}>
                        <DialogHeader>
                          <DialogTitle>{editingQuestion ? "Frage bearbeiten" : "Neue Frage hinzufügen"}</DialogTitle>
                          <DialogDescription>
                            {editingQuestion ? "Ändern Sie die Details dieser Frage." : `Füllen Sie die Details für die neue Frage im Modul "${module.title}" aus.`}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="questionText" className="text-right">Frage</Label>
                            <Textarea id="questionText" name="questionText" defaultValue={editingQuestion?.question.questionText} className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="option1" className="text-right">Option 1</Label>
                            <Input id="option1" name="option1" defaultValue={editingQuestion?.question.options[0]} className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="option2" className="text-right">Option 2</Label>
                            <Input id="option2" name="option2" defaultValue={editingQuestion?.question.options[1]} className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="option3" className="text-right">Option 3</Label>
                            <Input id="option3" name="option3" defaultValue={editingQuestion?.question.options[2]} className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="correctAnswer" className="text-right">Korrekt (1-3)</Label>
                            <Input id="correctAnswer" name="correctAnswer" type="number" min="1" max="3" defaultValue={editingQuestion ? editingQuestion.question.correctAnswerIndex + 1 : 1} className="col-span-3" />
                          </div>
                           <div className="grid gridcols-4 items-center gap-4">
                            <Label htmlFor="explanation" className="text-right">Erklärung</Label>
                            <Textarea id="explanation" name="explanation" defaultValue={editingQuestion?.question.explanation} className="col-span-3" />
                          </div>
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
                    {module.questions?.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="font-medium">{q.questionText}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingQuestion({moduleId: module.id, question: q}); setIsDialogOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteQuestion(module.id, q.id)}>
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
