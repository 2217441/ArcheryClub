document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('join-form');
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.step-indicator');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    let currentStep = 0;

    // Load saved data
    loadFormData();

    // Navigation
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                saveFormData();
                currentStep++;
                updateUI();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateUI();
        });
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Simulate API call
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Submitting...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Application Submitted Successfully! Welcome to the club.');
                localStorage.removeItem('archery_join_draft');
                window.location.href = 'index.html';
            }, 1500);
        }
    });

    function updateUI() {
        // Steps
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Indicators
        indicators.forEach((ind, index) => {
            ind.classList.remove('active', 'completed');
            if (index === currentStep) {
                ind.classList.add('active');
            } else if (index < currentStep) {
                ind.classList.add('completed');
                ind.innerHTML = '✓';
            } else {
                ind.innerHTML = index + 1;
            }
        });

        // Summary View (Step 2 is index 2)
        if (currentStep === 2) {
            renderSummary();
        }
    }

    function validateStep(stepIndex) {
        const currentStepEl = steps[stepIndex];
        const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!valid) {
            alert('Please fill in all required fields.');
        }

        return valid;
    }

    function saveFormData() {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem('archery_join_draft', JSON.stringify(data));
    }

    function loadFormData() {
        const saved = localStorage.getItem('archery_join_draft');
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const input = form.elements[key];
                if (input) {
                    input.value = data[key];
                }
            });
        }
    }

    function renderSummary() {
        const summary = document.getElementById('summary-content');
        const formData = new FormData(form);
        let html = '<ul style="list-style:none; padding:0;">';

        formData.forEach((value, key) => {
            if (value) {
                html += `<li><strong>${capitalize(key)}:</strong> ${value}</li>`;
            }
        });
        html += '</ul>';
        summary.innerHTML = html;
    }

    function capitalize(str) {
        return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
});
