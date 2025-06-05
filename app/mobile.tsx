"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  CheckCircle,
  Calendar,
  FileText,
  Truck,
  Home,
  Settings,
  LogOut,
  Navigation,
  Store,
  Zap,
  Refrigerator,
  Euro,
  Download,
  Share,
  ArrowLeft,
  Camera,
  User,
  Phone,
  Plus,
  Edit,
  Trash2,
  Users,
  Shield,
  Tv,
  Microwave,
  Waves,
  Droplets,
} from "lucide-react"

// InvoiceModals component'ini burada tanımla
function InvoiceModals({
  showInvoiceList,
  setShowInvoiceList,
  showInvoiceModal,
  setShowInvoiceModal,
  selectedInvoice,
  setSelectedInvoice,
  dailyInvoices,
  currentUser,
}: any) {
  if (!showInvoiceList && !showInvoiceModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Rechnungen</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Rechnungsliste wird hier angezeigt...</p>
          <Button
            onClick={() => {
              setShowInvoiceList(false)
              setShowInvoiceModal(false)
            }}
          >
            Schließen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Beyaz Eşya Paket Fiyatları (Netto)
const applianceServicePrices = {
  "Standard Lieferung": 49, // netto
  "Standard Lieferung + 2 Geräte": 69, // netto
  "Standard Lieferung + 3 Geräte": 89, // netto
  "Komfort Lieferung": 79, // netto
  "Komfort Lieferung + 2 Geräte": 109, // netto
  "Komfort Lieferung + 3 Geräte": 139, // netto
  "Komfort Lieferung + 4 Geräte": 169, // netto
  "Premium Lieferung": 109, // netto
  "Premium Lieferung + 2 Geräte": 149, // netto
  "Premium Lieferung + 3 Geräte": 189, // netto
  "Premium Lieferung + 4 Geräte": 229, // netto
  "Premium Lieferung + 5 Geräte": 269, // netto
  "Side-by-Side Lieferung": 149, // netto
  "Side-by-Side Lieferung + Zusatzgerät": 179, // netto
  "Einbau Service": 109, // netto (aktualisiert von 89€)
  "Einbau Service + 2 Geräte": 159, // netto
  "Einbau Service + 3 Geräte": 209, // netto
  "Anschluss Service": 79, // netto (aktualisiert von 59€)
  "Anschluss Service + 2 Geräte": 119, // netto
  "Anschluss Service + 3 Geräte": 159, // netto
}

// Admin Panel Component
function AdminPanel({ currentUser, setCurrentView, customers, setCustomers }: any) {
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    notes: "",
    packages: [] as string[],
  })

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const customer = {
      id: Date.now(),
      ...newCustomer,
      createdAt: new Date().toLocaleDateString("de-DE"),
    }
    setCustomers([...customers, customer])
    setNewCustomer({ name: "", address: "", phone: "", email: "", notes: "", packages: [] })
    setShowAddCustomer(false)
    alert("Kunde erfolgreich hinzugefügt!")
  }

  const deleteCustomer = (id: number) => {
    if (confirm("Kunde wirklich löschen?")) {
      setCustomers(customers.filter((c: any) => c.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-red-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">🛡️ ADMIN PANEL</h1>
            <p className="text-red-100 text-sm">HB Montageservice - {currentUser.name}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="p-2 rounded-full bg-red-700 hover:bg-red-600 mr-2"
            >
              <Home className="h-5 w-5" />
            </button>
            <button onClick={() => setCurrentView("login")} className="p-2 rounded-full bg-red-700 hover:bg-red-600">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gesamt Kunden</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Heute Termine</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aktive Monteure</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kunden Verwaltung */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Kunden Verwaltung</CardTitle>
              <Button onClick={() => setShowAddCustomer(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Neuer Kunde
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer: any) => (
                <div key={customer.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{customer.name}</h3>
                      <p className="text-gray-600">{customer.address}</p>
                      <p className="text-sm text-blue-600">{customer.phone}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                      {customer.notes && <p className="text-sm text-gray-700 mt-2">Notizen: {customer.notes}</p>}
                      {customer.packages && customer.packages.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Lieferpakete:</p>
                          <div className="flex flex-wrap gap-1">
                            {customer.packages.map((pkg: string, idx: number) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {pkg}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Neuer Kunde Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Neuer Kunde hinzufügen</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse *</label>
                  <Input
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon *</label>
                  <Input
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notizen</label>
                  <Textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lieferpakete</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                    {Object.entries(applianceServicePrices).map(([packageName, price]) => (
                      <label key={packageName} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newCustomer.packages.includes(packageName)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewCustomer({
                                ...newCustomer,
                                packages: [...newCustomer.packages, packageName],
                              })
                            } else {
                              setNewCustomer({
                                ...newCustomer,
                                packages: newCustomer.packages.filter((p) => p !== packageName),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">
                          {packageName} ({price}€ netto)
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Wählen Sie die gewünschten Lieferpakete für den Kunden</p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Kunde hinzufügen
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddCustomer(false)} className="flex-1">
                    Abbrechen
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Kalender Component
function CalendarView({ currentUser, setCurrentView, setCurrentUser }: any) {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  // Wochentermine - Beispieldaten für die ganze Woche
  const weeklyTasks = [
    // Montag
    {
      id: 101,
      date: "2024-12-09",
      time: "09:00",
      customer: "Familie Weber",
      address: "Musterstraße 12, 28195 Bremen",
      phone: "+49 421 123456",
      service: "Kühlschrank + Gefrierschrank Lieferung",
      assignedTo: "Kay",
      status: "Geplant",
      category: "Kühlschränke",
      orderNumber: "HB-2024-001240",
    },
    {
      id: 102,
      date: "2024-12-09",
      time: "14:00",
      customer: "Herr Müller",
      address: "Bahnhofstraße 45, 28203 Bremen",
      phone: "+49 421 234567",
      service: "Waschmaschine + Trockner Anschluss",
      assignedTo: "Sebastian",
      status: "Geplant",
      category: "Waschmaschinen",
      orderNumber: "HB-2024-001241",
    },
    // Dienstag
    {
      id: 103,
      date: "2024-12-10",
      time: "08:30",
      customer: "Familie Schmidt",
      address: "Osterstraße 78, 28199 Bremen",
      phone: "+49 421 345678",
      service: "Komplette Küchengeräte (4 Geräte)",
      assignedTo: "Denis",
      status: "Geplant",
      category: "Geschirrspüler",
      orderNumber: "HB-2024-001242",
    },
    {
      id: 104,
      date: "2024-12-10",
      time: "11:00",
      customer: "Frau Hansen",
      address: "Werdersee 23, 28199 Bremen",
      phone: "+49 421 456789",
      service: "TV + Soundbar + Receiver",
      assignedTo: "Subunternehmer",
      status: "Geplant",
      category: "TV & Audio",
      orderNumber: "HB-2024-001243",
    },
    {
      id: 105,
      date: "2024-12-10",
      time: "15:30",
      customer: "Familie Becker",
      address: "Schwachhauser Ring 15, 28209 Bremen",
      phone: "+49 421 567890",
      service: "Mikrowelle + Backofen Einbau",
      assignedTo: "Kay",
      status: "Geplant",
      category: "Mikrowellen",
      orderNumber: "HB-2024-001244",
    },
    // Mittwoch
    {
      id: 106,
      date: "2024-12-11",
      time: "10:00",
      customer: "Herr Wagner",
      address: "Findorffstraße 89, 28215 Bremen",
      phone: "+49 421 678901",
      service: "Side-by-Side + Weinkühlschrank",
      assignedTo: "Sebastian",
      status: "Geplant",
      category: "Kühlschränke",
      orderNumber: "HB-2024-001245",
    },
    {
      id: 107,
      date: "2024-12-11",
      time: "13:00",
      customer: "Familie Klein",
      address: "Neustadt 34, 28199 Bremen",
      phone: "+49 421 789012",
      service: "Waschmaschine + Trockner + Geschirrspüler",
      assignedTo: "Denis",
      status: "Geplant",
      category: "Waschmaschinen",
      orderNumber: "HB-2024-001246",
    },
    // Donnerstag
    {
      id: 108,
      date: "2024-12-12",
      time: "09:30",
      customer: "Herr Fischer",
      address: "Vegesack 67, 28757 Bremen",
      phone: "+49 421 890123",
      service: "Geschirrspüler + Mikrowelle + Backofen",
      assignedTo: "Kay",
      status: "Geplant",
      category: "Geschirrspüler",
      orderNumber: "HB-2024-001247",
    },
    {
      id: 109,
      date: "2024-12-12",
      time: "14:30",
      customer: "Familie Richter",
      address: "Huchting 12, 28259 Bremen",
      phone: "+49 421 901234",
      service: "Smart TV + Soundbar + Subwoofer + Receiver",
      assignedTo: "Subunternehmer",
      status: "Geplant",
      category: "TV & Audio",
      orderNumber: "HB-2024-001248",
    },
    // Freitag
    {
      id: 110,
      date: "2024-12-13",
      time: "08:00",
      customer: "Herr Lange",
      address: "Blumenthal 45, 28779 Bremen",
      phone: "+49 421 012345",
      service: "Waschmaschine + Trockner Reparatur",
      assignedTo: "Sebastian",
      status: "Geplant",
      category: "Waschmaschinen",
      orderNumber: "HB-2024-001249",
    },
    {
      id: 111,
      date: "2024-12-13",
      time: "11:30",
      customer: "Familie Krause",
      address: "Borgfeld 78, 28357 Bremen",
      phone: "+49 421 123450",
      service: "Kühl-Gefrier-Kombination + Weinkühlschrank + Gefriertruhe",
      assignedTo: "Denis",
      status: "Geplant",
      category: "Kühlschränke",
      orderNumber: "HB-2024-001250",
    },
    {
      id: 112,
      date: "2024-12-13",
      time: "16:00",
      customer: "Herr Schulz",
      address: "Obervieland 23, 28277 Bremen",
      phone: "+49 421 234501",
      service: "Mikrowelle + Dampfgarer Reparatur",
      assignedTo: "Kay",
      status: "Geplant",
      category: "Mikrowellen",
      orderNumber: "HB-2024-001251",
    },
  ]

  // Woche berechnen
  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Montag als Wochenstart
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getWeekDays(currentWeek)
  const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

  // Termine für einen bestimmten Tag filtern
  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return weeklyTasks.filter(
      (task) => task.date === dateStr && (currentUser.username === "admin" || task.assignedTo === currentUser.name),
    )
  }

  // Vorherige/Nächste Woche
  const previousWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() - 7)
    setCurrentWeek(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + 7)
    setCurrentWeek(newDate)
  }

  // Kategori renkleri ve ikonları - Beyaz Eşya
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "Kühlschränke":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Refrigerator className="h-4 w-4 mr-2" />,
        }
      case "Waschmaschinen":
        return {
          color: "bg-green-100 text-green-800",
          icon: <Waves className="h-4 w-4 mr-2" />,
        }
      case "Geschirrspüler":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <Droplets className="h-4 w-4 mr-2" />,
        }
      case "TV & Audio":
        return {
          color: "bg-orange-100 text-orange-800",
          icon: <Tv className="h-4 w-4 mr-2" />,
        }
      case "Mikrowellen":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Microwave className="h-4 w-4 mr-2" />,
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Home className="h-4 w-4 mr-2" />,
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">WOCHENKALENDER</h1>
            <p className="text-blue-100 text-sm">{currentUser.name}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 mr-2"
            >
              <Home className="h-5 w-5" />
            </button>
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

      <div className="p-4 pb-20">
        {/* Wochennavigation */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={previousWeek}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Vorherige Woche
              </Button>
              <div className="text-center">
                <h2 className="font-bold text-lg">
                  {weekDays[0].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })} -{" "}
                  {weekDays[6].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                </h2>
                <p className="text-sm text-gray-600">
                  KW {Math.ceil((weekDays[0].getDate() - weekDays[0].getDay() + 1) / 7)}
                </p>
              </div>
              <Button variant="outline" onClick={nextWeek}>
                Nächste Woche
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wochenübersicht */}
        <div className="grid grid-cols-1 gap-4">
          {weekDays.map((day, index) => {
            const tasksForDay = getTasksForDate(day)
            const isToday = day.toDateString() === new Date().toDateString()
            const isWeekend = index >= 5

            return (
              <Card
                key={index}
                className={`${isToday ? "border-blue-500 border-2" : ""} ${isWeekend ? "bg-gray-100" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold ${isToday ? "text-blue-600" : ""}`}>
                        {dayNames[index]} - {day.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                      </h3>
                      {isToday && <Badge className="bg-blue-100 text-blue-800 text-xs">Heute</Badge>}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tasksForDay.length} Termine
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {tasksForDay.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">Keine Termine</p>
                  ) : (
                    <div className="space-y-2">
                      {tasksForDay.map((task) => (
                        <div key={task.id} className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-blue-600">{task.time}</span>
                                <Badge className={getCategoryInfo(task.category).color} variant="secondary">
                                  <div className="flex items-center text-xs">
                                    {getCategoryInfo(task.category).icon}
                                    {task.category}
                                  </div>
                                </Badge>
                              </div>
                              <h4 className="font-medium">{task.service}</h4>
                              <p className="text-sm text-gray-600">{task.customer}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{task.address}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <User className="h-3 w-3 mr-1" />
                                <span>Monteur: {task.assignedTo}</span>
                              </div>
                              <p className="text-xs text-blue-600 mt-1">#{task.orderNumber}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                {task.status}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    window.open(`tel:${task.phone}`, "_self")
                                  }
                                }}
                                className="text-xs p-1 h-6"
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Wochenstatistiken */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">📊 Wochenstatistiken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Gesamt Termine:</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    weeklyTasks.filter(
                      (task) => currentUser.username === "admin" || task.assignedTo === currentUser.name,
                    ).length
                  }
                </p>
              </div>
              <div>
                <p className="font-medium">Meine Termine:</p>
                <p className="text-2xl font-bold text-green-600">
                  {weeklyTasks.filter((task) => task.assignedTo === currentUser.name).length}
                </p>
              </div>
              <div>
                <p className="font-medium">Heute:</p>
                <p className="text-2xl font-bold text-orange-600">{getTasksForDate(new Date()).length}</p>
              </div>
              <div>
                <p className="font-medium">Diese Woche:</p>
                <p className="text-2xl font-bold text-purple-600">
                  {weekDays.reduce((total, day) => total + getTasksForDate(day).length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-gray-500" onClick={() => setCurrentView("dashboard")}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Heute</span>
          </button>
          <button className="flex flex-col items-center p-2 text-blue-800">
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Kalender</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500" onClick={() => setCurrentView("reports")}>
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

export default function MobileFieldApp() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentView, setCurrentView] = useState("login")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  // PWA Installation
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  // States für Standortverfolgung
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [distances, setDistances] = useState<{ [key: number]: { km: string; cost: string; billableKm: number } }>({})

  // States für Rechnungssystem
  const [dailyInvoices, setDailyInvoices] = useState<{ [key: string]: any }>({})
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showInvoiceList, setShowInvoiceList] = useState(false)

  // Camera states
  const [showCamera, setShowCamera] = useState(false)
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [reportImages, setReportImages] = useState<{ [key: number]: string[] }>({})
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)

  // Customers state
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Familie Müller",
      address: "Hauptstraße 15, 28876 Oyten",
      phone: "+49 4207 123456",
      email: "mueller@email.de",
      notes: "Küche bereits geliefert",
      createdAt: "01.12.2024",
      packages: [],
    },
    {
      id: 2,
      name: "Herr Schmidt",
      address: "Bremer Straße 45, 28717 Bremen",
      phone: "+49 421 987654",
      email: "schmidt@email.de",
      notes: "Nur vormittags erreichbar",
      createdAt: "02.12.2024",
      packages: [],
    },
  ])

  // Benutzer mit Admin
  const users = {
    admin: { name: "Administrator", role: "Admin", specialization: "System Verwaltung" },
    kay: { name: "Kay", role: "Monteur", specialization: "" },
    sebastian: { name: "Sebastian", role: "Monteur", specialization: "" },
    denis: { name: "Denis", role: "Monteur", specialization: "" },
    subunternehmer: { name: "Subunternehmer", role: "Monteur", specialization: "" },
  }

  // Km-Gebühr - nach 30 km
  const kmRate = 0.7 // 0,70€ per km
  // Erste 30 km kostenlos
  const freeKmLimit = 30

  // PWA Installation Handler
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      }
    }
  }, [])

  const installPWA = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === "accepted") {
          setShowInstallPrompt(false)
        }
        setDeferredPrompt(null)
      } catch (error) {
        console.error("PWA installation error:", error)
      }
    }
  }

  // Preisformat-Hilfsfunktion ändern
  const formatPrice = (price: number) => `Preis auf Anfrage`

  // Heutige Aufträge für Beyaz Eşya
  const [todayTasks, setTodayTasks] = useState([
    {
      id: 1,
      time: "08:00",
      customer: "Familie Müller",
      address: "Hauptstraße 15, 28876 Oyten",
      phone: "+49 4207 123456",
      service: "Kühlschrank + Geschirrspüler Einbau",
      status: "Wartend",
      distance: "12,3 km",
      assignedTo: "Kay",
      notes: "Side-by-Side Kühlschrank von Samsung + Einbau-Geschirrspüler. Wasseranschluss erforderlich.",
      packages: [
        { name: "Side-by-Side Kühlschrank Samsung", quantity: 1, price: null },
        { name: "Einbau-Geschirrspüler Bosch", quantity: 1, price: null },
        { name: "Wasseranschluss-Kit", quantity: 1, price: null },
        { name: "Side-by-Side Lieferung + Zusatzgerät", quantity: 1, price: null },
        { name: "Einbau Service + 2 Geräte", quantity: 1, price: null },
      ],
      orderNumber: "HB-2024-001234",
      category: "Kühlschränke",
      warranty: "24 Monate",
      belegNumber: "BEL-2024-001234",
    },
    {
      id: 2,
      time: "11:30",
      customer: "Herr Schmidt",
      address: "Bremer Straße 45, 28717 Bremen",
      phone: "+49 421 987654",
      service: "Waschmaschine + Trockner + Mikrowelle",
      status: "Wartend",
      distance: "45,7 km", // 30 km üzeri
      assignedTo: "Sebastian",
      notes: "Waschmaschine Bosch + Trockner Siemens + Mikrowelle. Komplett-Installation.",
      packages: [
        { name: "Waschmaschine Bosch WAT28400", quantity: 1, price: null },
        { name: "Trockner Siemens WT47W5W0", quantity: 1, price: null },
        { name: "Mikrowelle Samsung", quantity: 1, price: null },
        { name: "Anschluss-Set Komplett", quantity: 1, price: null },
        { name: "Komfort Lieferung + 3 Geräte", quantity: 1, price: null },
        { name: "Anschluss Service + 3 Geräte", quantity: 1, price: null },
      ],
      orderNumber: "HB-2024-001235",
      category: "Waschmaschinen",
      warranty: "24 Monate",
      belegNumber: "BEL-2024-001235",
    },
    {
      id: 3,
      time: "14:00",
      customer: "Familie Weber",
      address: "Dorfstraße 23, 28879 Grasberg",
      phone: "+49 4208 567890",
      service: "Komplette Küchenausstattung",
      status: "Wartend",
      distance: "8,2 km", // 30 km altı
      assignedTo: "Denis",
      notes: "Kühlschrank + Geschirrspüler + Mikrowelle + Backofen. Komplette Küche.",
      packages: [
        { name: "Kühl-Gefrier-Kombination Siemens", quantity: 1, price: null },
        { name: "Einbau-Geschirrspüler Siemens", quantity: 1, price: null },
        { name: "Einbau-Mikrowelle Bosch", quantity: 1, price: null },
        { name: "Einbau-Backofen Bosch", quantity: 1, price: null },
        { name: "Küchenfront-Anpassung", quantity: 1, price: null },
        { name: "Premium Lieferung + 4 Geräte", quantity: 1, price: null },
        { name: "Einbau Service + 3 Geräte", quantity: 1, price: null },
      ],
      orderNumber: "HB-2024-001236",
      category: "Geschirrspüler",
      warranty: "24 Monate",
      belegNumber: "BEL-2024-001236",
    },
    {
      id: 4,
      time: "16:30",
      customer: "Familie Becker",
      address: "Lange Straße 67, 28832 Achim",
      phone: "+49 4202 456789",
      service: "TV + Soundbar + Waschmaschine",
      status: "Wartend",
      distance: "35,4 km", // 30 km üzeri
      assignedTo: "Subunternehmer",
      notes: "75 Zoll TV Samsung + Soundbar + Waschmaschine. Wandhalterung und Anschluss.",
      packages: [
        { name: "TV 75 Zoll Samsung", quantity: 1, price: null },
        { name: "Soundbar Samsung", quantity: 1, price: null },
        { name: "Waschmaschine LG", quantity: 1, price: null },
        { name: "Wandhalterung Premium", quantity: 1, price: null },
        { name: "Kabelverlegung", quantity: 1, price: null },
        { name: "Standard Lieferung + 3 Geräte", quantity: 1, price: null },
        { name: "Anschluss Service + 2 Geräte", quantity: 1, price: null },
      ],
      orderNumber: "HB-2024-001237",
      category: "TV & Audio",
      warranty: "24 Monate",
      belegNumber: "BEL-2024-001237",
    },
  ])

  // Anmeldung
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users[loginForm.username as keyof typeof users]
    if (user && loginForm.password === "123456") {
      setCurrentUser({ ...user, username: loginForm.username })
      if (loginForm.username === "admin") {
        setCurrentView("admin")
      } else {
        setCurrentView("dashboard")
      }
    } else {
      alert("Falscher Benutzername oder Passwort!")
    }
  }

  // Status aktualisieren ve fatura oluştur
  const updateTaskStatus = (taskId: number, newStatus: string) => {
    const updatedTasks = todayTasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus }

        // Rechnung erstellen wenn Auftrag abgeschlossen
        if (newStatus === "Abgeschlossen") {
          const invoice = generateInvoice(updatedTask)
          alert(`Rechnung erstellt: ${invoice.id}`)
        }

        return updatedTask
      }
      return task
    })
    setTodayTasks(updatedTasks)
  }

  // Rechnungserstellung - mit 30 km Regel
  const generateInvoice = (task: any) => {
    const today = new Date().toLocaleDateString("de-DE")
    const distance = distances[task.id]

    const invoice = {
      id: `INV-${task.belegNumber}-${Date.now()}`,
      belegNumber: task.belegNumber,
      date: today,
      customer: task.customer,
      address: task.address,
      orderNumber: task.orderNumber,
      technician: currentUser?.name || "Unknown",
      items: task.packages.map((pkg: any) => ({
        description: `${pkg.quantity}x ${pkg.name}`,
        quantity: pkg.quantity,
        unitPrice: pkg.price || 0,
        totalPrice: (pkg.price || 0) * pkg.quantity,
      })),
      kmCost: distance ? distance.billableKm * kmRate : 0,
      kmDistance: distance ? distance.km : task.distance,
      billableKm: distance ? distance.billableKm : 0,
      freeKm: freeKmLimit,
      subtotal: task.packages.reduce((sum: number, pkg: any) => sum + (pkg.price || 0) * pkg.quantity, 0),
      tax: 0,
      total: 0,
      status: "Erstellt",
      createdAt: new Date().toISOString(),
    }

    // Km-Kosten hinzufügen (nur über 30 km)
    invoice.subtotal += invoice.kmCost
    invoice.tax = invoice.subtotal * 0.19 // 19% MwSt
    invoice.total = invoice.subtotal + invoice.tax

    // Zu täglichen Rechnungen hinzufügen
    const invoiceKey = `${today}-${task.belegNumber}`
    setDailyInvoices({
      ...dailyInvoices,
      [invoiceKey]: invoice,
    })

    return invoice
  }

  const startCamera = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        setCameraStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setShowCamera(true)
      }
    } catch (err) {
      console.error("Kamera-Zugriffsfehler:", err)
      alert("Kamera-Zugriff nicht möglich. Bitte überprüfen Sie die Kamera-Berechtigungen.")
    }
  }

  // Konum alma fonksiyonu
  const getCurrentLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Standort konnte nicht ermittelt werden:", error)
        },
      )
    }
  }

  // Entfernungsberechnung - mit 30 km Regel
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Dünya'nın yarıçapı (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    // Abrechnung nach 30 km
    const billableKm = Math.max(0, distance - freeKmLimit)
    const kmCost = billableKm * kmRate

    return {
      km: distance.toFixed(1) + " km",
      cost: billableKm > 0 ? "Preis auf Anfrage" : "Inklusive",
      billableKm: billableKm,
    }
  }

  // Standortverfolgung mit useEffect starten
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // Entfernungen der Aufgaben aktualisieren
  useEffect(() => {
    if (currentLocation) {
      const newDistances: { [key: number]: { km: string; cost: string; billableKm: number } } = {}
      todayTasks.forEach((task) => {
        const taskCoords = getCoordinatesFromAddress(task.address)
        if (taskCoords) {
          newDistances[task.id] = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            taskCoords.lat,
            taskCoords.lng,
          )
        }
      })
      setDistances(newDistances)
    }
  }, [currentLocation, todayTasks])

  // Adress-Koordinaten Umwandlung (Bremen Region)
  const getCoordinatesFromAddress = (address: string) => {
    const addressCoords: { [key: string]: { lat: number; lng: number } } = {
      "Hauptstraße 15, 28876 Oyten": { lat: 53.0793, lng: 8.8017 },
      "Bremer Straße 45, 28717 Bremen": { lat: 53.0758, lng: 8.8072 },
      "Dorfstraße 23, 28879 Grasberg": { lat: 53.0876, lng: 8.7985 },
      "Lange Straße 67, 28832 Achim": { lat: 53.0648, lng: 8.8342 },
      "In der Wisch 1-3, 28205 Bremen": { lat: 53.0758, lng: 8.8072 },
    }
    return addressCoords[address] || null
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL("image/jpeg")

        if (selectedTask) {
          const taskImages = reportImages[selectedTask.id] || []
          setReportImages({
            ...reportImages,
            [selectedTask.id]: [...taskImages, imageData],
          })
        }

        setCapturedImages([...capturedImages, imageData])
        stopCamera()
      }
    }
  }

  // Kategorie-Farben und Icons - Haushaltsgeräte
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "Kühlschränke":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Refrigerator className="h-4 w-4 mr-2" />,
        }
      case "Waschmaschinen":
        return {
          color: "bg-green-100 text-green-800",
          icon: <Waves className="h-4 w-4 mr-2" />,
        }
      case "Geschirrspüler":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <Droplets className="h-4 w-4 mr-2" />,
        }
      case "TV & Audio":
        return {
          color: "bg-orange-100 text-orange-800",
          icon: <Tv className="h-4 w-4 mr-2" />,
        }
      case "Mikrowellen":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Microwave className="h-4 w-4 mr-2" />,
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Home className="h-4 w-4 mr-2" />,
        }
    }
  }

  // Kalender View
  if (currentView === "calendar") {
    return <CalendarView currentUser={currentUser} setCurrentView={setCurrentView} setCurrentUser={setCurrentUser} />
  }

  // Admin Panel
  if (currentView === "admin") {
    return (
      <AdminPanel
        currentUser={currentUser}
        setCurrentView={setCurrentView}
        customers={customers}
        setCustomers={setCustomers}
      />
    )
  }

  // Anmeldebildschirm
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* PWA Install Prompt */}
          {showInstallPrompt && (
            <Card className="mb-4 border-yellow-400 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-yellow-800">App installieren</h3>
                    <p className="text-sm text-yellow-700">Für bessere Nutzung</p>
                  </div>
                  <Button size="sm" onClick={installPWA} className="bg-yellow-600 hover:bg-yellow-700">
                    <Download className="h-4 w-4 mr-1" />
                    Installieren
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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

              {/* Installation Links */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">App installieren:</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.open("/install.html", "_blank")
                        }
                      }}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Anleitung
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.share) {
                          navigator
                            .share({
                              title: "HB Montageservice - Beyaz Eşya Servisi",
                              text: "Tel: 042189782524 | Email: hansa@bremer-montageservice.de",
                              url: typeof window !== "undefined" ? window.location.href : "",
                            })
                            .catch((error) => {
                              // If share fails, copy to clipboard as fallback
                              if (typeof navigator !== "undefined" && navigator.clipboard) {
                                navigator.clipboard
                                  .writeText(window.location.href)
                                  .then(() => {
                                    alert("Link in die Zwischenablage kopiert!")
                                  })
                                  .catch(() => {
                                    alert("Teilen nicht möglich. URL: " + window.location.href)
                                  })
                              } else {
                                alert("Teilen nicht möglich. URL: " + window.location.href)
                              }
                            })
                        } else {
                          // Fallback for browsers without Web Share API
                          if (typeof navigator !== "undefined" && navigator.clipboard) {
                            navigator.clipboard
                              .writeText(window.location.href)
                              .then(() => {
                                alert("Link in die Zwischenablage kopiert!")
                              })
                              .catch(() => {
                                alert("URL: " + window.location.href)
                              })
                          } else {
                            alert("URL: " + window.location.href)
                          }
                        }
                      }}
                      className="flex-1"
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Teilen
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard (Monteur)
  if (currentView === "dashboard") {
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
                onClick={getCurrentLocation}
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 mr-2"
                title="Standort aktualisieren"
              >
                <MapPin className="h-5 w-5" />
              </button>
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

        {/* Heute Sektion */}
        <div className="p-4 pb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">HEUTE</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {new Date().toLocaleDateString("de-DE")}
            </Badge>
          </div>

          {/* Aufträge */}
          <div className="space-y-4">
            {todayTasks
              .filter((task) => task.assignedTo === currentUser.name)
              .map((task) => (
                <Card
                  key={task.id}
                  className="shadow-lg border-l-4 border-l-blue-500 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => {
                    setSelectedTask(task)
                    setCurrentView("taskDetail")
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-blue-800 mr-3">{task.time}</div>
                        <div>
                          <h3 className="font-bold text-lg">{task.service}</h3>
                          <p className="text-gray-600">{task.customer}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-blue-600 font-medium">#{task.orderNumber}</p>
                            <Badge className={getCategoryInfo(task.category).color} variant="secondary">
                              <div className="flex items-center">
                                {getCategoryInfo(task.category).icon}
                                {task.category}
                              </div>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          task.status === "Abgeschlossen"
                            ? "default"
                            : task.status === "In Bearbeitung"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          task.status === "Abgeschlossen"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Bearbeitung"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        <span>HB Beyaz Eşya Servisi</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{task.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Navigation className="h-4 w-4 mr-2" />
                          <span>Via {distances[task.id]?.km || task.distance}</span>
                          {currentLocation && <span className="ml-2 text-xs text-green-600">• Live</span>}
                        </div>
                        {distances[task.id] && (
                          <div className="flex items-center text-blue-600 font-semibold">
                            <Euro className="h-4 w-4 mr-1" />
                            <span>{distances[task.id].cost}</span>
                            {distances[task.id].billableKm === 0 && (
                              <span className="ml-1 text-xs text-green-600">(≤30km)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Servicepaket-Zusammenfassung */}
                    <div className="mt-3 p-2 bg-blue-50 rounded">
                      <p className="text-xs font-medium text-blue-800 mb-1">Servicepakete:</p>
                      <div className="text-xs text-blue-700">
                        {task.packages
                          .filter((pkg: any) => pkg.name)
                          .map((pkg: any, index: number) => (
                            <span key={index}>
                              {pkg.name}
                              {index < task.packages.filter((p: any) => p.name).length - 1 ? ", " : ""}
                            </span>
                          ))}
                      </div>
                      <p className="text-xs font-semibold text-blue-800 mt-1">Preis auf Anfrage</p>
                    </div>

                    {/* Schnellaktionen */}
                    <div className="flex gap-2 mt-4">
                      {task.status === "Wartend" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateTaskStatus(task.id, "Unterwegs")
                          }}
                          className="bg-orange-600 hover:bg-orange-700 flex-1"
                        >
                          <Truck className="h-4 w-4 mr-1" />
                          Losfahren
                        </Button>
                      )}
                      {task.status === "Unterwegs" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateTaskStatus(task.id, "In Bearbeitung")
                          }}
                          className="bg-blue-600 hover:bg-blue-700 flex-1"
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Service starten
                        </Button>
                      )}
                      {task.status === "In Bearbeitung" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateTaskStatus(task.id, "Abgeschlossen")
                          }}
                          className="bg-green-600 hover:bg-green-700 flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Abschließen
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Km-Ücretlendirme Bilgisi */}
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
                <hr className="my-2" />
                <div className="text-xs text-gray-600">
                  <p>• Entfernung wird automatisch mit GPS berechnet</p>
                  <p>• Nur Kilometer über 30 km werden berechnet</p>
                  <p>• Wird automatisch zur Rechnung hinzugefügt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beyaz Eşya Servisleri */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-blue-800 mb-3">🔧 BEYAZ EŞYA SERVİSLERİ</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>• Kühlschrank Einbau</div>
                <div>• Waschmaschine Anschluss</div>
                <div>• Geschirrspüler Einbau</div>
                <div>• TV Wandmontage</div>
                <div>• Trockner Installation</div>
                <div>• Mikrowelle Einbau</div>
                <div>• Side-by-Side Service</div>
                <div>• Backofen Einbau</div>
                <div>• Weinkühlschrank Service</div>
                <div>• Gefriertruhe Installation</div>
                <div>• Dampfgarer Einbau</div>
                <div>• Reparatur Service</div>
                <div>• Multi-Geräte Pakete</div>
                <div>• Komplette Küchenausstattung</div>
                <div>• Soundbar Installation</div>
                <div>• Receiver Anschluss</div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-medium">In der Wisch 1-3, 28205 Bremen</p>
                <p className="font-medium">042189782524</p>
                <p className="font-medium">hansa@bremer-montageservice.de</p>
                <p className="text-xs text-gray-500 mt-2">Öffnungszeiten: Mo-Sa 8:00-18:00</p>
              </div>
            </CardContent>
          </Card>

          {/* Fatura Yönetimi */}
          <Card className="mt-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-yellow-600">TÄGLICHE RECHNUNGEN</h3>
                <Button
                  size="sm"
                  onClick={() => setShowInvoiceList(true)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Rechnungen ({Object.keys(dailyInvoices).length})
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Heute:{" "}
                  {
                    Object.keys(dailyInvoices).filter((key) => key.startsWith(new Date().toLocaleDateString("de-DE")))
                      .length
                  }{" "}
                  Rechnungen
                </p>
                <p>
                  Gesamt:{" "}
                  {Object.values(dailyInvoices)
                    .reduce((sum: number, inv: any) => sum + inv.total, 0)
                    .toFixed(2)}
                  €
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <div className="flex justify-around">
            <button
              className="flex flex-col items-center p-2 text-blue-800"
              onClick={() => setCurrentView("dashboard")}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Heute</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-500" onClick={() => setCurrentView("calendar")}>
              <Calendar className="h-6 w-6" />
              <span className="text-xs mt-1">Kalender</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-500" onClick={() => setCurrentView("reports")}>
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

  // Task Detail View (aynı kalacak, sadece başlık değişecek)
  if (currentView === "taskDetail" && selectedTask) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-800 text-white p-4 shadow-lg">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">HB MONTAGESERVICE</h1>
              <p className="text-blue-100 text-sm">#{selectedTask.orderNumber}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {/* Kundeninfo */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Kundeninformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Kunde</p>
                <p className="font-medium text-lg">{selectedTask.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adresse</p>
                <p className="font-medium">{selectedTask.address}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-gray-600">Datum</p>
                  <p className="font-medium">{new Date().toLocaleDateString("de-DE")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <p className="font-medium">
                    <a href={`tel:${selectedTask.phone}`} className="text-blue-600 hover:underline">
                      {selectedTask.phone}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auftragsinfo */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Service Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-medium">{selectedTask.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Notizen</p>
                <p className="font-medium">{selectedTask.notes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Belegnummer</p>
                <p className="font-medium">{selectedTask.belegNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Servicepaket-Karte */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Euro className="h-5 w-5 mr-2" />
                Servicepakete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedTask.packages.map((pkg: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{pkg.name}</p>
                      <p className="text-sm text-gray-600">Menge: {pkg.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-sm">Preis auf Anfrage</span>
                    </div>
                  </div>
                ))}

                {/* Gesamt */}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Gesamt Servicekosten:</span>
                    <span className="font-bold text-xl text-green-600">Preis auf Anfrage</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right">zzgl. MwSt. und Km-Kosten</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aktionen */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Aktionen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedTask.status === "Wartend" && (
                <Button
                  onClick={() => updateTaskStatus(selectedTask.id, "Unterwegs")}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Losfahren
                </Button>
              )}
              {selectedTask.status === "Unterwegs" && (
                <Button
                  onClick={() => updateTaskStatus(selectedTask.id, "In Bearbeitung")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Service starten
                </Button>
              )}
              {selectedTask.status === "In Bearbeitung" && (
                <Button
                  onClick={() => updateTaskStatus(selectedTask.id, "Abgeschlossen")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Abschließen
                </Button>
              )}
              <Button onClick={startCamera} className="w-full bg-blue-800 hover:bg-blue-900">
                <Camera className="h-4 w-4 mr-1" />
                Kamera starten
              </Button>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const address = encodeURIComponent(selectedTask.address)
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank")
                  }
                }}
                className="w-full"
                variant="outline"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Navigation starten
              </Button>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(`tel:${selectedTask.phone}`, "_self")
                  }
                }}
                className="w-full"
                variant="outline"
              >
                <Phone className="h-4 w-4 mr-1" />
                Kunde anrufen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <div className="flex justify-around">
            <button
              className="flex flex-col items-center p-2 text-gray-500"
              onClick={() => setCurrentView("dashboard")}
            >
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

  // Default return
  return (
    <>
      {/* Invoice Modals */}
      <InvoiceModals
        showInvoiceList={showInvoiceList}
        setShowInvoiceList={setShowInvoiceList}
        showInvoiceModal={showInvoiceModal}
        setShowInvoiceModal={setShowInvoiceModal}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
        dailyInvoices={dailyInvoices}
        currentUser={currentUser}
      />

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Foto aufnehmen</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-black">
                <video ref={videoRef} autoPlay playsInline className="w-full h-auto" style={{ maxHeight: "50vh" }} />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </CardContent>
            <div className="p-4 flex gap-2">
              <Button variant="outline" onClick={stopCamera} className="flex-1">
                Abbrechen
              </Button>
              <Button onClick={capturePhoto} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Camera className="h-4 w-4 mr-2" />
                Aufnehmen
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
