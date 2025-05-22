let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const balanceEl = document.getElementById('balance');
const transactionsList = document.getElementById('transactionsList');
const transactionForm = document.getElementById('transactionForm');

function updateUI() {
    // Update balance
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'credit' 
            ? acc + transaction.amount 
            : acc - transaction.amount;
    }, 0);
    
    balanceEl.textContent = `₹${balance.toFixed(2)}`;

    
    transactionsList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <div class="transaction-info">
                <div>${transaction.category}</div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'credit' ? '+' : '-'}₹${transaction.amount.toFixed(2)}
                </div>
            </div>
            <div class="transaction-actions">
                <button class="edit-btn" onclick="editTransaction(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
            </div>
        `;
        transactionsList.appendChild(div);
    });

    localStorage.setItem('transactions', JSON.stringify(transactions));
}

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    transactions.push({ amount, type, category });
    updateUI();
    transactionForm.reset();
});

function editTransaction(index) {
    const transaction = transactions[index];
    
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('type').value = transaction.type;
    document.getElementById('category').value = transaction.category;

    transactions.splice(index, 1);
    updateUI();
}

function deleteTransaction(index) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions.splice(index, 1);
        updateUI();
    }
}

updateUI();
