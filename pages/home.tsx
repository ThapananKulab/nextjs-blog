import React from "react";
import { Button } from "@mantine/core";

function Demo() {
  return (
    <Button
      variant="gradient"
      gradient={{ from: "grape", to: "pink", deg: 90 }}
    >
      Gradient button
    </Button>
  );
}
export default Demo;
