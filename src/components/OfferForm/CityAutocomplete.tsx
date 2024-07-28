import React, { useState, useEffect } from 'react';
import { useController, Control } from 'react-hook-form';
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface City {
    nom: string;
    code: string;
    departement: {
        code: string;
        nom: string;
    };
}

interface CityAutocompleteProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    setIsCitySelected: (isSelected: boolean) => void;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ control, name, label, placeholder, setIsCitySelected }) => {
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: 'La ville est obligatoire' },
    });

    const [inputValue, setInputValue] = useState(field.value || '');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedByClick, setSelectedByClick] = useState(false);

    useEffect(() => {
        if (inputValue.length < 2) {
            setSuggestions([]);
            setIsCitySelected(false);
            return;
        }

        if (!selectedByClick) {
            const fetchCities = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${inputValue}&fields=departement&boost=population&limit=10`);
                    const data: City[] = await response.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            const timeoutId = setTimeout(fetchCities, 300); // debounce API call
            return () => clearTimeout(timeoutId);
        } else {
            setSelectedByClick(false);
        }
    }, [inputValue]);

    const handleSelect = (city: City) => {
        setInputValue(city.nom);
        field.onChange(city.nom);
        setIsCitySelected(true);
        setShowSuggestions(false);
        setSelectedByClick(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        field.onChange(e.target.value);
        setIsCitySelected(false);
        setShowSuggestions(true);
        setSelectedByClick(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    return (
        <FormItem>
            <FormLabel className="cityauto-label">{label}</FormLabel>
            <FormControl>
                <Input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="cityauto-input"
                />
            </FormControl>
            <FormMessage className="cityauto-message">{fieldState.error?.message}</FormMessage>
            {isLoading && <p className="cityauto-loading">Loading...</p>}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="cityauto-suggestions">
                    {suggestions.map((city) => (
                        <li key={city.code} onClick={() => handleSelect(city)} className="cityauto-suggestion-item">
                            {city.nom} ({city.departement.nom})
                        </li>
                    ))}
                </ul>
            )}
        </FormItem>
    );
};

export default CityAutocomplete;
