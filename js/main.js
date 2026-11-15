"use strict";

// CONVERSION
const conversionForm = document.getElementById('conversion-form');

if (conversionForm) {
    
    const dropdownWrapper = document.getElementById('custom-dropdown');
    const dropdownTrigger = document.getElementById('dropdown-trigger');
    const menuOptions = document.querySelectorAll('.menu-option');
    const selectedText = document.getElementById('selected-text');

    let currentMode = 'length'; 
    let isReversed = false; 

    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdownWrapper.classList.contains('is-open');
        dropdownWrapper.classList.toggle('is-open');
        dropdownTrigger.setAttribute('aria-expanded', !isOpen);
    });

    menuOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            currentMode = e.target.getAttribute('data-value');
            selectedText.textContent = e.target.textContent;
            dropdownWrapper.classList.remove('is-open');
            dropdownTrigger.setAttribute('aria-expanded', 'false');
            
            isReversed = false;
            updateUILabels();
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) {
            dropdownWrapper.classList.remove('is-open');
            dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
    });


    const inputVal = document.getElementById('input-value');
    const outputNumber = document.getElementById('output-value');
    const outputUnit = document.getElementById('output-unit');
    const mathDisplay = document.getElementById('math-display');
    const labelFrom = document.getElementById('label-from');
    const labelTo = document.getElementById('label-to');
    const formulaText = document.getElementById('formula-display');
    const inverseBtn = document.getElementById('inverse-btn'); 

    function updateUILabels() {
        if (currentMode === 'length') {
            if (!isReversed) {
                labelFrom.textContent = 'Length in Meters (m)';
                labelTo.textContent = 'Result in Feet';
                formulaText.textContent = 'Formula: ft = m × 3.28084';
                outputUnit.textContent = 'ft';
            } else {
                labelFrom.textContent = 'Length in Feet (ft)';
                labelTo.textContent = 'Result in Meters';
                formulaText.textContent = 'Formula: m = ft × 0.3048';
                outputUnit.textContent = 'm';
            }
        } else if (currentMode === 'temperature') {
            if (!isReversed) {
                labelFrom.textContent = 'Temperature in Celsius (°C)';
                labelTo.textContent = 'Result in Fahrenheit';
                formulaText.textContent = 'Formula: °F = (°C × 9/5) + 32';
                outputUnit.textContent = '°F';
            } else {
                labelFrom.textContent = 'Temperature in Fahrenheit (°F)';
                labelTo.textContent = 'Result in Celsius';
                formulaText.textContent = 'Formula: °C = (°F - 32) × 5/9';
                outputUnit.textContent = '°C';
            }
        }
        
        outputNumber.textContent = '0.00';
        mathDisplay.textContent = 'Awaiting input...';
        inputVal.value = ''; 
    }

    inverseBtn.addEventListener('click', () => {
        isReversed = !isReversed;
        updateUILabels();     
    });

    conversionForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const val = parseFloat(inputVal.value);
        if (isNaN(val)) return; 

        let result = 0;
        let mathString = '';

        if (currentMode === 'length') {
            if (!isReversed) {
                result = val * 3.28084; 
                mathString = `${val} × 3.28084 = ${result.toFixed(2)} ft`;
            } else {
                result = val * 0.3048; 
                mathString = `${val} × 0.3048 = ${result.toFixed(2)} m`;
            }
        } else if (currentMode === 'temperature') {
            if (!isReversed) {
                result = (val * 9/5) + 32; 
                mathString = `(${val} × 9/5) + 32 = ${result.toFixed(2)} °F`;
            } else {
                result = (val - 32) * 5/9; 
                mathString = `(${val} - 32) × 5/9 = ${result.toFixed(2)} °C`;
            }
        }

        outputNumber.textContent = result.toFixed(2);
        mathDisplay.textContent = mathString;
    });

    updateUILabels();
}

