import Image from 'next/image';
import { Card } from './ui/card';
import { Car, Wrench, User, MapPin } from 'lucide-react';

const MapMarker = ({ icon, top, left, label, colorClass }: { icon: React.ReactNode, top: string, left: string, label: string, colorClass: string }) => (
    <div className="absolute" style={{ top, left }}>
        <div className="relative flex flex-col items-center">
            <span className={`absolute -top-7 text-xs font-semibold text-white px-2 py-0.5 rounded-md ${colorClass}`}>
                {label}
            </span>
            <div className={`p-1.5 rounded-full bg-white shadow-md ${colorClass}`}>
                {icon}
            </div>
             <div className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-[6px] ${colorClass.replace('bg-','border-t-')}`}></div>
        </div>
    </div>
);


export function MapPlaceholder() {
  return (
    <Card className="w-full h-[400px] lg:h-full relative overflow-hidden">
        <Image
            src="https://placehold.co/800x600.png"
            alt="Map of the area"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            data-ai-hint="map city"
        />
        <div className="absolute inset-0">
             <MapMarker icon={<User className="w-5 h-5 text-white" />} top="45%" left="50%" label="You" colorClass="bg-blue-500" />
             <MapMarker icon={<HeartHandshake className="w-5 h-5 text-white" />} top="30%" left="35%" label="Volunteer" colorClass="bg-green-500"/>
             <MapMarker icon={<Wrench className="w-5 h-5 text-white" />} top="65%" left="70%" label="Garage" colorClass="bg-red-500"/>
             <MapMarker icon={<Car className="w-5 h-5 text-white" />} top="20%" left="80%" label="Request" colorClass="bg-accent"/>
        </div>
    </Card>
  );
}
