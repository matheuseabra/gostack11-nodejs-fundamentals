import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionList {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): TransactionList {
    const allTransactions = this.transactions;

    const initialBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return {
          income: acc.income + transaction.value,
          outcome: acc.outcome,
          total: acc.total + transaction.value,
        };
      }
      return {
        income: acc.income,
        outcome: acc.outcome + transaction.value,
        total: acc.total - transaction.value,
      };
    }, initialBalance);

    return { transactions: allTransactions, balance };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
