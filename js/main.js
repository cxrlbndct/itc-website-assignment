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

// TAX CALC
const taxForm = document.getElementById('tax-form');

if (taxForm) {
    const taxInput = document.getElementById('tax-input');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const tableBody = document.getElementById('tax-table-body');

    const elTaxDue = document.getElementById('tax-due');
    const elStatAnnual = document.getElementById('stat-annual');
    const elStatMonthlyTax = document.getElementById('stat-monthly-tax');
    const elStatRate = document.getElementById('stat-rate');
    const elStatNetAnnual = document.getElementById('stat-net-annual');
    const elStatNetMonthly = document.getElementById('stat-net-monthly');
    const elMathDisplay = document.getElementById('tax-math-display');

    let currentMode = 'tax'; 

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            taxInput.value = btn.getAttribute('data-val');
            taxForm.dispatchEvent(new Event('submit'));
        });
    });

    taxForm.addEventListener('submit', (e) => {
        e.preventDefault();
 
        const income = parseFloat(taxInput.value);
        if (isNaN(income) || income < 0) return;

        let taxDue = 0;
        let bracketIndex = 1;
        let mathString = '';

        if (income <= 250000) {
            taxDue = 0;
            bracketIndex = 1;
            mathString = 'Income is exempt from tax.';
        }
        else if (income <= 400000) {
            taxDue = 0 + (income - 250000) * 0.15;
            bracketIndex = 2;
            mathString = `₱0.00 + (15% × ₱${formatCurrency(income - 250000)}) = ₱${formatCurrency(taxDue)}`;
        }
        else if (income <= 800000) {
            taxDue = 22500 + (income - 400000) * 0.20;
            bracketIndex = 3;
            mathString = `₱22,500.00 + (20% × ₱${formatCurrency(income - 400000)}) = ₱${formatCurrency(taxDue)}`;
        }
        else if (income <= 2000000) {
            taxDue = 102500 + (income - 800000) * 0.25;
            bracketIndex = 4;
            mathString = `₱102,500.00 + (25% × ₱${formatCurrency(income - 800000)}) = ₱${formatCurrency(taxDue)}`;
        }
        else if (income <= 8000000) {
            taxDue = 402500 + (income - 2000000) * 0.30;
            bracketIndex = 5;
            mathString = `₱402,500.00 + (30% × ₱${formatCurrency(income - 2000000)}) = ₱${formatCurrency(taxDue)}`;
        }
        else {
            taxDue = 2202500 + (income - 8000000) * 0.35;
            bracketIndex = 6;
            mathString = `₱2,202,500.00 + (35% × ₱${formatCurrency(income - 8000000)}) = ₱${formatCurrency(taxDue)}`;
        }

        const monthlyTax = taxDue / 12;
        const effectiveRate = (taxDue / income) * 100;
        const netAnnual = income - taxDue;
        const netMonthly = netAnnual / 12;

        elTaxDue.textContent = formatCurrency(taxDue);
        elStatAnnual.textContent = `₱${formatCurrency(income)}`;
        elStatMonthlyTax.textContent = `₱${formatCurrency(monthlyTax)}`;
        elStatRate.textContent = `${effectiveRate.toFixed(2)}%`;
        elStatNetAnnual.textContent = `₱${formatCurrency(netAnnual)}`;
        elStatNetMonthly.textContent = `₱${formatCurrency(netMonthly)}`;
        elMathDisplay.textContent = mathString;

        const allActiveRows = tableBody.querySelectorAll('.active-bracket');
        allActiveRows.forEach(row => row.classList.remove('active-bracket'));
 
        const targetRow = tableBody.querySelector(`tr\[data-bracket="${bracketIndex}"]`);
        if (targetRow) {
            targetRow.classList.add('active-bracket');
        }
    });
}

const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    
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

// FACTORIAL
const factorialForm = document.getElementById('factorial-form');

