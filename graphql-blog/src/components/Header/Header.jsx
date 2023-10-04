import { NavLink } from 'react-router-dom'
import style from './Header.module.scss'

export const Header = () => {
    return (
        <>
            <div className={style.headerContainer}>
                <h1>Simons blog</h1>
                <div>
                    <ul>
                        <li><NavLink to='' style={({ isActive }) => {
                            return {
                                borderBottom: isActive ? '2px solid #ffffff' : '2px solid #ffffff00'
                            };
                        }}>All Posts</NavLink></li>
                        <li><NavLink to='/today' style={({ isActive }) => {
                            return {
                                borderBottom: isActive ? '2px solid #ffffff' : '2px solid #ffffff00'
                            };
                        }}>Todays Posts</NavLink></li>
                        <li><NavLink to='/manage' style={({ isActive }) => {
                            return {
                                borderBottom: isActive ? '2px solid #ffffff' : '2px solid #ffffff00'
                            };
                        }}>Manage Posts?</NavLink></li>
                    </ul>
                </div>
            </div>

        </>
    )
}