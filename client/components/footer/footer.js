
import { faFileText, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.css';
import Link from "next/link";

const Footer = () => {
    return (
        <footer id="footer" className={styles['footer-basic']}>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <a href="/">
                        <FontAwesomeIcon icon={ faFileText }/>&nbsp;Project Documentation
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="jklj">
                        <FontAwesomeIcon icon={ faGithub }/>&nbsp;Project on Github
                    </a>
                </li>
            </ul>
            <p className={styles.copyright} > © Charity DAO</p>
        </footer>
    );
}

export default Footer;