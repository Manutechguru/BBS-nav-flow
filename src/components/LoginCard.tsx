import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { detectLoginType } from "../hooks/useLoginDetect";
import {
  loginWithPassword,
  resetPassword,
  sendLoginOtp,
  sendResetOtp,
  verifyLoginOtp,
  verifyResetOtp
} from "../utils/auth";

export default function LoginScreen(){

const router = useRouter();

const [password,setPassword] = useState("");
const [loginInput,setLoginInput] = useState("");

const getFullPhone = () => {
  return country.dial + loginInput;
};

const getResetPhone = () => {
  return country.dial + resetPhone;
};

const [loginType,setLoginType] = useState("username");
const [otpValue,setOtpValue] = useState("");

const [step,setStep] = useState(1);
const [resetStep,setResetStep] = useState(0);

const [timer,setTimer] = useState(180);
const [canResend,setCanResend] = useState(false);

const [countryOpen,setCountryOpen] = useState(false);
const [search,setSearch] = useState("");

const [resetPhone,setResetPhone] = useState("");
const [resetOtp,setResetOtp] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const countries = [
{code:"IN",name:"India",dial:"+91"},
{code:"US",name:"United States",dial:"+1"},
{code:"GB",name:"United Kingdom",dial:"+44"},
{code:"CA",name:"Canada",dial:"+1"},
{code:"AU",name:"Australia",dial:"+61"}
];

const [country,setCountry] = useState(countries[0]);

useEffect(() => {

const detectCountry = async () => {

try {

const res = await fetch("https://ipwho.is/");
if (!res.ok) return;
const data = await res.json();

const found = countries.find(c => c.code === data.country_code);

if(found){
setCountry(found);
}

} catch(error){
console.log("Country detect error:", error);
}

};

detectCountry();

}, []);

useEffect(()=>{

if(step === 2){

setTimer(180);
setCanResend(false);

const interval = setInterval(()=>{

setTimer(prev => {

if(prev <= 1){
clearInterval(interval);
setCanResend(true);
return 0;
}

return prev - 1;

});

},1000);

return ()=>clearInterval(interval);

}

},[step]);

const filteredCountries = countries.filter(c =>
c.name.toLowerCase().includes(search.toLowerCase())
);

const handleInputChange = (value) => {

setLoginInput(value);

const type = detectLoginType(value);

setLoginType(type);

if(type === "phone" && loginInput.length === 0){
setCountryOpen(true);
}else if(type !== "phone"){
setCountryOpen(false);
}

};

const handleContinue = async () => {

try{

if(loginType === "phone"){

await sendLoginOtp(getFullPhone()); // 🔥 REAL BACKEND CALL
setStep(2);

}else{
setStep(3);
}

}catch(error:any){
console.log(error);
alert(error?.response?.data?.message || "Failed to send OTP");
}

};

const handleUserLogin = async () => {

try{

let user;

if(loginType === "phone"){

user = await verifyLoginOtp(getFullPhone(), otpValue);

}else{

user = await loginWithPassword(loginInput, password);

}

if(!user){
alert("Login Failed");
return;
}

const role = user.role?.toLowerCase();

if(role === "super_admin"){
router.push("/admin/dashboard");
}

else if(role === "admin" || role === "client_admin"){
router.push("/client/dashboard");
}

else if(role === "staff"){
router.push("/staff/dashboard");
}

}catch(error:any){

console.log(error);
alert(error?.response?.data?.message || "Login error");

}

};

const handleResendOtp = async () => {

try{

await sendLoginOtp(getFullPhone());

setTimer(180);
setCanResend(false);

}catch(error){
console.log(error);
alert("Failed to resend OTP");
}

};

const formatTime = (seconds) => {

const m = Math.floor(seconds/60);
const s = seconds % 60;

return `${m}:${s < 10 ? "0"+s : s}`;

};

return(

<View style={styles.page}>

<View style={styles.card}>

<View style={styles.leftPanel}>

<View style={styles.logoRow}>
<View style={styles.logoBox}>
<Text style={styles.logoText}>BBS</Text>
</View>

<Text style={styles.logoLabel}>Bojhan</Text>
</View>

<Text style={styles.brandTitle}>
Bojhan{"\n"}Billing System
</Text>

</View>

<View style={styles.rightPanel}>

{resetStep === 0 && step === 1 && (

<View>

<Text style={styles.heading}>Secure Login</Text>
<Text style={styles.subHeading}>Enter your credentials to proceed</Text>

<Text style={styles.label}>Phone / Email / Username</Text>

{loginType === "phone" ? (

<View style={styles.phoneRow}>

<TouchableOpacity
style={styles.countryBox}
onPress={()=>setCountryOpen(!countryOpen)}
>

<Text style={styles.countryCode}>{country.code}</Text>
<Text>{country.dial} ▼</Text>

</TouchableOpacity>

<View style={styles.phoneInput}>

<TextInput
placeholder="Enter mobile number"
style={styles.inputField}
value={loginInput}
onChangeText={handleInputChange}
/>

</View>

</View>

) : (

<View style={styles.inputBox}>

<Feather
name={loginType === "email" ? "mail" : "user"}
size={18}
color="#888"
/>

<TextInput
placeholder="Enter phone, email or username"
style={styles.inputField}
value={loginInput}
onChangeText={handleInputChange}
/>

</View>

)}

{loginType === "phone" && countryOpen && (

<View style={styles.dropdown}>

<TextInput
placeholder="Search country"
style={styles.search}
value={search}
onChangeText={setSearch}
/>

<FlatList
data={filteredCountries}
keyExtractor={(item)=>item.code}
renderItem={({item})=>(

<TouchableOpacity
style={styles.countryItem}
onPress={()=>{
setCountry(item)
setCountryOpen(false)
}}
>

<Text>{item.name}</Text>
<Text>{item.dial}</Text>

</TouchableOpacity>

)}
/>

</View>

)}

{loginType !== "phone" && loginInput !== "" && (

<View>

<Text style={styles.label}>Password</Text>

<View style={styles.inputBox}>

<Feather name="lock" size={18} color="#888" />

<TextInput
secureTextEntry
placeholder="Enter password"
style={styles.inputField}
value={password}
onChangeText={setPassword}
/>

</View>

<View style={styles.resetContainer}>
<TouchableOpacity onPress={()=>setResetStep(1)}>
<Text style={styles.resetLink}>Reset</Text>
</TouchableOpacity>
</View>

</View>

)}

<LinearGradient
colors={["#2f6fed","#1a4db6"]}
style={styles.button}
>

<TouchableOpacity
style={{width:"100%",alignItems:"center"}}
onPress={()=>{
if(loginType === "phone"){
handleContinue();
}else{
handleUserLogin();
}
}}
>

<Text style={styles.buttonText}>
{loginType === "phone" ? "Send OTP →" : "Login →"}
</Text>

</TouchableOpacity>

</LinearGradient>

</View>

)}

{step === 2 && (

<View>

<Text style={styles.heading}>Verify Phone</Text>
<Text style={styles.subHeading}>Enter OTP sent to your number</Text>

<View style={styles.otpHeader}>

<Text style={styles.label}>Enter OTP</Text>

<TouchableOpacity
onPress={()=>{
setStep(1)
setOtpValue("")
}}
>

<Text style={styles.useAnother}>Use another?</Text>
</TouchableOpacity>

</View>

<View style={styles.inputBox}>
<TextInput
placeholder="Enter OTP"
style={styles.inputField}
value={otpValue}
onChangeText={setOtpValue}
/>
</View>

<View style={styles.resendContainer}>

<Text style={styles.resendText}>
Valid for {formatTime(timer)}
</Text>

<TouchableOpacity onPress={handleResendOtp}>
<Text style={styles.resendLink}>Resend OTP</Text>
</TouchableOpacity>

</View>

<LinearGradient
colors={["#2f6fed","#1a4db6"]}
style={styles.button}
>

<TouchableOpacity
style={{width:"100%",alignItems:"center"}}
onPress={handleUserLogin}
>

<Text style={styles.buttonText}>
Login →
</Text>

</TouchableOpacity>

</LinearGradient>

</View>

)}
{resetStep === 1 && (

<View>

<Text style={styles.heading}>Reset Password</Text>

<View style={styles.inputBox}>
<TextInput
  placeholder="Phone Number"
  value={resetPhone}
  onChangeText={setResetPhone}
/>
</View>

<LinearGradient
colors={["#2f6fed","#1a4db6"]}
style={styles.button}
>

<TouchableOpacity
style={{width:"100%",alignItems:"center"}}
onPress={async () => {
  try {

    if (!resetPhone) {
      alert("Enter phone number");
      return;
    }

    const fullPhone = country.dial + resetPhone;

    await sendResetOtp(fullPhone);

    setResetStep(2);

  } catch (err: any) {
    console.log("SEND RESET OTP ERROR:", err?.response?.data || err);
    alert(err?.response?.data?.message || "Failed to send OTP");
  }
}}
>

<Text style={styles.buttonText}>
Send OTP →
</Text>

</TouchableOpacity>

</LinearGradient>

</View>

)}

{resetStep === 2 && (

<View>

<Text style={styles.heading}>Enter OTP</Text>

<View style={styles.inputBox}>
<TextInput
placeholder="Enter 6 digit OTP"
style={styles.inputField}
value={resetOtp}
onChangeText={setResetOtp}
/>
</View>

<LinearGradient
colors={["#2f6fed","#1a4db6"]}
style={styles.button}
>

<TouchableOpacity
style={{width:"100%",alignItems:"center"}}
onPress={async () => {
  try {

    if (!resetOtp) {
      alert("Enter OTP");
      return;
    }

    if (!resetPhone) {
      alert("Phone missing");
      return;
    }

    const fullPhone = country.dial + resetPhone;

    await verifyResetOtp(fullPhone, resetOtp);

    setResetStep(3);

  } catch (err: any) {
    console.log("VERIFY RESET OTP ERROR:", err?.response?.data || err);
    alert(err?.response?.data?.message || "Invalid OTP");
  }
}}
>

<Text style={styles.buttonText}>
Verify OTP →
</Text>

</TouchableOpacity>

</LinearGradient>

</View>

)}

{resetStep === 3 && (

<View>

<Text style={styles.heading}>New Password</Text>

<View style={styles.inputBox}>
<TextInput
secureTextEntry
placeholder="New Password"
style={styles.inputField}
value={newPassword}
onChangeText={setNewPassword}
/>
</View>

<View style={styles.inputBox}>
<TextInput
secureTextEntry
placeholder="Confirm Password"
style={styles.inputField}
value={confirmPassword}
onChangeText={setConfirmPassword}
/>
</View>

<LinearGradient
colors={["#2f6fed","#1a4db6"]}
style={styles.button}
>

<TouchableOpacity
style={{width:"100%",alignItems:"center"}}
onPress={async () => {
  try {

    if (!resetPhone) {
      alert("Phone missing");
      return;
    }

    if (!resetOtp) {
      alert("OTP missing");
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert("Enter password");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const fullPhone = country.dial + resetPhone;

    await resetPassword(fullPhone, resetOtp, newPassword);

    alert("Password updated successfully");

    setResetStep(0);

  } catch (err: any) {
    console.log("RESET PASSWORD ERROR:", err?.response?.data || err);
    alert(err?.response?.data?.message || "Reset failed");
  }
}}
>

<Text style={styles.buttonText}>
Save Password
</Text>

</TouchableOpacity>

</LinearGradient>

</View>

)}

</View>

</View>

</View>

);

}
const styles = StyleSheet.create({
page:{
flex:1,
backgroundColor:"#eef2f7",
justifyContent:"center",
alignItems:"center"
},

card:{
width:1000,
height:600,
flexDirection:"row",
backgroundColor:"#fff",
borderRadius:28,
overflow:"hidden"
},

leftPanel:{
width:"50%",
backgroundColor:"#2f6fed",
justifyContent:"center",
alignItems:"center"
},

logoRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:30
},

logoBox:{
backgroundColor:"#fff",
padding:8,
borderRadius:10
},

logoText:{
fontWeight:"bold"
},

logoLabel:{
color:"#fff",
marginLeft:10
},

brandTitle:{
fontSize:48,
color:"#fff",
fontWeight:"700",
lineHeight:56
},

rightPanel:{
width:"50%",
justifyContent:"center",
paddingHorizontal:80
},

heading:{
fontSize:32,
fontWeight:"700"
},

subHeading:{
color:"#666",
marginBottom:25
},

label:{
marginBottom:6
},

otpHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

useAnother:{
color:"#2563EB",
fontSize:13,
fontWeight:"500"
},

resendContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:-10,
marginBottom:10
},

resendText:{
fontSize:13,
color:"#666"
},

resendLink:{
fontSize:13,
color:"#2563EB",
fontWeight:"600"
},

resetContainer:{
flexDirection:"row",
justifyContent:"flex-end",
marginTop:-15,
marginBottom:10
},

resetLink:{
fontSize:13,
color:"#2563EB",
fontWeight:"600"
},

phoneRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:15
},

countryBox:{
flexDirection:"row",
alignItems:"center",
borderWidth:1,
borderColor:"#d7dce3",
borderRadius:12,
padding:12,
marginRight:10
},

countryCode:{
marginRight:6
},

phoneInput:{
flex:1,
flexDirection:"row",
alignItems:"center",
borderWidth:1,
borderColor:"#d7dce3",
borderRadius:12,
paddingHorizontal:12
},

inputBox:{
flexDirection:"row",
alignItems:"center",
borderWidth:1,
borderColor:"#d7dce3",
borderRadius:12,
paddingHorizontal:12,
marginBottom:20,
gap:10
},

inputField:{
flex:1,
padding:16
},

button:{
marginTop:25,
padding:20,
borderRadius:30,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"600"
},

dropdown:{
backgroundColor:"#fff",
borderWidth:1,
borderColor:"#ddd",
borderRadius:12,
marginBottom:10,
maxHeight:220
},

search:{
padding:10,
borderBottomWidth:1,
borderColor:"#eee"
},

countryItem:{
flexDirection:"row",
justifyContent:"space-between",
padding:12
}

});