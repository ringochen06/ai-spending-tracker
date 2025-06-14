import CoffeeIconMUI from "@mui/icons-material/Coffee";
import ShoppingCartIconMUI from "@mui/icons-material/ShoppingCart";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import TransactionDetail from "../atoms/TransactionDetail";

const mockData = [
  {
    id: 1,
    icon: <CoffeeIconMUI />,
    name: "Cafe Mocha",
    category: "Coffee",
    amount: 4.5,
    date: "2024-05-30",
  },
  {
    id: 2,
    icon: <ShoppingCartIconMUI />,
    name: "Supermart",
    category: "Groceries",
    amount: 75.2,
    date: "2024-05-30",
  },
  {
    id: 3,
    icon: <LocalPizzaIcon />,
    name: "Pizza Palace",
    category: "Dining",
    amount: 25.0,
    date: "2024-05-29",
  },
  {
    id: 4,
    icon: <DirectionsTransitIcon />,
    name: "Metro Fare",
    category: "Transportation",
    amount: 2.75,
    date: "2024-05-29",
  },
  {
    id: 5,
    icon: <ConfirmationNumberIcon />,
    name: "Cinema Tickets",
    category: "Entertainment",
    amount: 30.0,
    date: "2024-05-28",
  },
  {
    id: 6,
    icon: <CheckroomIcon />,
    name: "Clothing Store",
    category: "Shopping",
    amount: 120.0,
    date: "2024-05-27",
  },
];

const TransactionPage = () => {
  const totalAmount = mockData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <h2>Total Spending: ${totalAmount.toFixed(2)}</h2>

      <h2>Transactions</h2>
      {mockData.map((transaction) => (
        <TransactionDetail
          icon={transaction.icon}
          merchant={transaction.name}
          type={transaction.category}
          amount={transaction.amount}
          date={transaction.date}
          key={transaction.id}
        />
      ))}
    </>
  );
};

export default TransactionPage;
