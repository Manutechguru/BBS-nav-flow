export type FieldType = "text" | "dropdown" | "calendar" | "file";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  remarks?: string;
  params?: string;
};

export type GroupConfig = {
  group: string;
  fields: FieldConfig[];
};

export const clientFormConfig: GroupConfig[] = [

/* ======================================================
   1. Client (Business) Basic Details
====================================================== */

{
group:"Client (Business) Basic Details",
fields:[
{
name:"restaurantBrandName",
label:"Restaurant Brand Name",
type:"text",
required:true,
params:"100 Character Length"
},
{
name:"legalBusinessName",
label:"Legal Business Name",
type:"text",
required:true,
params:"100 Character Length"
},
{
name:"businessType",
label:"Business Type",
type:"dropdown",
required:true,
options:["Individual","Partnership","Pvt Ltd","LLP","Franchise"]
},
{
name:"contactPersonName",
label:"Contact Person Name",
type:"text",
required:true,
remarks:"Alphabets Only",
params:"50 Character Length"
},
{
name:"contactPersonRole",
label:"Contact Person Role",
type:"text",
params:"50 Character Length"
},
{
name:"mobilePrimary",
label:"Mobile Number (Primary)",
type:"text",
required:true,
remarks:"Numeric Only",
params:"10 Character Length with ISD Code"
},
{
name:"emailPrimary",
label:"Email ID (Primary)",
type:"text",
required:true
},
{
name:"secondaryContact",
label:"Secondary Contact Number",
type:"text",
remarks:"Numeric Only"
},
{
name:"secondaryEmail",
label:"Secondary Email (Optional)",
type:"text"
}
]
},


{
  group: "Admin User Creation",
  fields: [
    {
      name: "admin_name",
      label: "Admin Name",
      type: "text",
      required: true
    },
    {
      name: "admin_phone",
      label: "Admin Phone",
      type: "text",
      required: true
    },
    {
      name: "admin_email",
      label: "Admin Email",
      type: "text",
      required: true
    },
    {
      name: "admin_username",
      label: "Username",
      type: "text",
      required: true
    },
    {
      name: "admin_password",
      label: "Password",
      type: "text",
      required: true
    },
    {
      name: "date_of_joining",
      label: "Date of Joining",
      type: "calendar"
    }
  ]
},
/* ======================================================
   2. Restaurant Location & Address Details
====================================================== */

{
group:"Restaurant Location & Address Details",
fields:[
{
name:"registeredAddress",
label:"Registered Address (Line 1, Line 2)",
type:"text",
required:true
},
{
name:"city",
label:"City",
type:"text",
required:true
},
{
name:"state",
label:"State",
type:"text",
required:true
},
{
name:"pinCode",
label:"PIN Code",
type:"text",
required:true,
remarks:"Numeric Only"
},
{
name:"country",
label:"Country",
type:"dropdown",
required:true,
options:["India","USA","UK","Canada"]
},
{
name:"outletLocationName",
label:"Outlet / Location Name",
type:"text"
},
{
name:"googleLocation",
label:"Google Maps Location (Latitude & Longitude)",
type:"text",
remarks:"Numeric Only"
},
{
name:"timeZone",
label:"Time Zone",
type:"dropdown",
required:true,
options:["IST","UTC","PST","EST"]
}
]
},

/* ======================================================
   3. Outlet & Operational Configuration
====================================================== */

{
group:"Outlet & Operational Configuration",
fields:[
{
name:"numberOfOutlets",
label:"Number of Outlets",
type:"text"
},
{
name:"outletType",
label:"Outlet Type",
type:"dropdown",
options:["Dine-in","Takeaway","Delivery","Multi"]
},
{
name:"seatingEnabled",
label:"Seating Enabled",
type:"dropdown",
options:["Yes","No"]
},
{
name:"tableManagementEnabled",
label:"Table Management Enabled",
type:"dropdown",
options:["Yes","No"]
},
{
name:"numberOfTables",
label:"Number of Tables",
type:"text",
remarks:"1-1000"
},
{
name:"floorsEnabled",
label:"Floors Enabled",
type:"dropdown",
options:["Yes","No"]
},
{
name:"kdsRequired",
label:"Kitchen Display System (KDS) Required",
type:"dropdown",
options:["Yes","No"]
}
]
},

/* ======================================================
   4. Business & Tax Information
====================================================== */

{
group:"Business & Tax Information",
fields:[
{
name:"gstNumber",
label:"GST Number",
type:"text"
},
{
name:"panNumber",
label:"PAN Number",
type:"text"
},
{
name:"fssaiLicense",
label:"FSSAI License Number",
type:"text"
},
{
name:"billingName",
label:"Billing Name",
type:"text"
},
{
name:"gstPercentage",
label:"GST Percentage",
type:"text",
remarks:"1-100"
},
{
name:"serviceChargePercentage",
label:"Service Charge Percentage",
type:"text",
remarks:"1-100"
}
]
},

/* ======================================================
   5. Subscription & Billing Details
====================================================== */

{
group:"Subscription & Billing Details",
fields:[
{
name:"subscriptionPlan",
label:"Subscription Plan",
type:"dropdown",
required:true,
options:["Trial","Basic","Pro","Enterprise"]
},
{
name:"subscriptionStartDate",
label:"Subscription Start Date",
type:"calendar",
required:true
},
{
name:"subscriptionEndDate",
label:"Subscription End Date",
type:"calendar",
required:true
},
{
name:"billingCycle",
label:"Billing Cycle",
type:"dropdown",
required:true,
options:["Monthly","Quarterly","Yearly"]
},
{
name:"pricing",
label:"Pricing",
type:"text",
required:true
},
{
name:"paymentStatus",
label:"Payment Status",
type:"dropdown",
options:["Paid","Unpaid"]
},
{
name:"paymentMode",
label:"Payment Mode",
type:"dropdown",
options:["Online","Cash"]
},
{
name:"paymentRefNumber",
label:"Payment Ref Number",
type:"text"
},
{
name:"invoiceRequired",
label:"Invoice Generation Required",
type:"dropdown",
options:["Yes","No"]
}
]
},

/* ======================================================
   6. Feature Access & Permissions
====================================================== */

{
group:"Feature Access & Permissions",
fields:[
{
name:"enabledModules",
label:"Enabled Modules",
type:"dropdown",
options:["POS","Inventory","Analytics","Delivery","CRM"]
},
{
name:"maxUsersAllowed",
label:"Max Users Allowed",
type:"text",
remarks:"Numeric Only"
},
{
name:"maxDevicesAllowed",
label:"Max Devices Allowed",
type:"text",
remarks:"Numeric Only"
},
{
name:"posIntegration",
label:"POS Integration",
type:"dropdown",
options:["Yes","No"]
},
{
name:"thirdPartyIntegrations",
label:"Third-party Integrations",
type:"dropdown",
options:["Yes","No"]
}
]
},

/* ======================================================
   7. User & Role Setup
====================================================== */

{
group:"User & Role Setup",
fields:[
{
name:"adminUserDetails",
label:"Admin User Details",
type:"text",
required:true
},
{
name:"roleAssignment",
label:"Role Assignment",
type:"dropdown",
options:["Admin","Manager","Staff"]
},
{
name:"loginMethod",
label:"Login Method (Password / OTP)",
type:"dropdown",
required:true,
options:["Password","OTP","Both"]
}
]
},

/* ======================================================
   8. Branding & App Customization
====================================================== */

{
group:"Branding & App Customization",
fields:[
{
name:"restaurantLogo",
label:"Restaurant Logo",
type:"file"
},
{
name:"brandColors",
label:"Brand Colors",
type:"dropdown",
options:["Red","Blue","Green","Black","Orange"]
},
{
name:"invoiceHeaderFooter",
label:"Invoice Header & Footer",
type:"file"
},
{
name:"termsConditions",
label:"Terms & Conditions Text",
type:"text"
},
{
name:"supportContact",
label:"Support Contact Details",
type:"text",
remarks:"Numeric Only"
}
]
},

/* ======================================================
   9. Compliance & Agreements
====================================================== */

{
group:"Compliance & Agreements",
fields:[
{
name:"agreementStatus",
label:"Agreement Acceptance Status",
type:"dropdown",
options:["Yes","No"]
},
{
name:"acceptanceDate",
label:"Acceptance Date",
type:"calendar"
},
{
name:"kycUpload",
label:"KYC Documents Upload",
type:"file"
}
]
},

/* ======================================================
   10. Internal Admin Tracking
====================================================== */

{
group:"Internal Admin Tracking",
fields:[
{
name:"clientId",
label:"Client ID",
type:"text"
},
{
name:"onboardingStatus",
label:"Onboarding Status",
type:"dropdown",
required:true,
options:["Active","Inactive"]
},
{
name:"createdBy",
label:"Created By",
type:"text",
required:true
},
{
name:"createdDate",
label:"Created Date",
type:"calendar",
required:true
},
{
name:"lastModifiedDate",
label:"Last Modified Date",
type:"calendar",
required:true
},
{
name:"internalNotes",
label:"Internal Notes",
type:"text"
}
]
},

/* ======================================================
   11. Nice-to-Have / Future Enhancements
====================================================== */

{
group:"Nice-to-Have / Future Enhancements",
fields:[
{
name:"franchiseParentId",
label:"Franchise Parent ID",
type:"text"
},
{
name:"regionCluster",
label:"Region / Cluster",
type:"text"
},
{
name:"salesRepresentative",
label:"Sales Representative",
type:"text"
},
{
name:"referralSource",
label:"Referral Source",
type:"text"
},
{
name:"goLiveDate",
label:"Go-Live Date",
type:"calendar",
required:true
}
]
}

];