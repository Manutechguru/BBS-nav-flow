import { View } from "react-native"
import { Card, Text } from "react-native-paper"
import { useClients } from "../../context/ClientsContext"

export default function DashboardCards(){

  const { clients } = useClients()

  /* ---------- CALCULATE METRICS ---------- */

  const totalClients = clients.length

  const paymentOverdue = clients.filter(
    (c:any) => c.paymentStatus === "Due"
  ).length

  const paidClients = clients.filter(
    (c:any) => c.paymentStatus === "Paid"
  ).length

  const totalOutlets = clients.reduce(
    (sum:number, c:any) => sum + (Number(c.numberOfOutlets) || 0),
    0
  )

  const cards = [

    { title: "Total Clients", value: totalClients },

    { title: "Payment Overdue", value: paymentOverdue },

    { title: "Total Outlets", value: totalOutlets },

    { title: "Paid This Month", value: paidClients }

  ]

  return(

    <View style={{ flexDirection:"row", gap:20 }}>

      {cards.map((c,i)=>(

        <Card key={i} style={{ flex:1, padding:20 }}>
          <Text>{c.title}</Text>
          <Text variant="headlineMedium">{c.value}</Text>
        </Card>

      ))}

    </View>

  )

}