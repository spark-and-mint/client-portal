import { Route, Routes } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import {
  Account,
  Home,
  Projects,
  EmailVerification,
  Project,
  Support,
  Documents,
  Payments,
} from "./_root/pages"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "sonner"
import "./globals.css"
import Header from "./components/shared/Header"
import Section from "./components/shared/Section"
import Details from "./_root/pages/Details"
import ResetPassword from "./_auth/forms/ResetPassword"
import StartProject from "./_auth/forms/hire/StartProject"
import StartFeedbackProject from "./_auth/forms/feedback/StartFeedbackProject"
import Partners from "./_root/pages/Partners"
import OAuth2Callback from "./_auth/OAuth2Callback"
import FeedbackRequestDetails from "./_root/pages/FeedbackRequestDetails"

const App = () => {
  return (
    <main className="flex flex-col sm:h-screen">
      <div className="absolute inset-x-0 h-[480px] bg-gradient-to-b from-[#ff6a3425] to-transparent opacity-40" />

      <Header />

      <Section crosses className="flex-grow">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/start" element={<StartProject />} />
            <Route path="/feedback" element={<StartFeedbackProject />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/oauth2callback" element={<OAuth2Callback />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route
              path="/feedback/:feedbackRequestId"
              element={<FeedbackRequestDetails />}
            />
            <Route path="/details" element={<Details />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/account" element={<Account />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/support" element={<Support />} />
          </Route>
        </Routes>
      </Section>

      <Toaster expand={true} richColors />
    </main>
  )
}

export default App
