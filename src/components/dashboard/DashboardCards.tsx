import { View } from "react-native"
import { Card, Text } from "react-native-paper"

export default function DashboardCards(){

const cards = [
{title:"Total Clients",value:"6"},
{title:"Payment Overdue",value:"1"},
{title:"Total Outlets",value:"21"},
{title:"Paid This Month",value:"4"}
]

return(

<View style={{flexDirection:"row",gap:20}}>

{cards.map((c,i)=>(

<Card key={i} style={{flex:1,padding:20}}>
<Text>{c.title}</Text>
<Text variant="headlineMedium">{c.value}</Text>
</Card>

))}

</View>

)

}