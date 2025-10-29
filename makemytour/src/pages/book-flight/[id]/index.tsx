import { getflight, handleFlightBooking } from "@/api";
import SignupDialog from "@/components/SignupDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { setUser } from "@/store";
import { Label } from "@radix-ui/react-label";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Clock,
  CreditCard,
  Gift,
  Info,
  Luggage,
  MapPin,
  Plane,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Flight {
  id: string;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}
const BookFlightPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: any) => state.user?.user ?? state.user);

  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getflight();
        const found = data.find(
          (f: any) =>
            String(f.id) === String(id) || String(f._id) === String(id)
        );
        setFlight(found ?? null);

        console.log(data);
      } catch (error) {
        console.error("Error Fetching flight:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!flight) {
    return (
      <div className="text-center py-10">
        No flight data available for this ID.
      </div>
    );
  }

  const flights = flight;

  const flightDetails = {
    from: "Bangalore",
    to: "New Delhi",
    data: "Thursday, Jan 16",
    flightNo: "IX 2747",
    aircraft: "Airbus A320",
    airline: "Air India Express",
    departureTime: "Bengaluru International Airport, Terminal T2",
    arrivalTime: "Indira Gandhi International Airport, Terminal T3",
    duration: "3h 15m",
    departureTerminal: "Bengaluru International Airport, Terminal T2",
    arrivalTerminal: "Indira Gandhi International Airport, Terminal T3",
    cabinBaggage: "7 kgs / Adult",
    checkInBaggage: "15 kgs (1 piece only) / Adult",
  };

  const fareSummary = {
    baseFare: 6124,
    taxes: 1374,
    otherServices: 249,
    discounts: -250,
    total: 7497,
  };

  const promoOffers = [
    {
      code: "MMTSECURE",
      description:
        " Get an instant discount of 299 on your flight booking and Trip Secure with this coupon! ",
      amount: 299,
    },
    {
      code: "SPECIALUPI",
      description:
        " Use this code and get 362 instant discount on payments via UPI only! ",
      amount: 362,
    },
  ];

  const hotels = [
    {
      name: "Hotel Park Tree",
      rating: 4,
      price: 9000,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800",
      location: "Hear Airport, New Delhi",
    },
    {
      name: "Lemon Tree Premier",
      rating: 4,
      price: 43875,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800",
      location: "Connaught Place, New Delhi",
    },
    {
      name: "Hotel Kian",
      rating: 4,
      price: 1968,
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800",
      location: "Karol Bagh, New Delhi",
    },
  ];

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Number.parseInt(e.target.value);
    setQuantity(
      isNaN(value) ? 1 : Math.max(1, Math.min(value, flights.availableSeats))
    );
  };

  const totalPrice = flights?.price * quantity;
  const totalTax = fareSummary?.taxes * quantity;
  const totalOtherServices = fareSummary.otherServices * quantity;
  const totalDiscount = fareSummary.discounts * quantity;
  const grandTotal = totalPrice + totalTax + totalOtherServices - totalDiscount;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await handleFlightBooking(
        user?.id,
        flights?.id,
        quantity,
        grandTotal
      );
      const updateuser = {
        ...user,
        bookings: [...(user?.bookings ?? []), data],
      };

      dispatch(setUser(updateuser));
      setOpen(false);
      setQuantity(1);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const BookingContent = () => (
    <DialogContent className=" sm:max-w-[600px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center">
          <Plane className="w-6 h-6 mr-2" />
          Flight Booking Details
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="flightName" className="flex items-center">
              <Plane className="w-4 h-4 mr-2" />
              Flight Name
            </Label>
            <Input id="flightName" value={flights?.flightName} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              From
            </Label>
            <Input id="from" value={flights?.from} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              To
            </Label>
            <Input id="to" value={flights?.to} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departuretime" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Departure Time
            </Label>
            <Input
              id="departureTime"
              value={new Date(flights?.departureTime).toLocaleString()}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivaltime" className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Arrival Time
            </Label>
            <Input
              id="arrivaltime"
              value={new Date(flights?.arrivalTime).toLocaleString()}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="flex items-center">
              <Ticket className="w-4 h-4 mr-2" />
              Number of Tickets
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={flights.availableSeats}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Fare Summary
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">
                ₹ {totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes and Surcharges</span>
              <span className="font-medium">₹ {totalTax.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Other Services</span>
              <span className="font-medium">
                ₹ {totalOtherServices.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-green-600">
              <span>Discounts</span>
              <span className="font-medium">
                - ₹ {Math.abs(totalDiscount).toLocaleString()}
              </span>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-lg">
                  ₹ {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button className="w-full mt-4" onClick={handleBooking}>
            Proceed to Payment
          </Button>
        </div>
      </div>
    </DialogContent>
  );
  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <div className="flex items-center flex-wrap gap-4 mb-2">
                    <h2 className="text-lg font-bold flex items-center">
                      <span>{flights?.from}</span>
                      <ArrowRight className="w-5 h-5 mx-2" />
                      <span>{flights?.to}</span>
                    </h2>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                      CANCELLATION FEES APPLY
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(flights.departureTime)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span> Non Stop - {flightDetails.duration}</span>
                  </div>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  View Fare Rules
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">{flights.flightName}</div>
                  <div className="text-sm text-gray-600">
                    {flightDetails.flightNo} • {flightDetails.aircraft}
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                    Economy
                  </span>
                  <span className="ml-2 text-gray-600">MMTSPECIAL</span>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-6 border-t pt-6">
                <div>
                  <div className="text-2xl font-bold">
                    {formatDate(flights.departureTime)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 flex items-start">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                    {flights.from} International Airport, Terminal T2
                  </div>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="text-sm text-gray-600 mb-1">
                    {flightDetails.duration}
                  </div>
                  <div className="w-32 h-0.5 bg-gray-300 relative my-2">
                    <div className="absolute-top-2 right-0 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <Plane className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Non-stop</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatDate(flights.arrivalTime)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 flex items-start justify-end">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                    {flights.to} International Airport, Terminal T3
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Luggage className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Cabin Baggage: {flightDetails.cabinBaggage}</span>
                </div>
                <div className="flex items-center">
                  <Luggage className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Check-in Baggage: {flightDetails.checkInBaggage}</span>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Cancellation & Date Change Policy
                  </h2>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View Policy
                  </button>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plane className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-semibold">BLR-DEL</span>
                    </div>
                    <div className="font-bold text-lg">₹ 4,300</div>
                  </div>
                  <div className="h-2.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>Now</span>
                    <span>16 Jan, 15:55</span>
                    <span>16 Jan, 17:55</span>
                  </div>
                </div>
              </div>

              {/* Hotel Offers */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-red-500" />
                    Book a Flight & unlock these offers
                  </h2>
                  <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                    Flyer Exclusive Deal
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hotels.map((hotel, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-xl overlow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                          Best Seller
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          {hotel.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-yellow-400">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">
                              Starting From
                            </div>
                            <div className="font-bold text-lg">
                              {hotel.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fare Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                Fare Summary
              </h2>

              <div className="space-y-2">
                <div className=" flex justify-between items-center">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-medium">
                    ₹ {totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className=" flex justify-between items-center">
                  <span className="text-gray-600">Taxes and Surcharges</span>
                  <span className="font-medium">
                    {" "}
                    ₹ {totalTax.toLocaleString()}
                  </span>
                </div>

                <div className=" flex justify-between items-center">
                  <span className="text-gray-600">Other Services</span>
                  <span className="font-medium">
                    ₹ {totalOtherServices.toLocaleString()}
                  </span>
                </div>

                <div className=" flex justify-between items-center text-green-600">
                  <span className="text-gray-600">Discounts</span>
                  <span className="font-medium">
                    - ₹ {Math.abs(totalDiscount).toLocaleString()}
                  </span>
                </div>

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total Amount</span>
                    <span className="font-bold text-lg">
                      ₹ {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-600 text-white">
                    Book Now
                  </Button>
                </DialogTrigger>
                {user ? (
                  <BookingContent />
                ) : (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login Required</DialogTitle>
                    </DialogHeader>
                    <p> Please log in to continue with your booking.</p>
                    <SignupDialog
                      trigger={
                        <Button
                          variant="outline"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Sign Up
                        </Button>
                      }
                    />
                  </DialogContent>
                )}
              </Dialog>

              {/* Promo Codes */}
              <div className="mt-8">
                <div className="bg-[#FFF8E7] p-6 rounded-xl">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-yellow-600" />
                    PROMO CODES
                  </h3>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Enter promo code here"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  {promoOffers.map((offer, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg mb-3 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="promo"
                          className="mt-1.5 h-4 w-4 text-red-600 focus:ring-red-500"
                        />
                        <div>
                          <div className="font-semibold text-sm">
                            {offer.code}
                          </div>
                          <p className="text-xs text-gray-600">
                            {offer.description}
                          </p>
                          <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700">
                            Terms & Conditions
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFlightPage;
