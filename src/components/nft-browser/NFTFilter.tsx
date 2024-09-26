import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";

const filterOptions = [
  {
    label: "Background",
    property: "BG",
    values: ["All", "Yellow", "Boxes", "Rough", "Margin", "Wrinkled", "Lines"],
  },
  {
    label: "Body",
    property: "BODY",
    values: ["All", "Friendly", "Cool", "Pink", "Alpha", "Vibrant"],
  },
  {
    label: "Clothing",
    property: "CLOTHING",
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
    property: "FACE",
    values: ["All", "Neutral", "Angry", "Happy", "Stoic", "Annoyed"],
  },
  {
    label: "Headgear",
    property: "HEADGEAR",
    values: ["All", "Ninja", "Headset", "Hair", "Pirate", "Beanie", "Spartan", "Bandana", "Laurel", "Wizard"],
  },
  {
    label: "Unique",
    property: "UNIQUE",
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
        <Menu key={option.property}>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            colorScheme={filter[option.property] ? "green" : "gray"}
          >
            {option.label} {filter[option.property] ? `: ${filter[option.property]}` : ""}
          </MenuButton>
          <MenuList>
            {option.values.map((value) => (
              <MenuItem key={value} onClick={() => onFilterChange(option.property, value)}>
                {value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ))}
    </HStack>
  );
}

export default NFTFilter;
