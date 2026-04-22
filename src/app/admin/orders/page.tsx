import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Euro, Leaf } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const totalRevenue = (orders ?? []).reduce((sum: number, o: { amount_total: number }) => sum + o.amount_total, 0);
  const totalMeters = (orders ?? []).reduce((sum: number, o: { meters: number }) => sum + o.meters, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bestellingen</h1>
        <p className="text-gray-500 mt-1">Alle transacties en aankopen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Totale Omzet</p>
                <p className="text-2xl font-bold text-gray-900">
                  €{(totalRevenue / 100).toLocaleString("nl-NL")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Aantal Bestellingen</p>
                <p className="text-2xl font-bold text-gray-900">{orders?.length ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-forest/10 rounded-xl">
                <Leaf className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Totaal m²</p>
                <p className="text-2xl font-bold text-gray-900">{totalMeters.toLocaleString("nl-NL")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alle Bestellingen</CardTitle>
        </CardHeader>
        <CardContent>
          {!orders || orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nog geen bestellingen</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Datum</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">m²</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Extra</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Bedrag</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: { id: string; meters: number; extra_donation: string | null; amount_total: number; payment_status: string; created_at: string }) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">
                        {new Date(order.created_at).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 font-medium text-forest">{order.meters} m²</td>
                      <td className="py-3 px-4 text-gray-500">
                        {order.extra_donation === "vijver"
                          ? "🌊 Vijver (€25)"
                          : order.extra_donation === "dieren"
                          ? "🐾 Dieren (€15)"
                          : "—"}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        €{(order.amount_total / 100).toLocaleString("nl-NL")}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.payment_status === "paid" ? "Betaald" : order.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
