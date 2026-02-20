import { useState, useEffect } from 'react';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Address } from '../../backend';

interface AddressFormProps {
  onAddressChange: (address: Address | null) => void;
}

export default function AddressForm({ onAddressChange }: AddressFormProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('India');

  useEffect(() => {
    if (userProfile?.defaultAddress) {
      setStreet(userProfile.defaultAddress.street);
      setCity(userProfile.defaultAddress.city);
      setState(userProfile.defaultAddress.state);
      setZip(userProfile.defaultAddress.zip);
      setCountry(userProfile.defaultAddress.country);
    }
  }, [userProfile]);

  useEffect(() => {
    if (street && city && state && zip && country) {
      onAddressChange({ street, city, state, zip, country });
    } else {
      onAddressChange(null);
    }
  }, [street, city, state, zip, country, onAddressChange]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="123 Main Street"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Guwahati"
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Assam"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zip">ZIP Code *</Label>
          <Input
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="781007"
            required
          />
        </div>
        <div>
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="India"
            required
          />
        </div>
      </div>
    </div>
  );
}
