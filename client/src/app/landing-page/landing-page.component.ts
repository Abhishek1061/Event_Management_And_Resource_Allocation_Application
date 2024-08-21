// landing-page.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { gsap } from "gsap";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {

    IsLoggin: boolean = false;
    roleName: string | null;
  
    constructor(private authService: AuthService, private router: Router) {
      this.IsLoggin = authService.getLoginStatus;
      this.roleName = authService.getRole;
      if (this.IsLoggin == false) {
        this.router.navigateByUrl('/landing-page');
      }
    }
  
    logout() {
      this.authService.logout();
      window.location.reload();
    }

    
    ngOnInit(): void {

        //cursor
        const circle = document.querySelector('#circle') as HTMLElement;
        window.addEventListener('mousemove', (details: MouseEvent) => {
            const xValue = details.clientX;
            const yValue = details.clientY;

            // Use setTimeout function to slow down the mouse follower compared to the original mouse movement
            setTimeout(() => {
                circle.style.top = `${yValue}px`;
                circle.style.left = `${xValue}px`;
            }, 100);
        });

        //loader
        const svg = document.getElementById("svg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.from(".loader-wrap-heading h1", {
            delay: 1,
            y: 200,
            skewY: 10,
        }).to(".loader-wrap-heading h1", {
            delay: 1.5,
            y: -200,
            skewY: 10,
        });
        tl.to(svg, {
            duration: 0.8,
            attr: { d: curve },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.8,
            attr: { d: flat },
            ease: "power2.easeOut",
        });
        tl.to(".loader-wrap", {
            y: -1500,
        });
        tl.to(".loader-wrap", {
            zIndex: -1,
            display: "none",
        });
        tl.from(
            ".container h1",
            {
                y: 100,
                opacity: 0,
            },
            "-=1.5"
        );


        //Featured Projects
        const elemContainer = document.getElementById('projects-wrapper');
        const fixedBox = document.getElementById('fixed-box');

        if (elemContainer && fixedBox) {
            elemContainer.addEventListener("mouseenter", function () {
                fixedBox.style.display = "block";
            });

            elemContainer.addEventListener("mouseleave", function () {
                fixedBox.style.display = "none";
            });

            var elems = document.querySelectorAll('.elem');
            elems.forEach(elem => {
                elem.addEventListener("mouseenter", function () {
                    let imgURL = elem.getAttribute("img-data");
                    if (imgURL) {
                        fixedBox.style.backgroundImage = `url(${imgURL})`;
                        console.log("Setting background image:", imgURL);
                    } else {
                        console.error("No img-data attribute found for element:", elem);
                    }
                });
            });
        } else {
            console.error("Could not find elemContainer or fixedBox");
        }

        tl.from("#content h1", {
            y: 400,
            delay: 0.1,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
        })

        gsap.from("#image1, #image2", {
            x: -150,
            opacity: 0,
            duration: 0.5,
            delay: 4.5,

        })

        gsap.from("#image3, #image4", {
            x: 150,
            opacity: 0,
            duration: 0.5,
            delay: 4.5,

        })

        tl.from("#scroll", {
            y: -30,
            repeat: -1,
            duration: 0.5,
            delay: 0.5,
            yoyo: true,
        })


        //JOIN NOW
        const booknow = document.querySelector('#booknow') as HTMLElement;

        // Create a GSAP animation to move the element up and down
        gsap.to(booknow, {
            y: -10, // Move up by 10 pixels
            duration: 1, // Duration of 1 second
            repeat: -1, // Repeat indefinitely
            yoyo: true, // Reverse the animation to create a smooth up and down motion
            ease: "power1.inOut" // Easing function for smooth animation
        });
    }

    
}
