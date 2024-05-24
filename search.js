<script>
    function searchUsers() {
        const age = document.querySelector('input[name="age"]').value;
        const gender = document.querySelector('select[name="gender"]').value;
        const address = document.querySelector('input[name="address"]').value;
        const maritalStatus = document.querySelector('select[name="marital_status"]').value;
        const income = document.querySelector('input[name="income"]').value;

        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const ageCell = row.cells[0].textContent;
            const genderCell = row.cells[1].textContent;
            const addressCell = row.cells[2].textContent;
            const maritalStatusCell = row.cells[3].textContent;
            const incomeCell = row.cells[4].textContent;

            let showRow = true;

            if (age && ageCell != age) {
                showRow = false;
            }
            if (gender && genderCell != gender) {
                showRow = false;
            }
            if (address && addressCell.indexOf(address) === -1) {
                showRow = false;
            }
            if (maritalStatus && maritalStatusCell != maritalStatus) {
                showRow = false;
            }
            if (income && incomeCell != income) {
                showRow = false;
            }

            if (showRow) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        searchUsers();
    });
</script>