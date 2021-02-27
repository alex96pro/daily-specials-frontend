import './nav-bar.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';
import Logo from '../../images/logo.png';

export default function NavBar(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {cartSize} = useSelector(state => state.cart);
    const [dropDown, setDropDown] = useState(false);

    const handleLogout = () => {
        setTimeout(() => dispatch(logOut()), 1000); // logout has to be the last action that sets the store to initial values
        window.scroll(0,0);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_ID');
        history.push('/');
    };

    return(
        <nav>
            {props.loggedIn &&
            <div className="nav-container">
                {cartSize > 0 && <p className="nav-cart-size" onClick={() => history.push('/cart')}>{cartSize}</p>}
                <i className="fas fa-shopping-cart fa-3x" onClick={() => history.push('/cart')}></i>
                <i className="fas fa-bars fa-3x" onClick={() => setDropDown(!dropDown)}></i>
                {dropDown &&
                <React.Fragment>
                <div className="drop-down-underlay" onClick={() => setDropDown(false)}> </div>
                <div className="drop-down">
                    <div className="drop-down-item" onClick={() => history.push('/profile')}>Profile</div>
                    <div className="drop-down-item" onClick={handleLogout}>Log out</div>
                </div>
                </React.Fragment>
                }
            </div>
            }
            <img src={Logo} onClick={() => props.loggedIn && history.push('/feed')} alt="logo" className="nav-logo"/>
        </nav>
    );
};