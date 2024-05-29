import { Button } from "@/components/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MailIcon } from "lucide-react"
import FadeIn from "react-fade-in"

const faq = [
  {
    question: "What is needed to get approved?",
    answer:
      "Your completed profile will be reviewed by our team. Ensure that your profile is thoroughly filled with accurate information that represents your skills and experiences. You may be asked to provide additional documentation or conduct a short interview.",
  },
  {
    question: "How will I get paid?",
    answer:
      "Once you complete assigned projects and your work is approved by the client, payment will be released. Payments are usually processed through direct bank transfers or via online platforms like PayPal. Be sure to have set up your payment mode in the 'Payment' section of your account.",
  },
  {
    question: "How often do I get paid?",
    answer:
      "Payments are typically made upon completion of a project. Depending on the length and nature of the project, milestones payments may also be arranged. Details will be outlined in your contract for each project.",
  },
]

const Support = () => {
  return (
    <FadeIn className="pb-16 space-y-4">
      <div>
        <h4 className="h4">Got questions? We can help!</h4>
        <p className="text-lg text-muted-foreground">
          Contact us anytime and we'll do our best to assist you.
        </p>

        <div className="flex items-center gap-20 my-12">
          <div>
            <div className="flex items-center gap-2 text-primary tracking-[0.05em] font-semibold">
              <MailIcon className="h-4 w-4" />
              Email
            </div>
            <p>
              <Button
                asChild
                variant="link"
                className="text-white font-normal  p-0"
              >
                <a href="mailto:hello@teamspark.xyz" target="_blank">
                  hello@teamspark.xyz
                </a>
              </Button>
            </p>
          </div>
        </div>

        <h5 className="h5">FAQ</h5>

        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </FadeIn>
  )
}

export default Support
