import React from 'react'
import {Container,Logo, LogoutBtn} from '../index.js';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector(state => state.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


   return (
    <header className='py-3 shadow w-full bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link className='text-white' to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex gap-2  ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li className='md:text-sm text-xs' key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='md:px-6 md:py-2   inline-bock px-3 py-1 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
