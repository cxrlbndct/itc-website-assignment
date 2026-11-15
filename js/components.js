"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const isSubPage = window.location.pathname.includes('/pages/');
    const prefix = isSubPage ? '../' : '';

    const headerHTML = `
        <header class="site-header">
            <div class="container header-inner">
                <a href="${prefix}index.html" class="brand" aria-label="Assignment ni Carlalu">
                    <span class="brand-mark" aria-hidden="true">◆</span>
                    <span>Carlalu</span>
                </a>
                <nav aria-label="Primary">
                    <ul class="nav-list">
                        <li class="dropdown">
                            <button>Conversion Program <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                            <ul class="dropdown-menu">
                                <li><a href="${prefix}pages/conversion.html">Length Converter</a></li>
                                <li><a href="${prefix}pages/conversion.html">Temperature Converter</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <button>Tax Calculator <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                            <ul class="dropdown-menu">
                                <li><a href="${prefix}pages/tax.html">Income Tax Calculator</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <button>Factorial, Sum, & Average <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                            <ul class="dropdown-menu">
                                <li><a href="${prefix}pages/factorial.html">Factorial of N numbers</a></li>
                                <li><a href="${prefix}pages/factorial.html">Sum of N Numbers</a></li>
                                <li><a href="${prefix}pages/factorial.html">Average of N Numbers</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <button>Simple Payroll <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                            <ul class="dropdown-menu">
                                <li><a href="${prefix}pages/payroll.html">Payroll Program</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer class="site-footer">
            <div class="footer-inner">
                <p>&copy; 2026 Carl Benedict Capa. Built by hand.</p>
                <ul class="foot-list">
                    <li><a href="${prefix}pages/conversion.html">Conversion</a></li>
                    <li><a href="${prefix}pages/tax.html">Tax</a></li>
                    <li><a href="${prefix}pages/factorial.html">Factorial</a></li>
                    <li><a href="${prefix}pages/payroll.html">Payroll</a></li>
                </ul>
            </div>
        </footer>
    `;

    // --- MISSING LINE 1: The Glow HTML ---
    const glowHTML = `<div class="cursor-glow" id="cursor-glow" aria-hidden="true"></div>`;

    // Inject everything into the DOM
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // --- MISSING LINE 2: Inject the Glow ---
    document.body.insertAdjacentHTML('beforeend', glowHTML);

    // --- MISSING LINE 3: Call the function ---
    initCursorGlow();
});

function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (cursorGlow && hasFinePointer && !prefersReducedMotion) {
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let isTicking = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    cursorGlow.style.setProperty('--mouse-x', `${mouseX}px`);
                    cursorGlow.style.setProperty('--mouse-y', `${mouseY}px`);
                    isTicking = false;
                });
                isTicking = true;
            }
        });
    }
}