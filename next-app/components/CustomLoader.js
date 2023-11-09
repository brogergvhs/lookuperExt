import {useRouter} from "next/router";
import Link from "next/link";

export default function CustomLoader({type}) {

  switch (type) {
    case "packman":
        return ( <div id="pac-loader"></div> );

    case "cube":
        return ( 
            <div id="cube-loader">
                <div class="scene">
                    <div class="cube-wrapper">
                        <div class="cube">
                            <div class="cube-faces">
                                <div class="cube-face bottom"></div>
                                <div class="cube-face top"></div>
                                <div class="cube-face left"></div>
                                <div class="cube-face right"></div>
                                <div class="cube-face back"></div>
                                <div class="cube-face front"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       );

    case "lines":
        return (
            <div id="lines-loader">
                <div class="content">
                    <div class="bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <div class="bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        );

    case "dots":
        return (
            <div id="dots-loader" class="justify-content-center mt-3">
                <div class="loading">
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
                <div class="circle me-auto ms-auto">
                    <div class="inner"></div>
                </div>
            </div>
        );
  }
}