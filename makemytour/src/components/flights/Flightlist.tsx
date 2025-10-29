import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getflight } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Loader from "../Loader";

const FlightList = ({ onSelect }: any) => {
  const [flight, setflight] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getflight();
        console.log("Fetched Flights:",data);
        setflight(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setloading(false);
      }
    };
    fetchFlight();
  }, []);
  if (loading) return <Loader />;
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Flight List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flight.length > 0 ? (
            flight?.map((flight: any) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.flightName}</TableCell>
                <TableCell>{flight.from}</TableCell>
                <TableCell>{flight.to}</TableCell>
                <TableCell>
                  <Button onClick={() => {onSelect(flight)}}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlightList;
