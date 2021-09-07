import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import HomePage from "../../pages/HomePage";
import ProfilePage from "../../pages/ProfilePage";
import TrendingPage from "../../pages/TrendingPage";
import Navbar from '../Navbar';

const index = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/trending" exact component={TrendingPage} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default index;