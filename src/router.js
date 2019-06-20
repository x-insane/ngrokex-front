import ProfilePage from './pages/ProfilePage';
import UserPage from "./pages/UserPage";
import PortsPage from "./pages/PortsPage";
import SubDomainsPage from "./pages/SubDomainsPage";

export default [
    {
        path: '/',
        redirect: '/profile'
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: '/user',
        component: UserPage
    },
    {
        path: '/port',
        component: PortsPage
    },
    {
        path: '/sub_domain',
        component: SubDomainsPage
    }
];