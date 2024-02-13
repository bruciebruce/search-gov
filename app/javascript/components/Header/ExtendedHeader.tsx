import React, { useContext } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Header as UswdsHeader, NavMenuButton, ExtendedNav } from '@trussworks/react-uswds';
import { StyleContext } from '../../contexts/StyleContext';

import { HeaderProps } from './../props';
import { Logo } from './Logo';

import './ExtendedHeader.css';

const StyledUswdsHeader = styled(UswdsHeader).attrs<{ styles: { buttonBackgroundColor: string; headerLinksFontFamily: string, headerBackgroundColor: string, headerPrimaryLinkColor: string, headerSecondaryLinkColor: string; headerNavigationBackgroundColor: string; }; }>((props) => ({
  styles: props.styles
}))`
  background-color: ${(props) => props.styles.headerBackgroundColor};
  .usa-nav__primary, .usa-nav__secondary {
    font-family: ${(props) => props.styles.headerLinksFontFamily};
  }
  .usa-nav {
    background-color: ${(props) => props.styles.headerNavigationBackgroundColor};
  }
  a.usa-nav__link {
    color: ${(props) => props.styles.headerPrimaryLinkColor};
  }
  .usa-nav__secondary-item > a {
    color: ${(props) => props.styles.headerSecondaryLinkColor};
  }
  button.usa-menu-btn {
    background-color: ${(props) => props.styles.buttonBackgroundColor};
    &:hover {
      background-color: ${(props) => darken(0.10, props.styles.buttonBackgroundColor)};
    }
  }
`;

export const ExtendedHeader = ({ page, toggleMobileNav, mobileNavOpen, primaryHeaderLinks, secondaryHeaderLinks }: HeaderProps) => {
  const styles = useContext(StyleContext);

  const secondaryLinkItems =
    secondaryHeaderLinks && secondaryHeaderLinks.length > 0 ? (secondaryHeaderLinks.map((link, index) => {
      return (
        <a href={link.url} key={index}>
          <span>{link.title}</span>
        </a>
      );
    })) : (
      [
        <></>
      ]
    );

  const primaryLinkItems =
    primaryHeaderLinks && primaryHeaderLinks.length > 0 ? (primaryHeaderLinks.map((link, index) => {
      return (
        <a className="usa-nav__link" href={link.url} key={index}>
          <span>{link.title}</span>
        </a>
      );
    })) : (
      [
        <></>
      ]
    );
  
  const showMobileMenu = (primaryHeaderLinks && primaryHeaderLinks.length > 0) || (secondaryHeaderLinks && secondaryHeaderLinks.length > 0);

  return (
    <>
      <StyledUswdsHeader extended={true} styles={styles}>
        <div className="usa-navbar">
          <Logo page={page} />
          {showMobileMenu && <NavMenuButton onClick={toggleMobileNav} label="Menu" />}
        </div>
        <ExtendedNav
          primaryItems={primaryLinkItems}
          secondaryItems={secondaryLinkItems}
          mobileExpanded={mobileNavOpen}
          onToggleMobileNav={toggleMobileNav}
        />
      </StyledUswdsHeader>
    </>
  );
};
