import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfilePic from "./user/ProfilePic";
import i18next from "i18next";
import { useTranslation } from 'react-i18next'

const lngs = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'Français' },
    nl: { nativeName: 'Nederlands' }
}

function NavBar(props) {
    const { t } = useTranslation()

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container id="containerNavBar">
                <Navbar.Brand as={Link} to="/">
                    <img id="logo" alt="" src="favicon.ico"></img>Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav id="navBar" className="me-auto">
                        <Nav.Link as={Link} to="/Game">{t('Game')}</Nav.Link>
                        <Nav.Link as={Link} to="/tournament">{t('Tournament')}</Nav.Link>
                        <Nav.Link as={Link} to="/GameContainer">{t('3D-Game')}</Nav.Link>
                        <Nav.Link as={Link} to="/Morpion">Morpion</Nav.Link>
                        {props.isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/community">{t('Community')}</Nav.Link>
                                <Nav.Link as={Link} to="/logout">{t('Logout')}</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">{t('Login')}</Nav.Link>
                                <Nav.Link as={Link} to="/signup">{t('Signup')}</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button type="submit" key={lng} onClick={() => i18next.changeLanguage(lng)} disabled={i18next.resolvedLanguage === lng}>{lngs[lng].nativeName}</button>)
                    )}
                </div>
                {props.user && props.isLoggedIn && props.user.profile_pic && (
                    <Nav.Link as={Link} to="/profile">
                        <ProfilePic filename={props.user.profile_pic} />
                    </Nav.Link>
                )}
            </Container>
        </Navbar>
    );
}

export default NavBar;
