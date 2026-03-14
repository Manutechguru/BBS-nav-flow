export const defaultColumns = [
  { key: "restaurantName", label: "Restaurant Name", visible: true },
  { key: "clientName", label: "Client Name", visible: true },
  { key: "city", label: "City", visible: true },
  { key: "phone", label: "Phone No.", visible: false },
  { key: "email", label: "Email Address", visible: false },
  { key: "onboardingDate", label: "Onboarding Status", visible: false },
  { key: "status", label: "Status", visible: true },
  { key: "paymentStatus", label: "Payment Status", visible: true },
  { key: "lastPaidDate", label: "Last Paid Date", visible: false },
  { key: "nextRenewal", label: "Next Renewal Date", visible: true },
  { key: "subscriptionPlan", label: "Subscription Plan", visible: false },
  { key: "numberOfOutlets", label: "No. of Outlets", visible: false }
];

export const COLUMN_STORAGE_KEY = "clientTableColumns";

/**
 * Merge saved column settings with default columns.
 * This ensures new columns appear even if user has old localStorage data.
 */
export const mergeSavedColumns = (savedColumns: any[]) => {

  if (!savedColumns) return defaultColumns;

  const savedMap: any = {};
  savedColumns.forEach((col) => {
    savedMap[col.key] = col;
  });

  const merged = defaultColumns.map((defaultCol) => {

    if (savedMap[defaultCol.key]) {
      return {
        ...defaultCol,
        visible: savedMap[defaultCol.key].visible
      };
    }

    return defaultCol;

  });

  // preserve user order for existing columns
  const ordered = savedColumns
    .map((saved) => merged.find((m) => m.key === saved.key))
    .filter(Boolean);

  const newColumns = merged.filter(
    (m) => !savedColumns.find((s) => s.key === m.key)
  );

  return [...ordered, ...newColumns];
};