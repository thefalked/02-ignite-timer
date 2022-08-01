import { Scroll, Timer } from 'phosphor-react'
import React from 'react'

import { HeaderContainer } from './styles'

import { NavLink } from 'react-router-dom'
import logoIgnite from '../../assets/logo-ignite.svg'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

export default Header
