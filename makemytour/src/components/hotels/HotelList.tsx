import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { useState, useEffect } from "react";
import { gethotel } from "@/api";
import Loader from "../Loader";

function HotelList({ hotels, onSelect }: any) {
  const [hotel, sethotel] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchhotel = async () => {
      try {
        const data = await gethotel();
        console.log("fetched hotels:",data);
        sethotel(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setloading(false);
      }
    };
    fetchhotel();
  }, []);
  if (loading) {
    return <Loader/>
  }
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Hotel List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hotel Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price/Night</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotel.length > 0 ? (
            hotel.map((hotel: any) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.hotelName}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>${hotel.pricePerNight}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(hotel)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default HotelList;
