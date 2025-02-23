import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import HelpPlaces from './pages/HelpPlaces.jsx';
import Embassies from './pages/Embassies.jsx';
import Chat from './pages/Chat.jsx';
import Blog from './pages/Blog.jsx';
import Gadgets from './pages/Gadgets.jsx';
import ChatBot from './pages/ChatBot.jsx';
import ContactList from './pages/ContactList.jsx';
import ImmigrationRequirements from './pages/ImmigrationRequirements.jsx';
import PaypalBalance from './pages/PaypalBalance.jsx';
import FreqAskedQuestions from './pages/FreqAskedQuestions.jsx';
import Emergency from './pages/Emergency.jsx';
import StatsAndReports from './pages/StatsAndReports.jsx';
import Help from './pages/Help.jsx';
import LocationView from './pages/LocationView.jsx';
import AdminConsole from './pages/AdminConsole.jsx';
import DashboardEdition from './pages/DashboardEdition.jsx';
import injectContext from "./store/appContext";
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/help-places" element={<HelpPlaces />} />
                        <Route path="/embassies" element={<Embassies />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/gadgets" element={<Gadgets />} />
                        <Route path="/chatbot" element={<ChatBot />} />
                        <Route path="/contact-list" element={<ContactList />} />
                        <Route path="/immigration-requirements" element={<ImmigrationRequirements />} />
                        <Route path="/paypal-balance" element={<PaypalBalance />} />
                        <Route path="/freq-asked-questions" element={<FreqAskedQuestions />} />
                        <Route path="/emergency" element={<Emergency />} />
                        <Route path="/stats-and-reports" element={<StatsAndReports />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/location-view" element={<LocationView />} />
                        <Route path="/admin-console" element={<AdminConsole />} />
                        <Route path="/dashboard-edition" element={<DashboardEdition />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