if (factorialForm) {
    const dropdownWrapper = document.getElementById('factorial-dropdown');
    const dropdownTrigger = document.getElementById('factorial-trigger');
    const menuOptions = document.querySelectorAll('#factorial-menu .menu-option');
    const selectedText = document.getElementById('factorial-selected-text');
    const formulaText = document.getElementById('factorial-formula');
    const inputLabel = document.getElementById('factorial-label');
    const resultLabel = document.getElementById('factorial-result-label');
    const outputEl = document.getElementById('factorial-output');
    const mathEl = document.getElementById('factorial-math');

    let currentMode = 'factorial';

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
            updateUILabels();
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) {
            dropdownWrapper.classList.remove('is-open');
            dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
    });

    function updateUILabels() {
        if (currentMode === 'factorial') {
            formulaText.textContent = 'Formula: n! = n × (n - 1) × ... × 2 × 1';
            inputLabel.textContent = 'First n numbers';
            resultLabel.textContent = 'Factorial Result';
        } else if (currentMode === 'sum') {
            formulaText.textContent = 'Formula: Sum = n × (n + 1) / 2';
            inputLabel.textContent = 'First n numbers';
            resultLabel.textContent = 'Sum Result';
        } else if (currentMode === 'average') {
            formulaText.textContent = 'Formula: Average = Sum / n';
            inputLabel.textContent = 'First n numbers';
            resultLabel.textContent = 'Average Result';
        }
        outputEl.textContent = '0';
        mathEl.textContent = 'Awaiting input...';
    }

    factorialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const n = parseInt(document.getElementById('factorial-input').value);

        if (isNaN(n) || n < 1) {
            outputEl.textContent = 'Invalid';
            mathEl.textContent = 'Please enter a positive whole number.';
            return;
        }

        let result, mathString;

        if (currentMode === 'factorial') {
            let fact = 1n;
            for (let i = 2n; i <= BigInt(n); i++) {
                fact *= i;
            }
            result = fact;
            
            const displayN = n <= 10 ? n : 'n';
            mathString = `${displayN} × ${n > 10 ? '(n-1)' : n-1} × ... × 2 × 1 = ${formatNumber(result)}`;
        } 
        else if (currentMode === 'sum') {
            result = (n * (n + 1)) / 2;
            mathString = `(${n} × ${n + 1}) / 2 = ${formatNumber(result)}`;
        } 
        else if (currentMode === 'average') {
            const sum = (n * (n + 1)) / 2;
            result = sum / n;
            mathString = `(${formatNumber(sum)} / ${n}) = ${formatNumber(result)}`;
        }

        outputEl.textContent = formatNumber(result);
        mathEl.textContent = mathString;
    });

    function formatNumber(num) {
        if (typeof num === 'bigint') {
            return num.toLocaleString('en-US');
        }
        if (Number.isInteger(num)) {
            return num.toLocaleString('en-US');
        }
        return num.toFixed(2);
    }

    updateUILabels();
}

// PAYROLL
const payrollForm = document.getElementById('payroll-form');

if (payrollForm) {
    let employees = []; 

    const tableBody = document.getElementById('payroll-table-body');
    const deleteBtn = document.getElementById('btn-delete');
  
    const inputName = document.getElementById('emp-name');
    const inputDays = document.getElementById('emp-days');
    const inputRate = document.getElementById('emp-rate');
    const inputDeduction = document.getElementById('emp-deduction');

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };

    function renderTable() {
        tableBody.innerHTML = '';

        if (employees.length === 0) {
            tableBody.innerHTML = `
                <tr id="empty-state">
                    <td colspan="7" style="text-align: center; padding: var(--space-6); color: var(--color-text-secondary);">
                        No employees added yet.
                    </td>
                </tr>`;
            return;
        }

        employees.forEach((emp, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.days}</td>
                <td>₱${formatCurrency(emp.rate)}</td>
                <td>₱${formatCurrency(emp.gross)}</td>
                <td>₱${formatCurrency(emp.deduction)}</td>
                <td style="color: var(--color-accent); font-weight: bold;">₱${formatCurrency(emp.net)}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    payrollForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = inputName.value.trim();
        const days = parseFloat(inputDays.value);
        const rate = parseFloat(inputRate.value);
        const deduction = parseFloat(inputDeduction.value);
        const gross = days * rate;
        const net = gross - deduction;

        employees.push({
            name: name,
            days: days,
            rate: rate,
            gross: gross,
            deduction: deduction,
            net: net
        });

        payrollForm.reset();
        renderTable();
    });

    deleteBtn.addEventListener('click', () => {
        if (employees.length === 0) {
            alert("The payroll list is empty.");
            return;
        }

        const input = prompt("Enter the Line Number (No.) of the employee to delete:");

        if (input === null) return;

        const lineNo = parseInt(input);

        if (isNaN(lineNo) || lineNo < 1 || lineNo > employees.length) {
            alert("Invalid Line Number. Please try again.");
            return;
        }

        employees.splice(lineNo - 1, 1);
      
        renderTable();
    });
}