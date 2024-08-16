import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { WalletSelector } from "../components/WalletSelector";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BananaFarm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(1);
  const path = location.pathname
    .split("/")
    .filter((i) => !!i)
    .pop();

  const tabs = [
    { id: "", name: "Banana farm" },
    { id: "partner", name: "Partner NFTs" },
    { id: "leaderboard", name: "Leaderboard" },
  ];

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === path);
    setActiveTab(index === -1 ? 0 : index);
  }, [path]);

  return (
    <div>
      <Flex flexDir="column">
        <Box paddingBottom={4}>
          <WalletSelector />
        </Box>

        <Tabs isLazy colorScheme="green" index={activeTab}>
          <TabList>
            {tabs.map((tab) => (
              <Tab key={tab.id} onClick={() => navigate(tab.id)}>
                {tab.name}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <Box padding={2}>
          <Outlet />
        </Box>
      </Flex>
    </div>
  );
}

export default BananaFarm;
