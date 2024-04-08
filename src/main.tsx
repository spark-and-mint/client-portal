import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { AlertDialogProvider } from "./components/shared/AlertDialogProvider.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <AlertDialogProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </AlertDialogProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
)
