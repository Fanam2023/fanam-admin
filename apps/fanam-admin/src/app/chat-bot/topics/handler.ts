import {ITopics} from "model.ts/topic"

export const useHandler = () => {
  const defaultData: ITopics[] = [
    {
      tittle: "Banking",
      description: "Know your customer check is mandatory process of identifying and verifying the identity.",
    },
    {tittle: "Financial", description: "Anti-Money-Laundering refers to legally recognized rules."},
    {
      tittle: "Environmental",
      description: "General Data Protection Regulation provides the right to protection of personal data.",
    },
    {
      tittle: "Healthcare",
      description: "Payment Card Industry Data Security Standard helps to handle credit card information",
    },
    {
      tittle: "OTHERS",
      description: "Cross border payments, Consumer protection, Securities, etc.",
    },
  ]

  return {
    defaultData,
  }
}
