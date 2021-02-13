import React from "react";
import './Iframebox.css'
export default function Iframebox() {
    return (
        <div id="i-frame-outer">
            <div id="iframe-title"><h2>My title</h2></div>
            <div id="iframe-text">Lorem Ipsum describing this piece of work I did.</div>
            <iframe title="frame" src="https://www.youtube.com/embed/sdkxWqsk17c" id="videoframe" ></iframe>
            
        </div>
               
        )
      
    }
