import React from 'react'
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Missing from '../pages/Missing';
import RequireNoAuth from '../components/RequireNoAuth';
import CallbackGoogle from '../pages/authentication/CallbackGoogle';
import GetStarted from '../pages/authentication/GetStarted';
import HomePage from '../pages/homePage/HomePage';
import Unauthorized from '../pages/Unauthorized';
import ActiveLayout from '../components/layouts/ActiveLayout'
import PersistLogin from '../components/PersistLogin'
import RequireAuth from '../components/RequireAuth'
import CompleteProfile from '../pages/authentication/CompleteProfile'
import Dashboard from '../pages/dashboard/Dashboard'
import Friends from '../pages/friends/Friends'
import Profile from '../pages/profile/Profile'
import Scoreboard from '../pages/scoreboard/Scoreboard'

const IndexRoutes: React.FC = () => {
    return (
        <AnimatePresence>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route element={<RequireNoAuth />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/get-started" element={<GetStarted />} />
                        <Route path="/login/callback" element={<CallbackGoogle />} />
                    </Route>
                </Route>

                {/* Protected Routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={["initiated"]} />}>
                        <Route path="/register" element={<CompleteProfile />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["active"]} />}>
                        <Route element={<ActiveLayout />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/scoreboard" element={<Scoreboard />} />
                        </Route>
                    </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </AnimatePresence>
    )
}

export default IndexRoutes