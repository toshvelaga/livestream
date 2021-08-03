import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="bottom-footer">
			<span>Made in the United States of America 🇺🇸</span>
			<span className="footer-link">
				<Link style={{ textDecoration: "none", color: "#fff" }} to="/terms">
					Terms of Service
				</Link>
			</span>
			<span className="footer-link">
				<Link
					style={{ textDecoration: "none", color: "#fff" }}
					to="privacy-policy"
				>
					Privacy Policy
				</Link>
			</span>
		</div>
	);
}

export default Footer;
