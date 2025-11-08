"use client"

import { useState } from "react"
import type { Module, Question } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuizClientProps {
  module: Module
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect'

export function QuizClient({ module }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered')
  const [score, setScore] = useState(0)
  const [isQuizFinished, setIsQuizFinished] = useState(false)

  const currentQuestion: Question = module.questions[currentQuestionIndex]
  const progressPercentage = ((currentQuestionIndex + 1) / module.questions.length) * 100

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return
    
    if (selectedAnswer === currentQuestion.correctAnswerIndex) {
      setAnswerState('correct')
      setScore(score + 1)
    } else {
      setAnswerState('incorrect')
    }
  }

  const handleNextQuestion = () => {
    setAnswerState('unanswered')
    setSelectedAnswer(null)
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsQuizFinished(true)
      // In a real app, a server action would save the progress here.
      console.log(`Quiz finished! Final score: ${score}/${module.questions.length}`)
    }
  }
  
  if (isQuizFinished) {
    const finalScore = (score / module.questions.length) * 100
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">Quiz abgeschlossen!</CardTitle>
                <CardDescription>Modul: {module.title}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-lg">Ihre Punktzahl:</p>
                <p className="text-6xl font-bold text-primary">{finalScore.toFixed(0)}%</p>
                <p className="text-muted-foreground">{score} von {module.questions.length} richtig</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <a href="/dashboard">Zurück zum Dashboard</a>
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
        <Progress value={progressPercentage} className="w-full"/>
        <Card>
          <CardHeader>
            <CardTitle>Frage {currentQuestionIndex + 1} von {module.questions.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{currentQuestion.questionText}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
              disabled={answerState !== 'unanswered'}
            >
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 rounded-md border p-4 transition-colors",
                    answerState !== 'unanswered' && index === currentQuestion.correctAnswerIndex && "border-green-500 bg-green-50 dark:bg-green-900/20",
                    answerState === 'incorrect' && index === selectedAnswer && "border-red-500 bg-red-50 dark:bg-red-900/20"
                  )}
                >
                  <RadioGroupItem value={index.toString()} id={`r${index}`} />
                  <Label htmlFor={`r${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            {answerState === 'unanswered' ? (
              <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>Antwort prüfen</Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < module.questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
              </Button>
            )}

            {answerState === 'correct' && (
              <Alert className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Richtig!</AlertTitle>
                <AlertDescription>{currentQuestion.explanation}</AlertDescription>
              </Alert>
            )}

            {answerState === 'incorrect' && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Falsch</AlertTitle>
                <AlertDescription>{currentQuestion.explanation}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
    </div>
  )
}
