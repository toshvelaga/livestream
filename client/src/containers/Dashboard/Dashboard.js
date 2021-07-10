import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "5rem" }} class="main">
        <h2>Scroll this page to see the effect</h2>
        <h2>
          The navigation bar will stay at the top of the page while scrolling
        </h2>
        <Card />
        {process.env.REACT_APP_TITLE}
        {process.env.REACT_APP_DESCRIPTION}
        <p>Some text some text some text some text..</p>
      </div>
    </>
  );
}

export default Dashboard;
