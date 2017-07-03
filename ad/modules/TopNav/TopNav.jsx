import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import './css/TopNav.css';
import './css/reset.css';

export default class TopNav extends React.Component{

    render(){
        return(
            <div className="header">
                <div className="head">
                    <div className="logo">
                        <a href="./">
                        </a>
                    </div>
                    <div className="nav">
                        <ul className="nav_menu">
                            <li className="nav_menu-item selected">
                                <Link to={window.App.getAppRoute() + "/"}>
                                    <span>首页</span>
                                </Link>
                            </li>
                            <li className="nav_menu-item"><a href="javascript:void(0)" onClick="">产品中心</a>
                                <ul className="nav_submenu">
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/"}>
                                            <span>车险</span>
                                        </Link>
                                    </li>
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/"}>
                                            <span>寿险</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav_menu-item">
                                    <Link to={window.App.getAppRoute() + "/"}>
                                        <span>个人中心</span>
                                    </Link>
                            </li>
                            <li className="nav_menu-item">
                                <Link to={window.App.getAppRoute() + "/"}>
                                    <span>业务咨询</span>
                                </Link>
                            </li>
                            <li className="nav_menu-item">
                                <Link to={window.App.getAppRoute() + "/"}>
                                    <span>关于我们</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="topBg"></div>
            </div>

        );
    }
}


