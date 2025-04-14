import type { Metadata } from "next"
import CreatePropertyForm from "@/components/admin/create-property-form"

export const metadata: Metadata = {
  title: "Crear Nueva Propiedad",
  description: "Formulario para crear una nueva propiedad inmobiliaria",
}

export default function CreatePage() {
  return <CreatePropertyForm />
}