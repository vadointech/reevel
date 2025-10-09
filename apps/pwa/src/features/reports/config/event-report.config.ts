import { ReportType } from "@/entities/reports";

type ReportTypeMessage = {
    icon: string;
    type: ReportType;
    label: string;
    description: string;
};

export const EventReportLabels: Record<ReportType, string> = {
    [ReportType.INCORRECT_DETAILS]: "Incorrect Details",
    [ReportType.FRAUDULENT_ACTIVITY]: "Fraudulent Activity / Scams",
    [ReportType.INAPPROPRIATE_CONTENT]: "Inappropriate Content",
    [ReportType.SPAM]: "Spam or Irrelevant Listings",
    [ReportType.OTHER]: "Other",
};

export const EventReportMessages: Array<ReportTypeMessage> = [
    {
        icon: "📝",
        type: ReportType.INCORRECT_DETAILS,
        label: EventReportLabels[ReportType.INCORRECT_DETAILS],
        description: "Wrong date, location, or description.",
    },
    {
        icon: "🚫",
        type: ReportType.FRAUDULENT_ACTIVITY,
        label: EventReportLabels[ReportType.FRAUDULENT_ACTIVITY],
        description: "Suspicious payment requests or fake event.",
    },
    {
        icon: "⚠️",
        type: ReportType.INAPPROPRIATE_CONTENT,
        label: EventReportLabels[ReportType.INAPPROPRIATE_CONTENT],
        description: "Offensive, explicit, or discriminatory material.",
    },
    {
        icon: "📧️",
        type: ReportType.SPAM,
        label: EventReportLabels[ReportType.SPAM],
        description: "Repeated, unrelated, or irrelevant events.",
    },
    {
        icon: "❓️",
        type: ReportType.OTHER,
        label: EventReportLabels[ReportType.OTHER],
        description: "Please describe the issue.",
    },
];