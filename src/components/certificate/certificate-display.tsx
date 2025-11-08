"use client"

import { format } from "date-fns"
import type { Certificate, User } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Printer } from "lucide-react"
import { ApfelkisteLogo } from "@/components/apfelkiste-logo"

interface CertificateDisplayProps {
  user: User
  certificate: Certificate
}

export function CertificateDisplay({ user, certificate }: CertificateDisplayProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 print:shadow-none print:border-none">
        <CardContent className="p-0">
          <div className="relative border-4 border-primary p-6 md:p-10 text-center flex flex-col items-center justify-center space-y-6 aspect-[1.414/1] print:aspect-auto">
            <div className="absolute top-4 right-4 print:hidden">
              <Button onClick={handlePrint} variant="ghost" size="icon">
                <Printer className="h-5 w-5" />
                <span className="sr-only">Zertifikat drucken</span>
              </Button>
            </div>
            
            <ApfelkisteLogo className="h-20 w-20 text-primary" />

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-secondary">
                Abschlusszertifikat
              </h1>
              <p className="text-muted-foreground">Dieses Zertifikat wird voller Stolz verliehen an</p>
            </div>

            <p className="text-4xl sm:text-5xl md:text-6xl font-headline text-primary -rotate-3 transform">
              {user.name}
            </p>

            <p className="max-w-prose">
              für den erfolgreichen Abschluss der jährlichen Sicherheitsschulung von Apfelkiste SecureLearn.
            </p>

            <div className="flex flex-col sm:flex-row justify-around items-center w-full pt-8 text-sm">
                <div className="flex flex-col items-center">
                    <p className="font-semibold">{format(certificate.issuedAt, "d. MMMM yyyy")}</p>
                    <div className="h-px w-24 bg-border my-1"></div>
                    <p className="text-muted-foreground">Ausstellungsdatum</p>
                </div>
                <div className="flex flex-col items-center my-4 sm:my-0">
                    <Award className="h-10 w-10 text-primary"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-semibold">{format(certificate.expiresAt, "d. MMMM yyyy")}</p>
                    <div className="h-px w-24 bg-border my-1"></div>
                    <p className="text-muted-foreground">Gültig bis</p>
                </div>
            </div>

            <p className="text-xs text-muted-foreground absolute bottom-4">
                Zertifikat-ID: {certificate.id}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
