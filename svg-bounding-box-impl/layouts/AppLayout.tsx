import React, {
  ReactNode,
} from "react";
import styled from "styled-components";

const AppLayoutRoot = styled.div`
  padding: 20px;

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.customGray38};

  > * {
    width: 100%;
    height: 100%;
  }
`;

export type AppLayoutProps = {
  children: ReactNode,
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot>
      {children}
    </AppLayoutRoot>
  );
}

export default AppLayout;