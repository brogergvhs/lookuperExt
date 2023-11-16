import React from "react";

export default function CustomLoader({type}) {

  switch (type) {
    case "packman":
        return ( <div id="pac-loader" className="pac-man"></div> );

    case "cube":
        return ( 
            <div id="cube-loader">
                <div className="scene">
                    <div className="cube-wrapper">
                        <div className="cube">
                            <div className="cube-faces">
                                <div className="cube-face bottom"></div>
                                <div className="cube-face top"></div>
                                <div className="cube-face left"></div>
                                <div className="cube-face right"></div>
                                <div className="cube-face back"></div>
                                <div className="cube-face front"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       );

    case "lines":
        return (
            <div id="lines-loader">
                <div className="content">
                    <div className="bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </div>
        );

    case "dots":
        return (
            <div id="dots-loader" className="justify-content-center mt-3">
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );

    case "spinner":
        return (
            <div id="dot-spin-loader">
                <div className="circle me-auto ms-auto">
                    <div className="inner"></div>
                </div>
            </div>
        );
  }
}