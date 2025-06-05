"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, MapPin, User } from "lucide-react"

interface InvoiceModalsProps {
  showInvoiceList: boolean
  setShowInvoiceList: (show: boolean) => void
  showInvoiceModal: boolean
  setShowInvoiceModal: (show: boolean) => void
  selectedInvoice: any
  setSelectedInvoice: (invoice: any) => void
  dailyInvoices: { [key: string]: any }
  currentUser: any
}

export function InvoiceModals({
  showInvoiceList,
  setShowInvoiceList,
  showInvoiceModal,
  setShowInvoiceModal,
  selectedInvoice,
  setSelectedInvoice,
  dailyInvoices,
  currentUser,
}: InvoiceModalsProps) {
  const downloadInvoicePDF = (invoice: any) => {
    // PDF-Erstellung Simulation
    alert(`PDF heruntergeladen: ${invoice.id}.pdf`)
  }

  const sendInvoiceEmail = (invoice: any) => {
    // E-Mail-Versand Simulation
    alert(`Rechnung per E-Mail gesendet: ${invoice.customer}`)
  }

  return (
    <>
      {/* Fatura Listesi Modal */}
      {showInvoiceList && (
        <Dialog open={showInvoiceList} onOpenChange={setShowInvoiceList}>
          <DialogContent className="sm:max-w-lg p-0 max-h-[90vh]">
            <DialogHeader className="p-4 bg-blue-800 text-white">
              <DialogTitle>TÄGLICHE RECHNUNGEN - {currentUser.name}</DialogTitle>
              <p className="text-blue-100 text-sm">{new Date().toLocaleDateString("de-DE")}</p>
            </DialogHeader>
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-3">
                {Object.values(dailyInvoices).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Noch keine Rechnungen erstellt</p>
                  </div>
                ) : (
                  Object.values(dailyInvoices).map((invoice: any) => (
                    <Card key={invoice.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{invoice.customer}</h3>
                            <p className="text-sm text-gray-600">Beleg: {invoice.belegNumber}</p>
                            <p className="text-xs text-blue-600">#{invoice.orderNumber}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Artikel-Summe:</span>
                            <span>Preis auf Anfrage</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Km-Kosten ({invoice.kmDistance}):</span>
                            <span>Preis auf Anfrage</span>
                          </div>
                          <div className="flex justify-between">
                            <span>MwSt. (19%):</span>
                            <span>Preis auf Anfrage</span>
                          </div>
                          <hr />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Gesamt:</span>
                            <span className="text-blue-600">Preis auf Anfrage</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setShowInvoiceModal(true)
                            }}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Detay
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => downloadInvoicePDF(invoice)}
                            className="bg-blue-600 hover:bg-blue-700 flex-1"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="p-4">
              <Button onClick={() => setShowInvoiceList(false)} className="w-full">
                Schließen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Fatura Detay Modal */}
      {showInvoiceModal && selectedInvoice && (
        <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
          <DialogContent className="sm:max-w-lg p-0 max-h-[90vh]">
            <DialogHeader className="p-4 bg-blue-800 text-white">
              <DialogTitle>RECHNUNGSDETAILS</DialogTitle>
              <p className="text-blue-100 text-sm">Beleg: {selectedInvoice.belegNumber}</p>
            </DialogHeader>
            <ScrollArea className="h-[70vh] p-4">
              <div className="space-y-4">
                {/* Dodenhof Header */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-800">HB MONTAGESERVICE</h2>
                    <p className="text-sm">In der Wisch 1-3, 28205 Bremen</p>
                    <p className="text-sm">Tel: 042189782524</p>
                    <p className="text-xs text-gray-600 mt-2">MONTAGE RECHNUNG</p>
                  </CardContent>
                </Card>

                {/* Fatura Bilgileri */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Rechnungsdaten</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>
                        <strong>Rechnung Nr:</strong> {selectedInvoice.id}
                      </p>
                      <p>
                        <strong>Beleg Nr:</strong> {selectedInvoice.belegNumber}
                      </p>
                      <p>
                        <strong>Datum:</strong> {selectedInvoice.date}
                      </p>
                      <p>
                        <strong>Monteur:</strong> {selectedInvoice.technician}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Kunde
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>
                        <strong>{selectedInvoice.customer}</strong>
                      </p>
                      <p className="text-gray-600">{selectedInvoice.address}</p>
                      <p className="text-xs text-blue-600">#{selectedInvoice.orderNumber}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Artikel Liste */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Montierte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <span className="font-medium">{item.description}</span>
                          </div>
                          <div className="text-right">
                            {item.unitPrice > 0 ? (
                              <div>
                                <div className="text-sm">
                                  {item.quantity} × {item.unitPrice}€
                                </div>
                                <div className="font-semibold">{item.totalPrice.toFixed(2)}€</div>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">Inklusiv</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Km Kosten */}
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Fahrtkosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Entfernung: {selectedInvoice.kmDistance}</p>
                        <p className="text-sm text-gray-600">0,70€ pro km</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{selectedInvoice.kmCost.toFixed(2)}€</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gesamt Rechnung */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Netto-Summe:</span>
                        <span>Preis auf Anfrage</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MwSt. (19%):</span>
                        <span>Preis auf Anfrage</span>
                      </div>
                      <hr className="border-green-300" />
                      <div className="flex justify-between text-xl font-bold">
                        <span>GESAMT (Brutto):</span>
                        <span className="text-green-600">Preis auf Anfrage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Zahlungsinfo */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center text-sm">
                    <p className="font-medium">Zahlbar innerhalb 14 Tagen</p>
                    <p className="text-gray-600 mt-2">Vielen Dank für Ihr Vertrauen in HB Montageservice!</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
            <DialogFooter className="p-4 flex gap-2">
              <Button variant="outline" onClick={() => setShowInvoiceModal(false)} className="flex-1">
                Schließen
              </Button>
              <Button
                onClick={() => downloadInvoicePDF(selectedInvoice)}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                PDF Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
