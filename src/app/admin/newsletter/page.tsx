import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const supabase = createAdminClient();

  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const { count } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nieuwsbrief</h1>
        <p className="text-gray-500 mt-1">
          Bekijk alle ingeschreven abonnees
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Totaal abonnees</p>
              <p className="text-3xl font-bold text-gray-900">{count ?? 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abonnees</CardTitle>
        </CardHeader>
        <CardContent>
          {!subscribers || subscribers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nog geen abonnees</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Ingeschreven op</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub: { id: string; email: string; created_at: string }) => (
                    <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{sub.email}</td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(sub.created_at).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
