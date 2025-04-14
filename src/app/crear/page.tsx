'use client'

import type { Metadata } from "next"
import CreatePropertyForm from "@/components/admin/create-property-form"

export const metadata: Metadata = {
  title: "Crear Nueva Propiedad",
  description: "Formulario para crear una nueva propiedad inmobiliaria",
}

export default function CreatePropertyPage() {
  return (
    <div className="container nav_padding mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Crear Nueva Propiedad</h1>
        <p className="text-muted-foreground mt-2">Complete el formulario para añadir una nueva propiedad al sistema.</p>
      </div>

      <CreatePropertyForm />
    </div>
  )
}
