// HB Montageservice Mobile App
class HBMontageApp {
  constructor() {
    this.currentUser = null
    this.currentView = "login"
    this.tasks = [
      {
        id: 1,
        time: "08:00",
        customer: "Familie Müller",
        address: "Hauptstraße 15, 28876 Oyten",
        phone: "+49 4207 123456",
        service: "Kühlschrank + Geschirrspüler Einbau",
        status: "Wartend",
        assignedTo: "Kay",
        orderNumber: "HB-2024-001234",
        category: "Kühlschränke",
      },
      {
        id: 2,
        time: "11:30",
        customer: "Herr Schmidt",
        address: "Bremer Straße 45, 28717 Bremen",
        phone: "+49 421 987654",
        service: "Waschmaschine + Trockner + Mikrowelle",
        status: "Wartend",
        assignedTo: "Sebastian",
        orderNumber: "HB-2024-001235",
        category: "Waschmaschinen",
      },
      {
        id: 3,
        time: "14:00",
        customer: "Familie Weber",
        address: "Dorfstraße 23, 28879 Grasberg",
        phone: "+49 4208 567890",
        service: "Komplette Küchenausstattung",
        status: "Wartend",
        assignedTo: "Denis",
        orderNumber: "HB-2024-001236",
        category: "Geschirrspüler",
      },
    ]
    this.users = {
      admin: { name: "Administrator", role: "Admin" },
      kay: { name: "Kay", role: "Monteur" },
      sebastian: { name: "Sebastian", role: "Monteur" },
      denis: { name: "Denis", role: "Monteur" },
      subunternehmer: { name: "Subunternehmer", role: "Monteur" },
    }
    this.init()
  }

  init() {
    this.render()
  }

  login(username, password) {
    if (this.users[username] && password === "123456") {
      this.currentUser = { ...this.users[username], username }
      this.currentView = "dashboard"
      this.render()
      return true
    }
    return false
  }

  logout() {
    this.currentUser = null
    this.currentView = "login"
    this.render()
  }

