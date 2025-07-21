import { useState, useEffect, useMemo } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TheatersIcon from "@mui/icons-material/Theaters";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FlightIcon from "@mui/icons-material/Flight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import TransactionDetail from "../atoms/TransactionDetail";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./TransactionPage.module.css";
import { getTransactions } from "../api/api";

interface Transaction {
  id: number;
  icon: React.ReactNode;
  name: string;
  category: string;
  amount: number;
  date: string;
}

const getIconForCategory = (category: string): React.ReactNode => {
  switch (category) {
    case "Food & Dining":
      return <RestaurantIcon />;
    case "Shopping":
      return <ShoppingCartIcon />;
    case "Transportation":
      return <DirectionsCarIcon />;
    case "Health & Fitness":
      return <FitnessCenterIcon />;
    case "Entertainment":
      return <TheatersIcon />;
    case "Utilities":
      return <ReceiptLongIcon />;
    case "Travel":
      return <FlightIcon />;
    case "Other":
      return <MoreHorizIcon />;
    default:
      return <MoreHorizIcon />;
  }
};

// Loading Component
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="200px"
    gap={2}
  >
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

const TransactionPage = () => {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        const fetchAndSetTransactions = async () => {
          setIsLoading(true); 
          try {
            const apiData = await getTransactions();

            const mappedTransactions: Transaction[] = apiData.map(
              (item: any) => ({
                id: item.id,
                name: item.merchantName,
                category: item.category,
                amount: item.amount,
                date: new Date(item.date).toLocaleDateString(),
                icon: getIconForCategory(item.category),
              })
            );
            setTransactions(mappedTransactions);
            setIsDataLoaded(true);
          } catch (error) {
            console.error("Failed to fetch transactions:", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchAndSetTransactions();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const uniqueDates = useMemo(() => {
    const dates = new Set(transactions.map((t) => t.date));
    return Array.from(dates).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
  }, [transactions]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(transactions.map((t) => t.category));
    return Array.from(categories).sort();
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearchTerm =
        transaction.name.toLowerCase().includes(lowerSearchTerm) ||
        transaction.category.toLowerCase().includes(lowerSearchTerm);
      const matchesDate =
        selectedDate === "" || transaction.date === selectedDate;
      const matchesCategory =
        selectedCategory === "" || transaction.category === selectedCategory;
      return matchesSearchTerm && matchesDate && matchesCategory;
    });
  }, [transactions, searchTerm, selectedDate, selectedCategory]);

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [filteredTransactions]);

  if (isLoading && !authenticated) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!authenticated) {
    return <p>Please login to view this page</p>;
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading transactions..." />;
  }

  return (
    <>
      <h2>Total Spending: ${totalAmount.toFixed(2)}</h2>

      <h2>Transactions</h2>

      <div className={styles.FilterContainer}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "300px" } }}
          disabled={isLoading} 
        />
        <div className={styles.DropdownContainer}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="date-filter-label">Date</InputLabel>
            <Select
              labelId="date-filter-label"
              value={selectedDate}
              label="Date"
              onChange={(e: SelectChangeEvent<string>) =>
                setSelectedDate(e.target.value)
              }
              disabled={isLoading} 
            >
              <MenuItem value="">
                <em>All Dates</em>
              </MenuItem>
              {uniqueDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={selectedCategory}
              label="Category"
              onChange={(e: SelectChangeEvent<string>) =>
                setSelectedCategory(e.target.value)
              }
              disabled={isLoading}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {isDataLoaded && filteredTransactions.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            No transactions found matching your criteria.
          </Typography>
        </Box>
      )}

      {isDataLoaded &&
        filteredTransactions.length > 0 &&
        filteredTransactions.map((transaction) => (
          <TransactionDetail
            key={transaction.id}
            icon={transaction.icon}
            merchant={transaction.name}
            type={transaction.category}
            amount={transaction.amount}
            date={transaction.date}
          />
        ))}
    </>
  );
};

export default TransactionPage;