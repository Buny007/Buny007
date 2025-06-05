"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share, Copy, Check, ExternalLink, Smartphone, Monitor } from "lucide-react"

export default function ShareComponent() {
  const [copied, setCopied] = useState(false)

  const appURL = "https://hb-montageservice-demo.vercel.app"

  // Link kopieren
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(appURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback für ältere Browser
      const textArea = document.createElement("textarea")
      textArea.value = appURL
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Native Teilen
  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "HB Montageservice App",
          text: "Professionelle Montage-App für Techniker\n\n📍 In der Wisch 1-3, 28205 Bremen\n📞 042189782524",
          url: appURL,
        })
      } catch (err) {
        console.log("Teilen abgebrochen")
      }
    } else {
      copyLink()
      alert("Link wurde kopiert!")
    }
  }

  // WhatsApp teilen
  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `🔧 HB Montageservice App\n\nProfessionelle Montage-App für Techniker\n\n🌐 ${appURL}\n\n📍 In der Wisch 1-3, 28205 Bremen\n📞 042189782524\n📧 hansa@bremer-montageservice.de`,
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  // Email teilen
  const shareEmail = () => {
    const subject = encodeURIComponent("HB Montageservice - Mobile App")
    const body = encodeURIComponent(
      `Hallo,\n\nich möchte die HB Montageservice Mobile App mit Ihnen teilen.\n\nProfessionelle Montage-App für Techniker\n\nApp-Link: ${appURL}\n\nKontakt:\n📍 In der Wisch 1-3, 28205 Bremen\n📞 042189782524\n📧 hansa@bremer-montageservice.de\n\nViele Grüße!`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center bg-blue-800 text-white rounded-t-lg">
            <div className="text-3xl font-bold mb-2">🔧</div>
            <CardTitle className="text-xl">HB Montageservice</CardTitle>
            <p className="text-blue-100 text-sm">Mobile App für Techniker</p>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* App URL */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">App-Link:</p>
              <p className="font-mono text-sm text-blue-600 break-all">{appURL}</p>
            </div>

            {/* Haupt-Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => window.open(appURL, "_blank")}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                App öffnen
              </Button>

              <Button onClick={shareApp} className="w-full bg-blue-600 hover:bg-blue-700">
                <Share className="h-5 w-5 mr-2" />
                App teilen
              </Button>

              <Button onClick={copyLink} variant="outline" className="w-full">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Link kopieren
                  </>
                )}
              </Button>
            </div>

            {/* Installations-Anleitungen */}
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Android Installation</span>
                </div>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Chrome Browser öffnen</li>
                  <li>2. URL eingeben und öffnen</li>
                  <li>3. Menü (⋮) → "App installieren"</li>
                  <li>4. "Installieren" bestätigen</li>
                </ol>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">iPhone Installation</span>
                </div>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Safari Browser öffnen</li>
                  <li>2. URL eingeben und öffnen</li>
                  <li>3. Teilen (📤) → "Zum Home-Bildschirm"</li>
                  <li>4. "Hinzufügen" bestätigen</li>
                </ol>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Monitor className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-purple-800">Desktop Installation</span>
                </div>
                <ol className="text-sm text-purple-700 space-y-1">
                  <li>1. Chrome/Edge öffnen</li>
                  <li>2. URL eingeben und öffnen</li>
                  <li>3. "App installieren" Icon klicken</li>
                  <li>4. "Installieren" bestätigen</li>
                </ol>
              </div>
            </div>

            {/* Teilen-Optionen */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={shareWhatsApp}
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-700"
              >
                📱 WhatsApp
              </Button>

              <Button onClick={shareEmail} variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                📧 Email
              </Button>
            </div>

            {/* Anmeldedaten */}
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">🔑 Anmeldedaten</h4>
              <div className="text-sm text-yellow-700">
                <p>
                  <strong>Benutzer:</strong> admin, kay, sebastian, denis, subunternehmer
                </p>
                <p>
                  <strong>Passwort:</strong> 123456
                </p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
              <p className="font-semibold">In der Wisch 1-3, 28205 Bremen</p>
              <p>📞 042189782524</p>
              <p>📧 hansa@bremer-montageservice.de</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
