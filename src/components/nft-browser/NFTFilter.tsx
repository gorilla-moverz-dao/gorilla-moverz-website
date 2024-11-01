import { Button, HStack } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";

import { FaChevronDown } from "react-icons/fa6";

const filterOptions = [
  {
    label: "Background",
    property: "Background",
    values: ["All", "Yellow", "Boxes", "Rough", "Margin", "Wrinkled", "Lines"],
  },
  {
    label: "Body",
    property: "Body",
    values: ["All", "Friendly", "Cool", "Pink", "Alpha", "Vibrant"],
  },
  {
    label: "Clothing",
    property: "Clothing",
    values: [
      "All",
      "Move",
      "Karate",
      "Hawaiian",
      "Wizard",
      "Ocean",
      "Akatsuki",
      "Waldo",
      "Spartan",
      "Shinobi",
      "Toga",
      "Gladiator",
      "Hoodie",
      "Disco",
    ],
  },
  {
    label: "Face",
    property: "Face",
    values: ["All", "Neutral", "Angry", "Happy", "Stoic", "Annoyed"],
  },
  {
    label: "Headgear",
    property: "Headgear",
    values: ["All", "Ninja", "Headset", "Hair", "Pirate", "Beanie", "Spartan", "Bandana", "Laurel", "Wizard"],
  },
  {
    label: "Unique",
    property: "Unique",
    values: [
      "All",
      "Spartan",
      "Lei",
      "Boxing",
      "Palette",
      "Spray",
      "Zeus",
      "Skateboard",
      "Magician",
      "Guitar",
      "Boombox",
    ],
  },
];

interface NFTFilterProps {
  filter: Record<string, string>;
  onFilterChange: (property: string, value: string) => void;
}

function NFTFilter({ filter, onFilterChange }: NFTFilterProps) {
  return (
    <HStack paddingBottom={4} wrap="wrap">
      {filterOptions.map((option) => (
        <MenuRoot key={option.property}>
          <MenuTrigger asChild>
            <Button variant="outline" colorPalette={filter[option.property] ? "green" : "whiteAlpha"}>
              {option.label} {filter[option.property] ? `: ${filter[option.property]}` : ""} <FaChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent>
            {option.values.map((value) => (
              <MenuItem key={value} value={value} onClick={() => onFilterChange(option.property, value)}>
                {value}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      ))}
    </HStack>
  );
}

export default NFTFilter;
