"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  FileText,
  Truck,
  Home,
  Settings,
  LogOut,
  Navigation,
  Store,
  Refrigerator,
  Euro,
} from "lucide-react"

export default function MobileFieldApp() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentView, setCurrentView] = useState("login")
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  // Benutzer
  const users = {
    admin: { name: "Administrator", role: "Admin", specialization: "System Verwaltung" },
    kay: { name: "Kay", role: "Monteur", specialization: "" },
    sebastian: { name: "Sebastian", role: "Monteur", specialization: "" },
    denis: { name: "Denis", role: "Monteur", specialization: "" },
    subunternehmer: { name: "Subunternehmer", role: "Monteur", specialization: "" },
  }

  // Anmeldung
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users[loginForm.username as keyof typeof users]
    if (user && loginForm.password === "123456") {
      setCurrentUser({ ...user, username: loginForm.username })
      setCurrentView("dashboard")
    } else {
      alert("Falscher Benutzername oder Passwort!")
    }
  }

  // Anmeldebildschirm
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-blue-800 text-white rounded-t-lg">
              <div className="text-2xl font-bold mb-2">HB MONTAGESERVICE</div>
              <CardTitle className="text-lg">MONTAGESERVICE</CardTitle>
              <p className="text-blue-100 text-sm">In der Wisch 1-3, 28205 Bremen - v1.0</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <select
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Benutzer wählen...</option>
                    <option value="admin">🛡️ Administrator</option>
                    <option value="kay">Kay</option>
                    <option value="sebastian">Sebastian</option>
                    <option value="denis">Denis</option>
                    <option value="subunternehmer">Subunternehmer</option>
                  </select>
                </div>
                <div>
                  <Input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Passwort"
                    className="text-lg p-4"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-4">
                  Anmelden
                </Button>
              </form>
              <div className="mt-4 text-xs text-gray-500 text-center">Demo-Passwort: 123456</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">HB MONTAGESERVICE</h1>
            <p className="text-blue-100 text-sm">{currentUser.name}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                setCurrentUser(null)
                setCurrentView("login")
              }}
              className="p-2 rounded-full bg-blue-700 hover:bg-blue-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">HEUTE</h2>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {new Date().toLocaleDateString("de-DE")}
          </Badge>
        </div>

        {/* Beispiel Aufträge */}
        <div className="space-y-4">
          <Card className="shadow-lg border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-blue-800 mr-3">08:00</div>
                  <div>
                    <h3 className="font-bold text-lg">Kühlschrank + Geschirrspüler Einbau</h3>
                    <p className="text-gray-600">Familie Müller</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-blue-600 font-medium">#HB-2024-001234</p>
                      <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                        <div className="flex items-center">
                          <Refrigerator className="h-4 w-4 mr-2" />
                          Kühlschränke
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Wartend</Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Store className="h-4 w-4 mr-2" />
                  <span>HB Montageservice</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Hauptstraße 15, 28876 Oyten</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    <span>12,3 km</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <Euro className="h-4 w-4 mr-1" />
                    <span>Preis auf Anfrage</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 bg-blue-50 rounded">
                <p className="text-xs font-medium text-blue-800 mb-1">Servicepakete:</p>
                <div className="text-xs text-blue-700">
                  Side-by-Side Kühlschrank Samsung, Einbau-Geschirrspüler Bosch, Wasseranschluss-Kit
                </div>
                <p className="text-xs font-semibold text-blue-800 mt-1">Preis auf Anfrage</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 flex-1">
                  <Truck className="h-4 w-4 mr-1" />
                  Losfahren
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <Card className="mt-6 bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-orange-600 mb-3">🚗 KM-BERECHNUNG</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Erste 30 km:</span>
                <span className="font-semibold text-green-600">INKLUSIVE</span>
              </div>
              <div className="flex justify-between">
                <span>Ab 30 km:</span>
                <span className="font-semibold text-orange-600">Preis auf Anfrage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-blue-800 mb-3">🔧 MONTAGESERVICE</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>• Kühlschrank Einbau</div>
              <div>• Waschmaschine Anschluss</div>
              <div>• Geschirrspüler Einbau</div>
              <div>• TV Wandmontage</div>
              <div>• Trockner Installation</div>
              <div>• Mikrowelle Einbau</div>
            </div>
            <div className="mt-3 text-center">
              <p className="font-medium">In der Wisch 1-3, 28205 Bremen</p>
              <p className="font-medium">042189782524</p>
              <p className="font-medium">hansa@bremer-montageservice.de</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-blue-800">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Heute</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Kalender</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <FileText className="h-6 w-6" />
            <span className="text-xs mt-1">Berichte</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Einstellungen</span>
          </button>
        </div>
      </div>
    </div>
  )
}
