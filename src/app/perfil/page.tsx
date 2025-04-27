"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedPage } from "@/components/protected-page"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user-context"
import { toast } from "sonner"
import { Camera, LogOut, Mail, Phone, Save, UserIcon } from "lucide-react"

export default function PerfilPage() {
  const router = useRouter()
  const { user, token, logoutUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: user?.name || "",
    apellido: user?.lastName || "",
    email: user?.email || "",
    telefono: user?.phone || "",
  })

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función para guardar los cambios
  const handleSave = async () => {
    try {
      setIsLoading(true)

      // Aquí iría la llamada a la API para actualizar los datos
      // Por ejemplo: await updateUserProfile(formData, token)

      // Simulamos un delay para la demostración
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Perfil actualizado con éxito")
      setIsEditing(false)
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
      toast.error("Error al actualizar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    logoutUser()
    router.push("/login")
    toast.success("Sesión cerrada con éxito")
  }

  return (
    <ProtectedPage>
      <div className="container nav_padding mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground mt-2">Gestiona tu información personal y configuración de cuenta</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Columna izquierda - Información del perfil */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    onClick={() => toast.info("Función de cambiar foto no implementada")}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle>
                  {user?.name} {user?.lastName}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user?.email || "No especificado"}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user?.phone || "No especificado"}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Miembro desde {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Columna derecha - Tabs con diferentes secciones */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
                <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
              </TabsList>

              {/* Tab: Información Personal */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal y datos de contacto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input
                          id="apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                          {isLoading ? (
                            "Guardando..."
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Guardar Cambios
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="ml-auto">
                        Editar Información
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Tab: Seguridad */}
              <TabsContent value="seguridad">
                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>Gestiona tu contraseña y la seguridad de tu cuenta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña Actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="text-lg font-medium">Sesiones Activas</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dispositivos donde has iniciado sesión recientemente
                      </p>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">Este dispositivo</p>
                            <p className="text-sm text-muted-foreground">
                              Última actividad: {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Actual
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Actualizar Contraseña</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Tab: Preferencias */}
              <TabsContent value="preferencias">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias</CardTitle>
                    <CardDescription>Personaliza tu experiencia en la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notificaciones</h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones por correo</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe actualizaciones sobre nuevas propiedades
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="email-notifications" className="sr-only">
                            Notificaciones por correo
                          </Label>
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones de ofertas</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones sobre ofertas y promociones
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="offers-notifications" className="sr-only">
                            Notificaciones de ofertas
                          </Label>
                          <input
                            type="checkbox"
                            id="offers-notifications"
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Preferencias de Búsqueda</h3>

                      <div className="space-y-2">
                        <Label htmlFor="default-location">Ubicación Predeterminada</Label>
                        <Input id="default-location" defaultValue="Maldonado" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price-range">Rango de Precio</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input id="min-price" placeholder="Mínimo" type="number" />
                          <Input id="max-price" placeholder="Máximo" type="number" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Guardar Preferencias</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sección de Actividad Reciente */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Actividad Reciente</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Propiedades Guardadas</CardTitle>
                <CardDescription>Propiedades que has guardado para ver más tarde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No has guardado ninguna propiedad aún</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/propiedades")}>
                  Ver Propiedades
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propiedades Visitadas</CardTitle>
                <CardDescription>Propiedades que has visitado recientemente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No has visitado ninguna propiedad aún</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/propiedades")}>
                  Explorar Propiedades
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultas Realizadas</CardTitle>
                <CardDescription>Consultas que has realizado sobre propiedades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No has realizado ninguna consulta aún</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/contacto")}>
                  Contactar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}
