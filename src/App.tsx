import "./index.css";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConnectButton } from '@mysten/dapp-kit';
import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";

function App() {
    return (
        <div
            className="dark antialiased"
            style={{
                colorScheme: "dark",
            }}
        >
            <BrowserRouter>
                <TooltipProvider delayDuration={0}>
                    <div className="fixed top-0 right-0 p-4 z-50">
                        <ConnectButton />
                    </div>
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            <div className="flex flex-1 flex-col gap-4 size-full container">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="chat/:agentId"
                                        element={<Chat />}
                                    />
                                    <Route
                                        path="settings/:agentId"
                                        element={<Overview />}
                                    />
                                </Routes>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                    <Toaster />
                </TooltipProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
