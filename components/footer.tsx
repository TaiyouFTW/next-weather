import Head from 'next/head';
import styled from 'styled-components';
import logo from '../public/vercel.svg'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterStyle = styled.footer`
  width: 100%;
  height: 64px;
  border-top: 1px solid #eaeaea4d;
  display: flex;
  justify-content: center;
  align-items: center;

.p {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-weight: bold;
  margin: 0;
  color: white;
}
`;

export default function Footer() {
  return (
    <FooterStyle>
      <p>
        Made with <FontAwesomeIcon icon={['fas', 'coffee']} className="icon w-auto mx-1" /> and <FontAwesomeIcon icon={['fas', 'heart']} className="icon w-auto mx-1" />
      </p>
    </FooterStyle>
  );
}
