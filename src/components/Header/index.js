import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IoAdd, IoLogoGithub  } from 'react-icons/io5';
import { HeaderStyle } from './styled';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
      <HeaderStyle>
      <Link to="/"> <FaHome size={24} /> </ Link>
      <Link to="/Create"> <IoAdd  size={35} /> </ Link>
      <Link to="https://github.com/diegoandersonn" target="_blank" rel="noopener noreferrer"> <IoLogoGithub size={24} /> </ Link>
    </HeaderStyle>
  );
}