  updateTaskStatus(taskId, status) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (task) {
      task.status = status
      this.render()
      if (status === "Abgeschlossen") {
        alert(`Auftrag ${task.orderNumber} abgeschlossen! Rechnung wird erstellt.`)
      }
    }
  }

  render() {
    const app = document.getElementById("app")

    if (this.currentView === "login") {
      app.innerHTML = this.renderLogin()
    } else if (this.currentView === "dashboard") {
      app.innerHTML = this.renderDashboard()
    }

    this.attachEventListeners()
  }

  renderLogin() {
    return `
            <div class="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center p-4">
                <div class="w-full max-w-sm bg-white rounded-lg shadow-2xl">
                    <div class="text-center bg-blue-800 text-white rounded-t-lg p-6">
                        <div class="text-2xl font-bold mb-2">HB MONTAGESERVICE</div>
                        <div class="text-lg">MONTAGESERVICE</div>
                        <p class="text-blue-100 text-sm">In der Wisch 1-3, 28205 Bremen - v1.0</p>
                    </div>
                    <div class="p-6">
                        <form id="loginForm" class="space-y-4">
                            <div>
                                <select id="username" class="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Benutzer wählen...</option>
                                    <option value="admin">🛡️ Administrator</option>
                                    <option value="kay">Kay</option>
                                    <option value="sebastian">Sebastian</option>
                                    <option value="denis">Denis</option>
                                    <option value="subunternehmer">Subunternehmer</option>
                                </select>
                            </div>
                            <div>
                                <input type="password" id="password" placeholder="Passwort" class="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-800 hover:bg-blue-900 text-white text-lg py-4 rounded-lg">
                                Anmelden
                            </button>
                        </form>
                        <div class="mt-4 text-xs text-gray-500 text-center">Demo-Passwort: 123456</div>
                    </div>
                </div>
            </div>
        `
  }

  renderDashboard() {
    const userTasks = this.tasks.filter(
      (task) => this.currentUser.username === "admin" || task.assignedTo === this.currentUser.name,
    )

    return `
            <div class="min-h-screen bg-gray-50">
                <!-- Header -->
                <div class="bg-blue-800 text-white p-4 shadow-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-xl font-bold">HB MONTAGESERVICE</h1>
                            <p class="text-blue-100 text-sm">${this.currentUser.name}</p>
                        </div>
                        <button id="logoutBtn" class="p-2 rounded-full bg-blue-700 hover:bg-blue-600">
                            🚪
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-4 pb-20">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">HEUTE</h2>
                        <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-lg">
                            ${new Date().toLocaleDateString("de-DE")}
                        </span>
                    </div>

                    <!-- Tasks -->
                    <div class="space-y-4">
                        ${userTasks.map((task) => this.renderTask(task)).join("")}
                    </div>

                    <!-- Info Cards -->
                    <div class="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h3 class="font-bold text-orange-600 mb-3">🚗 KM-BERECHNUNG</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Erste 30 km:</span>
                                <span class="font-semibold text-green-600">INKLUSIVE</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Ab 30 km:</span>
                                <span class="font-semibold text-orange-600">0,70€/km</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 class="font-bold text-blue-800 mb-3">🏢 HB MONTAGESERVICE</h3>
                        <div class="text-center">
                            <p class="font-medium">In der Wisch 1-3, 28205 Bremen</p>
                            <p class="font-medium">042189782524</p>
                            <p class="font-medium">hansa@bremer-montageservice.de</p>
                            <p class="text-xs text-gray-500 mt-2">Öffnungszeiten: Mo-Fr 8:00-17:00</p>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  renderTask(task) {
    const statusColors = {
      Wartend: "bg-gray-100 text-gray-800",
      Unterwegs: "bg-orange-100 text-orange-800",
      "In Bearbeitung": "bg-blue-100 text-blue-800",
      Abgeschlossen: "bg-green-100 text-green-800",
    }

    const categoryIcons = {
      Kühlschränke: "❄️",
      Waschmaschinen: "🌊",
      Geschirrspüler: "💧",
      "TV & Audio": "📺",
      Mikrowellen: "📱",
    }

    return `
            <div class="bg-white shadow-lg border-l-4 border-l-blue-500 rounded-lg p-4">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center">
                        <div class="text-2xl font-bold text-blue-800 mr-3">${task.time}</div>
                        <div>
                            <h3 class="font-bold text-lg">${task.service}</h3>
                            <p class="text-gray-600">${task.customer}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <p class="text-xs text-blue-600 font-medium">#${task.orderNumber}</p>
                                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    ${categoryIcons[task.category] || "🔧"} ${task.category}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span class="px-2 py-1 rounded text-xs ${statusColors[task.status] || "bg-gray-100 text-gray-800"}">
                        ${task.status}
                    </span>
                </div>

                <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                        <span class="mr-2">🏪</span>
                        <span>HB Montageservice</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2">📍</span>
                        <span>${task.address}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2">📞</span>
                        <a href="tel:${task.phone}" class="text-blue-600 hover:underline">${task.phone}</a>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2 mt-4">
                    ${this.renderTaskButtons(task)}
                </div>
            </div>
        `
  }

  renderTaskButtons(task) {
    if (task.status === "Wartend") {
      return `
                <button onclick="app.updateTaskStatus(${task.id}, 'Unterwegs')" 
                        class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">
                    🚛 Losfahren
                </button>
            `
    } else if (task.status === "Unterwegs") {
      return `
                <button onclick="app.updateTaskStatus(${task.id}, 'In Bearbeitung')" 
                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    ⚡ Service starten
                </button>
            `
    } else if (task.status === "In Bearbeitung") {
      return `
                <button onclick="app.updateTaskStatus(${task.id}, 'Abgeschlossen')" 
                        class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                    ✅ Abschließen
                </button>
            `
    } else {
      return `
                <span class="flex-1 text-center py-2 px-4 bg-green-100 text-green-800 rounded">
                    ✅ Abgeschlossen
                </span>
            `
    }
  }

  attachEventListeners() {
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (this.login(username, password)) {
          // Success
        } else {
          alert("Falscher Benutzername oder Passwort!")
        }
      })
    }

    // Logout button
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        this.logout()
      })
    }
  }
}

// Initialize app
const app = new HBMontageApp()
